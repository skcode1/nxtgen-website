import ShinyText from "@/components/ui/ShinyText";
import { GlareCard } from "@/components/ui/glare-card";
import { StardustButton } from "@/components/ui/stardust-button";

const PitchSection = () => {
  const goToInstagram = () => {
    window.open("https://www.instagram.com/nxtgen_2k26", "_blank", "noopener,noreferrer");
  };

  const pitchItems = [
    "NXTGEN'26 is a TEXUS 2026 student hackathon uniting innovators to build high-impact tech in 24 hours.",
    "We are honored to host the IT Minister and the former IT Minister (now Milk and Dairy Development Minister) as they engage with students.",
    "Featuring 15 startups, 12 startup CEOs as mentors, and 6 CTOs on the jury for deep industry guidance.",
    "NXTGEN'26 is the biggest student-led hackathon of the year and India's first in a Destination Mall."
  ];

  return (
    <section id="pitch" className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center px-4 py-16 md:py-20">
      <div className="w-full text-center">
        <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-center mb-10 md:mb-12 md:whitespace-nowrap">
          <ShinyText
            text="About NXTGEN'26"
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            className="block"
          />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-2 mb-10 md:mb-12 place-items-center">
          {pitchItems.map((text, index) => (
            <GlareCard key={index} className="p-6 flex items-center">
              <p className="text-left text-[clamp(0.8rem,2vw,1.5rem)] font-body text-foreground">
                {text}
              </p>
            </GlareCard>
          ))}
        </div>

        <StardustButton onClick={goToInstagram}>
          Start Hacking
        </StardustButton>
      </div>
    </section>
  );
};

export default PitchSection;
