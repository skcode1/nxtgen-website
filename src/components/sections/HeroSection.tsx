import { useEffect, useState, useRef } from "react";
import SplitText from "@/components/ui/SplitText";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onVideoFadeStart?: () => void;
}

const HeroSection = ({ onVideoFadeStart }: HeroSectionProps = {} as HeroSectionProps) => {
  const [showExplore, setShowExplore] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoFadeOut, setVideoFadeOut] = useState(false);
  const [showTexusLogo, setShowTexusLogo] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showTopGlass, setShowTopGlass] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const media = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    if (typeof media.addListener === "function") {
      media.addListener(handleChange);
      return () => media.removeListener(handleChange);
    }
    return undefined;
  }, []);

  useEffect(() => {
    // Skip video on mobile, show logo immediately after loading screen
    if (isMobile) {
      setShowLogo(true);
      setShowExplore(true);
      setShowTexusLogo(true);
      setVideoEnded(true);
      setVideoFadeOut(true);
      return;
    }

    // Play video immediately when component mounts (component mounts at 4s after loading screen completes)
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleTimeUpdate = () => {
        if (video.duration) {
          // Start fade out in the last 2 seconds - very smooth fade
          if (video.currentTime >= video.duration - 2 && !videoFadeOut) {
            setVideoFadeOut(true);
            // Notify parent that video fade has started (so FaultyTerminal can start)
            if (onVideoFadeStart) {
              onVideoFadeStart();
            }
          }
        }
      };

      const handleEnded = () => {
        setVideoEnded(true);
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);
      
      // Start playing the video immediately when component mounts
      video.play().catch(err => {
        console.error('Error playing video:', err);
        setVideoEnded(true);
        setShowExplore(true);
      });

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [isMobile, videoFadeOut, onVideoFadeStart]);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const y = window.scrollY;
        const nextShowTopGlass = y > 0;
        const nextShowExplore = y <= 100 && showLogo;

        setShowTopGlass(prev => (prev === nextShowTopGlass ? prev : nextShowTopGlass));
        setShowExplore(prev => (prev === nextShowExplore ? prev : nextShowExplore));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showLogo]);

  useEffect(() => {
    document.body.classList.toggle("scrolled-top-glass", showTopGlass);
    return () => document.body.classList.remove("scrolled-top-glass");
  }, [showTopGlass]);

  useEffect(() => {
    if (isMobile) return;
    // Show logo and content after 9 seconds from page load
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
      setShowExplore(true); // Show Explore immediately after logo
    }, 9500);

    // Show TEXUS logo after 5 seconds
    const texusTimer = setTimeout(() => {
      setShowTexusLogo(true);
    }, 5000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(texusTimer);
    };
  }, [isMobile]);

  const scrollToNext = () => {
    document.getElementById("pitch")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent"
      id="hero"
    >
      {/* SRM Logo - Top Left Corner */}
      <div
        className={`fixed top-4 left-4 z-30 rounded-full px-3 py-2 transition-colors duration-500 transition-opacity ${
          showTopGlass
            ? "bg-white/10 backdrop-blur-md border border-white/15"
            : "bg-transparent border border-transparent"
        } ${showTexusLogo ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <img
          src="/assets/logo/srm1.png"
          alt="SRM Logo"
          className="h-8 sm:h-10 md:h-[55px] w-auto"
        />
      </div>

      {/* TEXUS Logo - Top Middle */}
      <div
        className={`fixed top-4 right-4 sm:inset-x-0 sm:mx-auto sm:w-fit z-30 transition-opacity duration-500 rounded-full px-3 py-2 transition-colors duration-500 ${
          showTexusLogo ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${
          showTopGlass
            ? "bg-white/10 backdrop-blur-md border border-white/15"
            : "bg-transparent border border-transparent"
        }`}
      >
        <img
          src="/assets/logo/texus.png"
          alt="TEXUS Logo"
          className="h-8 sm:h-10 md:h-[53.33px] w-auto"
        />
      </div>

      {/* Video overlay - plays once then fades out smoothly */}
      {!isMobile && (
        <video
          ref={videoRef}
          src="/assets/video/intro.MP4"
          className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity ease-in-out ${
            videoFadeOut ? 'opacity-0' : 'opacity-100'
          } ${videoEnded ? 'pointer-events-none' : ''}`}
          style={{ transitionDuration: "2000ms" }}
          muted
          playsInline
        />
      )}


      {/* Logo */}
      {showLogo && (
        <motion.img
          src="/assets/logo/logo.png"
          alt="NXTGEN Logo"
          className="relative z-20 mb-8 px-4 w-[80vw] max-w-[520px] sm:max-w-[720px] md:max-w-[900px] lg:max-w-[1152px] h-auto"
          loading="eager"
          fetchpriority="high"
          initial={{ opacity: 0, y: 150 }}
          animate={{ 
            opacity: 1,
            y: 0,
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            opacity: { duration: 1.2, ease: "easeOut" },
            y: { duration: 1.2, ease: "easeOut" },
            scale: { 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatType: "reverse",
              delay: 1.2
            }
          }}
        />
      )}

      {/* International Hackathon Text */}
      {showLogo && (
        <motion.h2
          className="relative z-20 mb-4 px-4 py-3 text-white text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight text-center"
        initial={{ opacity: 0 }}
          animate={showLogo ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          style={{ overflow: 'visible', lineHeight: '1.2' }}
        >
          International Hackathon
        </motion.h2>
      )}

      {/* Date */}
      {showLogo && (
        <motion.p
          className="relative z-20 mb-6 px-4 text-white text-xl sm:text-2xl md:text-3xl font-medium text-center"
          initial={{ opacity: 0 }}
          animate={showLogo ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          21st & 22nd February 2026
        </motion.p>
      )}

      {/* Explore with arrow */}
      {showLogo && (
        <motion.div
          className={`absolute bottom-4 inset-x-0 mx-auto w-fit flex flex-col items-center gap-2 cursor-pointer z-30 ${
            showExplore ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: showExplore ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
        <SplitText
          text="Explore"
          className="text-white text-lg font-medium"
          tag="span"
          delay={50}
          duration={0.5}
          ease="power2.out"
          splitType="chars"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
