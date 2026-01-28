import ShinyText from "@/components/ui/ShinyText";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

  const prizes = [
    {
    title: "Winner",
    amount: "₹50,000",
    benefits: "Internship and Direct Recruitment",
    image: "/assets/imgs/gold.png",
    details: "Top prize with cash reward, internship opportunities, and direct recruitment offers."
    },
    {
    title: "1st Runner-up",
    amount: "₹30,000",
    benefits: "Internship",
    image: "/assets/imgs/silver.png",
    details: "Second place with cash prize and internship opportunities."
    },
    {
    title: "2nd Runner-up",
    amount: "₹20,000",
    benefits: "Internship",
    image: "/assets/imgs/bronze.png",
    details: "Third place with cash prize and internship opportunities."
  },
  {
    title: "Track Prize",
    amount: "₹10,000",
    benefits: "Per Track",
    image: "/tracks.png",
    details: "Best solution in each track category."
  },
  {
    title: "Special Awards",
    amount: "Various",
    benefits: "Recognition",
    image: "/special.png",
    details: "Innovation awards, design awards, and sponsor-specific prizes."
  },
  {
    title: "Certificates",
    amount: "All",
    benefits: "Participation",
    image: "/cert.png",
    details: "Participation certificates for all registered teams."
  },
];

const PrizesSection = () => {
  const stackItems: CardStackItem[] = prizes.map((prize, index) => ({
    id: index,
    title: prize.title,
    description: `${prize.amount} • ${prize.benefits}`,
    imageSrc: prize.image,
  }));

  return (
    <section id="prizes" className="relative min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-[clamp(2.5rem,8vw,6rem)] md:text-[clamp(3rem,7vw,9rem)] font-bold text-center mb-4 md:whitespace-nowrap">
          <ShinyText
            text="Rewards & Prizes"
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            className="block"
          />
        </h2>

        <div className="max-w-6xl mx-auto">
          <CardStack
            items={stackItems}
            cardWidth={520}
            cardHeight={320}
            maxVisible={5}
            showDots={true}
            renderCard={(item) => (
              <div className="relative h-full w-full">
                <div className="absolute inset-0">
                  {item.imageSrc ? (
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      draggable={false}
                      loading="eager"
                      onError={(event) => {
                        const target = event.currentTarget;
                        if (target.dataset.fallbackApplied === "true") return;
                        target.dataset.fallbackApplied = "true";

                        const fallbackMap: Record<string, string> = {
                          "Track Prize": "/assets/imgs/tracks.png",
                          "Special Awards": "/assets/imgs/special.png",
                          "Certificates": "/assets/imgs/cert.png",
                        };
                        target.src = fallbackMap[item.title] ?? "/placeholder.svg";
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
