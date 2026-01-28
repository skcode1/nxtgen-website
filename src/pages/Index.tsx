import { useState, useEffect, lazy, Suspense } from "react";
import BlurOverlay from "@/components/BlurOverlay";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import FaultyTerminal from "@/components/ui/FaultyTerminal";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";

// Lazy load sections below the fold for better initial load performance
const PitchSection = lazy(() => import("@/components/sections/PitchSection"));
const VisionSection = lazy(() => import("@/components/sections/VisionSection"));
const TracksSection = lazy(() => import("@/components/sections/TracksSection"));
const PrizesSection = lazy(() => import("@/components/sections/PrizesSection"));
const TimelineSection = lazy(() => import("@/components/sections/TimelineSection"));
const FormatSection = lazy(() => import("@/components/sections/FormatSection"));
const MentorsSection = lazy(() => import("@/components/sections/MentorsSection"));
const WorkshopsSection = lazy(() => import("@/components/sections/WorkshopsSection"));
const VenueSection = lazy(() => import("@/components/sections/VenueSection"));
const SponsorsSection = lazy(() => import("@/components/sections/SponsorsSection"));
const GallerySection = lazy(() => import("@/components/sections/GallerySection"));
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));
const ContactSection = lazy(() => import("@/components/sections/ContactSection"));
const Footer = lazy(() => import("@/components/sections/Footer"));

// Loading fallback component
const SectionLoader = () => <div className="min-h-screen" />;

const MENU_BUTTON_DELAY = 10000; // ms, 7 seconds after loading (adjust as needed)

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFaultyTerminal, setShowFaultyTerminal] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showMobileGate, setShowMobileGate] = useState(false);
  const [canContinue, setCanContinue] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowNav(true), MENU_BUTTON_DELAY);
  };

  const handleVideoFadeStart = () => {
    // Video fade start callback
  };

  useEffect(() => {
    // Start FaultyTerminal fade in at 6 seconds
    const faultTerminalTimer = setTimeout(() => {
      setShowFaultyTerminal(true);
    }, 6000);

    return () => clearTimeout(faultTerminalTimer);
  }, []);

  useEffect(() => {
    const handleVisibility = () => setIsPageVisible(document.visibilityState === "visible");
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduceMotion(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const media = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setShowMobileGate(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!showMobileGate) {
      setCanContinue(false);
      return;
    }
    const timer = setTimeout(() => setCanContinue(true), 6000);
    return () => clearTimeout(timer);
  }, [showMobileGate]);

  if (isLoading) {
    return (
      <LoadingScreen
        onComplete={handleLoadingComplete}
        videoSrc="/assets/video/intro.MP4"
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: 'transparent' }}>
      {showMobileGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-6 text-center">
          <div className="max-w-md rounded-3xl border border-white/10 bg-black/70 p-8 shadow-2xl backdrop-blur-md transition-opacity duration-700 ease-out">
            <p className="text-2xl sm:text-3xl font-semibold text-white animate-pulse">
              Load in Desktop for better experience
            </p>
            <p className="mt-3 text-sm sm:text-base text-white/70">
              The mobile version is limited. For the full experience, open this site on a desktop.
            </p>
            <button
              type="button"
              className={`mt-6 w-full rounded-full px-6 py-3 text-base sm:text-lg font-semibold transition ${
                canContinue
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/20 text-white/60 cursor-not-allowed"
              }`}
              onClick={() => setShowMobileGate(false)}
              disabled={!canContinue}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {/* Fixed FaultyTerminal Background - covers entire page */}
      <div 
        className={`fixed inset-0 w-full h-full z-0 transition-opacity ease-in-out ${
          showFaultyTerminal ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundColor: 'transparent', transitionDuration: "2000ms" }}
      >
        <FaultyTerminal
          scale={1.8}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.5}
          pause={!showFaultyTerminal || !isPageVisible || reduceMotion}
          scanlineIntensity={0.5}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.25}
          tint="#8B5CF6"
          mouseReact={false}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={0.8}
          dpr={1}
        />
      </div>
      {/* Blur overlay above background, below content */}
      <BlurOverlay />

      {/* Navbar (menu button) only after showNav is true */}
      {showNav && <Navbar />}

      {/* Main content */}
      <main className="relative z-10 flex min-h-screen flex-col">
        <HeroSection onVideoFadeStart={handleVideoFadeStart} />
        
        <Suspense fallback={<SectionLoader />}>
          <PitchSection />
          <VisionSection />
          <TracksSection />
          <PrizesSection />
          <TimelineSection />
          <FormatSection />
          <MentorsSection />
          <WorkshopsSection />
          <VenueSection />
          <SponsorsSection />
          <GallerySection />
          <FAQSection />
          <ContactSection />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
