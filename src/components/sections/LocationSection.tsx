import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Bus } from "lucide-react";
import ShinyText from "@/components/ui/ShinyText";

const LocationSection = () => {
  return (
    <section id="location" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl mb-4">
            <ShinyText
              text="WHERE TO BE"
              speed={2}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              className="block"
            />
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            SRM Ramapuram Campus, Chennai
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl overflow-hidden"
        >
          <div className="h-80 sm:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5085825547!2d80.17920731482219!3d13.0323447908177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261df11a3d3c3%3A0x4e2a8d6f9c6d6f7e!2sSRM%20Institute%20of%20Science%20and%20Technology%20Ramapuram!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-body text-foreground">Chennai, Tamil Nadu</p>
                <p className="text-sm text-muted-foreground">Well connected by metro, bus & train</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-body"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
              <Button
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 font-body"
              >
                <Bus className="w-4 h-4 mr-2" />
                Travel Guide
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
