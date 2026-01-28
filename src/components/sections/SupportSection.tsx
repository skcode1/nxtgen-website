import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Handshake, FileText } from "lucide-react";
import ShinyText from "@/components/ui/ShinyText";

const SupportSection = () => {
  const actions = [
    {
      icon: MessageCircle,
      title: "General Enquiries",
      description: "Have questions? We're here to help.",
      color: "neon-cyan",
    },
    {
      icon: Handshake,
      title: "Sponsorship",
      description: "Partner with us for NXTGEN'26.",
      color: "neon-magenta",
    },
    {
      icon: FileText,
      title: "Code of Conduct",
      description: "Read our community guidelines.",
      color: "neon-green",
    },
  ];

  return (
    <section id="support" className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl mb-4">
            <ShinyText
              text="GOT QUESTIONS?"
              speed={2}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              className="block"
            />
          </h2>
          <p className="text-2xl font-body font-semibold text-foreground">
            We're here.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-xl text-center group hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              <action.icon className={`w-10 h-10 mx-auto mb-4 ${
                action.color === 'neon-cyan' ? 'text-primary' : 
                action.color === 'neon-magenta' ? 'text-secondary' : 
                'text-accent'
              } group-hover:scale-110 transition-transform duration-300`} />
              <h3 className="font-body text-lg font-semibold text-foreground mb-2">
                {action.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body">{action.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground font-body">
            Official event under <span className="text-secondary font-semibold">TEXUS</span> × <span className="text-primary font-semibold">SRM IST Ramapuram</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportSection;
