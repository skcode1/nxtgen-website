import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MapPin, Wifi, Coffee, Zap, BatteryCharging } from "lucide-react";
import { LocationMap } from "@/components/ui/location-map";
import ShinyText from "@/components/ui/ShinyText";
import { HighlightCard } from "@/components/ui/highlight-card";

const VenueSection = () => {
  const amenities = [
    {
      title: "Tech-Enabled Halls",
      description:
        "High-speed connectivity, projection-ready venues, and collaboration-ready seating.",
      metricValue: "1 Gbps",
      metricLabel: "Dedicated bandwidth",
      buttonText: "Explore",
      icon: <Wifi className="h-5 w-5" />,
      details:
        "Gigabit internet, projection-ready spaces, and flexible seating layouts for team collaboration.",
    },
    {
      title: "Food & Refreshments",
      description:
        "Continuous snacks, water stations, and meal support for all participants.",
      metricValue: "24/7",
      metricLabel: "Refreshments",
      buttonText: "Details",
      icon: <Coffee className="h-5 w-5" />,
      details:
        "Round-the-clock snacks, hydration stations, and scheduled meals to keep teams energized.",
    },
    {
      title: "Power & Charging",
      description:
        "Multi-point charging, extension zones, and backup power for teams.",
      metricValue: "360°",
      metricLabel: "Charging access",
      buttonText: "Info",
      icon: <BatteryCharging className="h-5 w-5" />,
      details:
        "Multi-point charging bays, extension zones, and backup power coverage across the venue.",
    },
    {
      title: "Rest Zones",
      description:
        "Quiet areas for short breaks, stretches, and recovery between sprints.",
      metricValue: "4+",
      metricLabel: "Rest pockets",
      buttonText: "View",
      icon: <MapPin className="h-5 w-5" />,
      details:
        "Quiet pockets with seating for quick breaks, stretching, and recharge between sessions.",
    },
  ];

  const [activeAmenity, setActiveAmenity] = useState<(typeof amenities)[number] | null>(
    null
  );
  return (
    <section id="venue" className="relative min-h-[70vh] md:min-h-screen py-16 md:py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-4 md:whitespace-nowrap">
          <ShinyText
            text="Venue & Location"
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
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <LocationMap
              location="IVB, Express Avenue, Chennai"
              coordinates="Chennai, Tamil Nadu"
              mapUrl="https://maps.app.goo.gl/8VFUnAmgvGFzqexj8"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 justify-items-center">
            {amenities.map((amenity) => (
              <HighlightCard
                key={amenity.title}
                title={amenity.title}
                description={amenity.description}
                metricValue={amenity.metricValue}
                metricLabel={amenity.metricLabel}
                buttonText={amenity.buttonText}
                onButtonClick={() => setActiveAmenity(amenity)}
                icon={amenity.icon}
                color="darkPurple"
                hideButton
                className="max-w-[220px] p-4"
              />
            ))}
          </div>

          <AnimatePresence>
            {activeAmenity && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveAmenity(null)}
              >
                <motion.div
                  className="w-full max-w-xl rounded-2xl border border-white/10 bg-background p-10 shadow-xl glass-card"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {activeAmenity.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {activeAmenity.details}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => setActiveAmenity(null)}
                    >
                      Close
                    </button>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-foreground">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                      {activeAmenity.icon}
                    </span>
                    <span className="font-semibold">{activeAmenity.metricValue}</span>
                    <span className="text-muted-foreground">{activeAmenity.metricLabel}</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
    </section>
  );
};

export default VenueSection;
