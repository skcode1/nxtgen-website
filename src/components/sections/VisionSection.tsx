import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/Terminal";
import ShinyText from "@/components/ui/ShinyText";

const VisionSection = () => {
  return (
      <section id="vision" className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center px-4 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] md:text-[clamp(4.5rem,10vw,12rem)] font-bold mb-4 md:whitespace-nowrap">
            <ShinyText
              text="The Vision"
              speed={2}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              className="block"
            />
          </h2>
        </div>
        
        <Terminal className="glass-card border-primary/20">
          <TypingAnimation speed={30}>
            &gt; NXTGEN'26 Vision Statement
          </TypingAnimation>

          <AnimatedSpan className="text-purple-400" delay={500}>
            ✔ Transforming tomorrow through cutting-edge innovation
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={1000}>
            ✔ Empowering students to turn ideas into real-world tech solutions
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={1500}>
            ✔ AI-driven innovation, collaborative ecosystems, and competitive excellence
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={2000}>
            ✔ Building sustainable digital futures
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={2500}>
            ✔ Technology bridging gaps and solving global challenges
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={3000}>
            ✔ Creating inclusive opportunities through sustainable and ethical tech practices
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={3500}>
            ✔ Fostering next-generation leaders
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={4000}>
            ✔ Cultivating innovators and problem-solvers of tomorrow
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={4500}>
            ✔ Equipping skills to shape the future of tech, society, and humanity
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={5000}>
            ✔ Creating interconnected ecosystems
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={5500}>
            ✔ Collaboration with industry leaders, government bodies, and academic institutions
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={6000}>
            ✔ Building bridges connecting ideas, talent, and opportunities globally
          </AnimatedSpan>

          <TypingAnimation className="text-muted-foreground block" speed={30}>
            Vision loaded successfully.
          </TypingAnimation>

          <TypingAnimation speed={30} className="block mt-4">
            &gt; UN SDG Alignment Check
          </TypingAnimation>

          <AnimatedSpan className="text-purple-400" delay={7000}>
            ✔ SDG 3: Good Health and Well-being - HealthTech & AthleTech tracks
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={7500}>
            ✔ SDG 7: Affordable and Clean Energy - EcoTech track
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={8000}>
            ✔ SDG 9: Industry, Innovation and Infrastructure - Dev Velocity track
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={8500}>
            ✔ SDG 11: Sustainable Cities and Communities - Voyage Tech & EcoTech tracks
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={9000}>
            ✔ SDG 13: Climate Action - EcoTech track
          </AnimatedSpan>

          <AnimatedSpan className="text-purple-400" delay={9500}>
            ✔ SDG 16: Peace, Justice and Strong Institutions - FinTrust track
          </AnimatedSpan>

          <TypingAnimation className="text-muted-foreground" speed={30}>
            All SDG alignments verified.
          </TypingAnimation>
        </Terminal>
      </div>
    </section>
  );
};

export default VisionSection;
