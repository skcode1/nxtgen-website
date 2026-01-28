import { useState } from "react";
import FlowingMenu from "@/components/ui/FlowingMenu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ShinyText from "@/components/ui/ShinyText";

  const tracks = [
    {
    link: '#',
    text: 'EcoTech',
    image: '/assets/imgs/ecotech.png',
    description:
      'EcoTech Intelligence develops software for sustainability and environmental monitoring solutions. It covers air/water/agriculture monitoring, renewable energy tools like solar optimization and smart grids, carbon management for ESG, and precision farming for soil, water, and crop improvements.',
    },
    {
    link: '#',
    text: 'HealthTech',
    image: '/assets/imgs/healthtech.png',
    description:
      'Biomedical Solutions builds digital healthcare systems to boost patient outcomes, efficiency, and access. The track targets multilingual medicine, AI clinical decision support, remote monitoring, PHR platforms, and healthcare analytics for population management, hospital optimization, and automated insurance claims.',
    },
    {
    link: '#',
    text: 'AthleTech',
    image: '/assets/imgs/athletech.png',
    description:
      'AthleTech drives software innovations for athletic performance, analytics, and fitness. The track covers community apps, fan engagement, interactive viewing, sports analytics, wellness tech like yoga, operational systems for competitions and scholarships, and nutrition tracking with localized food databases.',
    },
    {
    link: '#',
    text: 'Dev Velocity',
    image: '/assets/imgs/developer.png',
    description:
      'Dev Velocity emphasizes intelligent automation to accelerate business processes and software development. The track highlights developer tools, code analysis, debugging, workflow automation, cloud infrastructure, CI/CD pipelines, logistics/supplier management, compliant supply chain automation, and cost-effective startup monitoring.',
    },
    {
    link: '#',
    text: 'Voyage Tech',
    image: '/assets/imgs/travel.png',
    description:
      'VoyageTech Experience aims to transform transportation, tourism, and urban mobility with intelligent software solutions. The track covers public transport with real-time tracking and safety, smart tourism apps for monuments/cultural experiences/custom itineraries/regional cuisine, route guidance, crowd monitoring, accessibility, multimodal aggregators, and unified payments.',
    },
    {
    link: '#',
    text: 'FinTrust',
    image: '/assets/imgs/fintrust.png',
    description:
      'FinTech Fusion merges decentralized infrastructure with traditional finance for secure, transparent solutions. The track covers blockchain invoice financing, digital token creation, asset platforms with verified identity, automated microfinance, secure payments, regulatory compliance software, digital document identity verification, tax reconciliation, and transaction monitoring.',
    },
  ];

const TracksSection = () => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const track = tracks.find(t => t.text === selectedTrack);

  return (
    <section id="tracks" className="relative min-h-[70vh] md:min-h-screen w-full">
      <div className="container mx-auto px-4 pt-4 pb-2">
        <h2 className="text-[clamp(2.5rem,9vw,6rem)] md:text-[clamp(3.5rem,12vw,11rem)] font-bold text-center mb-10 md:mb-12 md:whitespace-nowrap">
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

      <div className="h-[360px] sm:h-[480px] md:h-[600px] relative">
        <FlowingMenu 
          items={tracks}
          speed={15}
          textColor="#fff"
          bgColor="#060010"
          marqueeBgColor="#fff"
          marqueeTextColor="#060010"
          borderColor="#fff"
          onItemClick={(item) => setSelectedTrack(item.text)}
        />
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
