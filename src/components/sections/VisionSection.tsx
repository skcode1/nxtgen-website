import React from "react";
import ShinyText from "@/components/ui/ShinyText";

const visionCards = [
  {
    title: "Innovation & Excellence",
    items: [
      "Transforming tomorrow through cutting-edge innovation",
      "Empowering students to turn ideas into real-world tech solutions",
      "AI-driven innovation, collaborative ecosystems, competitive excellence"
    ]
  },
  {
    title: "Sustainable Future",
    items: [
      "Building sustainable digital futures",
      "Technology bridging gaps and solving global challenges",
      "Inclusive opportunities through sustainable ethical tech"
    ]
  },
  {
    title: "Leadership Development",
    items: [
      "Fostering next-generation leaders",
      "Cultivating innovators & problem-solvers of tomorrow",
      "Equipping skills to shape future of tech & humanity"
    ]
  },
  {
    title: "Global Collaboration",
    items: [
      "Creating interconnected ecosystems",
      "Collaboration with industry leaders & institutions",
      "Building bridges connecting ideas, talent globally"
    ]
  },
  {
    title: "UN SDG Alignment",
    items: [
      "SDG 3: Good Health - HealthTech & AthleTech",
      "SDG 7: Clean Energy - EcoTech track",
      "SDG 9: Innovation Infrastructure - Dev Velocity"
    ]
  },
  {
    title: "Impact Areas",
    items: [
      "SDG 11: Sustainable Cities - Voyage Tech",
      "SDG 13: Climate Action - EcoTech track",
      "SDG 16: Peace & Justice - FinTrust track"
    ]
  },
  {
    title: "Responsible Innovation",
    items: [
      "Ethical AI & Responsible Innovation",
      "Global student innovation network",
      "Startup incubation & mentorship"
    ]
  },
  {
    title: "Education & Access",
    items: [
      "Inclusive tech education for all",
      "Breaking barriers through technology",
      "Democratizing knowledge and resources"
    ]
  },
  {
    title: "Digital Transformation",
    items: [
      "SDG 4: Quality Education - EdTech innovations",
      "SDG 8: Decent Work - Career development programs",
      "SDG 10: Reduced Inequalities - Tech accessibility"
    ]
  },
  {
    title: "Community Impact",
    items: [
      "Building resilient tech communities",
      "Peer-to-peer learning ecosystems",
      "Cross-cultural collaboration platforms"
    ]
  },
  {
    title: "Future Technologies",
    items: [
      "Quantum computing exploration",
      "Blockchain for social good",
      "AR/VR for education & training"
    ]
  },
  {
    title: "Research & Development",
    items: [
      "SDG 17: Partnerships for Goals",
      "Open-source contribution culture",
      "Academic-industry collaboration"
    ]
  }
];

const VisionSection = () => {
  return (
    <section id="vision" className="relative min-h-[70vh] md:min-h-screen w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[clamp(2.5rem,9vw,6rem)] md:text-[clamp(3.5rem,12vw,11rem)] font-bold mb-8 md:whitespace-nowrap">
            <ShinyText
              text="Vision"
              speed={2}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              className="block"
            />
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-white/80 font-medium mb-12 leading-relaxed">
              NXTGEN'26 - Transforming Tomorrow Through Innovation
            </p>
          </div>
        </div>

        {/* Vision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {visionCards.map((card, index) => (
            <div
              key={index}
              className="group relative h-80 md:h-96 rounded-3xl overflow-hidden bg-black/50 backdrop-blur-xl border-2 border-white/20 shadow-2xl shadow-black/40 hover:shadow-glow hover:scale-[1.02] transition-all duration-500 cursor-pointer"
            >
              {/* Shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-all duration-700 z-10" />

              {/* Card content */}
              <div className="relative z-20 h-full p-8 md:p-10 flex flex-col justify-between text-white">
                {/* Title */}
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent drop-shadow-lg mb-3 text-center">
                    {card.title}
                  </h3>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>

                {/* Items */}
                <ul className="space-y-3 flex-1">
                  {card.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-sm md:text-base text-white/90 leading-relaxed flex items-start group-hover:text-white transition-colors"
                    >
                      <span className="text-emerald-400 mr-3 flex-shrink-0 font-bold text-lg mt-0.5">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(120%) skewX(-12deg); opacity: 0; }
        }
        .shadow-glow {
          box-shadow:
            0 35px 70px -20px rgba(0, 0, 0, 0.8),
            0 0 60px rgba(255, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
        }
      `}</style>
    </section>
  );
};

export default VisionSection;
