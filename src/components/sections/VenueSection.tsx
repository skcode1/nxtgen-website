import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MapPin, Wifi, Coffee, BatteryCharging } from "lucide-react";
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
      icon: <Wifi className="h-5 w-5" />,
      details:
        "Gigabit internet, projection-ready spaces, and flexible seating layouts for team collaboration.",
    },
    {
      title: "Refreshments",
      description:
        "Continuous snacks, drinking water stations, and meal support will be provided for all participants.",
      metricValue: "24/7",
      metricLabel: "Refreshments",
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
      icon: <MapPin className="h-5 w-5" />,
      details:
        "Quiet pockets with seating for quick breaks, stretching, and recharge between sessions.",
    },
  ];

  const [activeAmenity, setActiveAmenity] =
    useState<(typeof amenities)[number] | null>(null);

  return (
    <section
      id="venue"
      className="relative min-h-[70vh] md:min-h-screen py-16 md:py-20 px-4"
    >
      <div className="container mx-auto">
        {/* Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-center mb-10 md:whitespace-nowrap">
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

        {/* Main Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:h-[700px]">
            {/* LEFT: Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[400px] lg:h-full rounded-2xl overflow-hidden"
            >
              <LocationMap
                layout="fill"
                className="absolute inset-0"
                location="IVB, Express Avenue, Chennai"
                coordinates="Chennai, Tamil Nadu"
                mapUrl="https://maps.app.goo.gl/8VFUnAmgvGFzqexj8"
              />
            </motion.div>

            {/* RIGHT: Amenities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {amenities.map((amenity) => (
                <HighlightCard
                  key={amenity.title}
                  title={amenity.title}
                  description={amenity.description}
                  metricValue={amenity.metricValue}
                  metricLabel={amenity.metricLabel}
                  icon={amenity.icon}
                  color="darkPurple"
                  hideButton
                  className="h-full"
                  onButtonClick={() => setActiveAmenity(amenity)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal (kept OUTSIDE grid) */}
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
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {activeAmenity.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {activeAmenity.details}
                  </p>
                </div>
                <button
                  className="text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setActiveAmenity(null)}
                >
                  Close
                </button>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  {activeAmenity.icon}
                </span>
                <span className="text-lg font-semibold">
                  {activeAmenity.metricValue}
                </span>
                <span className="text-sm text-muted-foreground">
                  {activeAmenity.metricLabel}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VenueSection;
