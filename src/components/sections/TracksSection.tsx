import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ShinyText from "@/components/ui/ShinyText";

const tracks = [
  {
    id: 1,
    link: '#',
    text: 'EcoTech',
    image: '/assets/imgs/ecotech.png',
    description:
      'EcoTech Intelligence develops software for sustainability and environmental monitoring solutions. It covers air/water/agriculture monitoring, renewable energy tools like solar optimization and smart grids, carbon management for ESG, and precision farming for soil, water, and crop improvements.',
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 2,
    link: '#',
    text: 'HealthTech',
    image: '/assets/imgs/healthtech.png',
    description:
      'Biomedical Solutions builds digital healthcare systems to boost patient outcomes, efficiency, and access. The track targets multilingual medicine, AI clinical decision support, remote monitoring, PHR platforms, and healthcare analytics for population management, hospital optimization, and automated insurance claims.',
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    link: '#',
    text: 'AthleTech',
    image: '/assets/imgs/athletech.png',
    description:
      'AthleTech drives software innovations for athletic performance, analytics, and fitness. The track covers community apps, fan engagement, interactive viewing, sports analytics, wellness tech like yoga, operational systems for competitions and scholarships, and nutrition tracking with localized food databases.',
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    id: 4,
    link: '#',
    text: 'Dev Velocity',
    image: '/assets/imgs/developer.png',
    description:
      'Dev Velocity emphasizes intelligent automation to accelerate business processes and software development. The track highlights developer tools, code analysis, debugging, workflow automation, cloud infrastructure, CI/CD pipelines, logistics/supplier management, compliant supply chain automation, and cost-effective startup monitoring.',
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 5,
    link: '#',
    text: 'Voyage Tech',
    image: '/assets/imgs/travel.png',
    description:
      'VoyageTech Experience aims to transform transportation, tourism, and urban mobility with intelligent software solutions. The track covers public transport with real-time tracking and safety, smart tourism apps for monuments/cultural experiences/custom itineraries/regional cuisine, route guidance, crowd monitoring, accessibility, multimodal aggregators, and unified payments.',
    gradient: "from-yellow-500/20 to-amber-500/20",
  },
  {
    id: 6,
    link: '#',
    text: 'FinTrust',
    image: '/assets/imgs/fintrust.png',
    description:
      'FinTech Fusion merges decentralized infrastructure with traditional finance for secure, transparent solutions. The track covers blockchain invoice financing, digital token creation, asset platforms with verified identity, automated microfinance, secure payments, regulatory compliance software, digital document identity verification, tax reconciliation, and transaction monitoring.',
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
];

const TracksSection = () => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const track = tracks.find(t => t.text === selectedTrack);

  return (
    <section id="tracks" className="relative min-h-[70vh] md:min-h-screen w-full">
      {/* Tracks Grid - Full content now starts immediately */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-[clamp(2.5rem,9vw,6rem)] md:text-[clamp(3.5rem,12vw,11rem)] font-bold mb-4">
            <ShinyText
              text="Tracks"
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

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="group relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-500 group-hover:border-white/30 group-hover:shadow-2xl group-hover:shadow-white/10">

                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                  <img
                    src={track.image}
                    alt={track.text}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative h-full flex flex-col p-6 md:p-8">
                  <div className="flex-1 flex items-center justify-center text-center">

                    {/* Normal Title */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight transition-opacity duration-300 group-hover:opacity-0">
                      {track.text}
                    </h3>
                  </div>

                  {/* Hover Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/60 backdrop-blur-md">
                    <div className="space-y-4">
                      <h4 className="text-xl md:text-2xl font-bold text-white border-b border-white/20 pb-2">
                        What is {track.text}?
                      </h4>
                      <p className="text-sm md:text-base text-white/90 leading-relaxed line-clamp-[10]">
                        {track.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 group-hover:animate-shine" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shine Animation */}
        <style>{`
          @keyframes shine {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(200%) skewX(-12deg); }
          }
          .group:hover .animate-shine {
            animation: shine 1.5s ease-in-out;
          }
        `}</style>
      </div>

      <Dialog open={!!selectedTrack} onOpenChange={() => setSelectedTrack(null)}>
        <DialogContent className="max-w-[90vw] p-6 sm:p-10 md:p-16 glass-card border-zinc-800/50">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">{track?.text}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Tap a track in the grid to see details.
            </DialogDescription>
          </DialogHeader>
          {track && (
            <div className="grid gap-6 md:grid-cols-[220px_1fr] items-start">
              <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
                <img
                  src={track.image}
                  alt={track.text}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-3 text-left">
                <p className="text-base md:text-lg text-white/90">{track.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TracksSection;
