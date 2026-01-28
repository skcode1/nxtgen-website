import { FaqAccordion } from "@/components/ui/faq-chat-accordion";
import { motion } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";

const FAQSection = () => {
  const faqs = [
    {
      id: 1,
      question: "What is the duration of the hackathon?",
      answer: "NXTGEN'26 is a 24-hour hackathon. It kicks off on February 21, 2026 at 9 AM and ends on February 22, 2026 at 9 AM.",
      icon: "⏱️",
      iconPosition: "right" as const,
    },
    {
      id: 2,
      question: "Who is eligible to participate?",
      answer: "Students from any educational institution (undergraduate, postgraduate, or doctoral) are eligible. No prior hackathon experience required!",
      icon: "🎓",
      iconPosition: "left" as const,
    },
    {
      id: 3,
      question: "What is the team size?",
      answer: "Teams can have 2-4 members. You can participate with a team of 2 to 4.",
      icon: "👥",
      iconPosition: "right" as const,
    },
    {
      id: 4,
      question: "How does the shortlisting process work?",
      answer: "Registrations close on February 14, 2026. Teams will be shortlisted on February 16, 2026 based on their applications, portfolios, and GitHub profiles. Selected teams will be notified via email and SMS.",
      icon: "📋",
      iconPosition: "left" as const,
    },
    {
      id: 5,
      question: "What are the problem statements?",
      answer: "There is no fixed problem statement. Innovation has no limits, but hard challenges will be given during the hackathon, and only the ones who survive will finish the project.",
      icon: "💡",
      iconPosition: "right" as const,
    },
    {
      id: 6,
      question: "What are the benefits of participating?",
      answer: "Participants get cash prizes, internship opportunities, direct recruitment offers, certificates, mentorship from industry experts, networking opportunities, and access to workshops and resources.",
      icon: "🏆",
      iconPosition: "left" as const,
    },
    {
      id: 7,
      question: "Will I receive a certificate?",
      answer: "Yes! All registered participants who complete the hackathon will receive a participation certificate. Winners and track prize winners receive additional recognition certificates.",
      icon: "📜",
      iconPosition: "right" as const,
    },
    {
      id: 8,
      question: "Is there a registration fee?",
      answer: "No, participation is completely free for all registered teams. Food, refreshments, and venue facilities are provided at no cost. We also host a multilingual sing-along session during the midnight.",
      icon: "💰",
      iconPosition: "left" as const,
    },
  ];

  return (
    <section id="faq" className="relative min-h-[70vh] md:min-h-screen py-8 md:py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 md:whitespace-nowrap">
            <ShinyText
              text="FAQs"
              speed={2}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              className="block"
            />
          </h2>
        </motion.div>

        <FaqAccordion
          data={faqs}
          className="max-w-[900px] md:max-w-[1000px] mx-auto"
          timestamp=""
          questionClassName="glass-card hover:bg-primary/10"
          answerClassName="bg-primary/90 text-primary-foreground"
        />
      </div>
    </section>
  );
};

export default FAQSection;
