import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";
import { HighlightCard } from "@/components/ui/highlight-card";

const ContactSection = () => {
  const contactMethods = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Message Us",
      description: "Reach us on Instagram",
      content: "@nxtgen_2k26",
      link: "https://www.instagram.com/nxtgen_2k26",
      metricValue: "24/7",
      metricLabel: "Support line",
      color: "darkPurple" as const,
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      description: "Send us an email",
      content: "hackathon@srmrmp.com",
      link: "mailto:hackathon@srmrmp.com",
      metricValue: "1 hr",
      metricLabel: "Response SLA",
      color: "darkPurple" as const,
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      description: "IVB, Express Avenue",
      content: "Chennai, TamilNadu",
      link: "#location",
      metricValue: "On-site",
      metricLabel: "Venue",
      color: "darkPurple" as const,
    },
  ];

  return (
    <section id="contact" className="relative min-h-[70vh] md:min-h-screen pt-16 md:pt-20 pb-7 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 md:whitespace-nowrap">
            <ShinyText
              text="Contact Organisers"
              speed={2}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              className="block"
            />
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Got questions? We're here.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <HighlightCard
                title={method.title}
                description={`${method.description} • ${method.content}`}
                metricValue={method.metricValue}
                metricLabel={method.metricLabel}
                buttonText="Open"
                onButtonClick={() => {
                  window.location.href = method.link;
                }}
                icon={method.icon}
                color={method.color}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
