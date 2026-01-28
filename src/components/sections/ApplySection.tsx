import { motion } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";

const ApplySection = () => {

  return (
    <section id="apply" className="relative min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <ShinyText
              text="Apply Now"
              speed={2}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              className="block"
            />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Apply as a team or solo. Registrations open from 17 Jan 2026 to 14 Feb 2026. Shortlisting before final confirmation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplySection;
