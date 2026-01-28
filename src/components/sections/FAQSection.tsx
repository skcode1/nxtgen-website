import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What is the duration of the hackathon?",
    answer:
      "NXTGEN'26 is a 24-hour hackathon. It starts on February 21, 2026 at 9 AM and ends on February 22, 2026 at 9 AM.",
  },
  {
    id: 2,
    question: "Who is eligible to participate?",
    answer:
      "Students from any educational institution (undergraduate, postgraduate, or doctoral) are eligible. No prior hackathon experience required!",
  },
  {
    id: 3,
    question: "What is the team size?",
    answer: "Teams can have 2-4 members. You can participate with a team of 2 to 4.",
  },
 
   {
    id: 5,
    question: "What are the problem statements?",
    answer:
      "There is no fixed problem statement. Innovation has no limits, but hard challenges will be given during the hackathon, and only the ones who survive will finish the project.",
  },
  {
    id: 6,
    question: "What are the benefits of participating?",
    answer:
      "Participants get cash prizes, internship opportunities, direct recruitment offers, certificates, mentorship from industry experts, networking opportunities, and access to workshops and resources.",
  },
  
  {
    id: 7,
    question: "Will I receive a certificate?",
    answer:
      "Yes! All registered participants who complete the hackathon will receive a participation certificate. Winners and track prize winners receive additional recognition certificates.",
  },
  {
    id: 8,
    question: "Is there a registration fee?",
    answer:
      "No, participation is completely free for all registered teams. Food, refreshments, and venue facilities are provided at no cost. We also host a multilingual sing-along session during the midnight.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    id: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    }
  };

  return (
    <section
      id="faq"
      className="relative min-h-[70vh] md:min-h-screen w-full"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-[clamp(2.5rem,9vw,6rem)] md:text-[clamp(3.5rem,12vw,11rem)] font-bold mb-12 md:mb-20">
            <span className="text-white/90">FAQs</span>
          </h2>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map(faq => {
              const isOpen = openId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  layout
                  className="
                    rounded-2xl
                    bg-black/40 backdrop-blur-sm
                    border border-white/10
                    shadow-2xl shadow-black/50
                    overflow-hidden
                    group
                  "
                >
                  {/* QUESTION BUTTON */}
                  <button
                    onClick={() => toggle(faq.id)}
                    onKeyDown={e => handleKeyDown(e, faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="
                      w-full
                      min-h-[72px]
                      px-6
                      flex items-center justify-between
                      text-left
                      text-base md:text-lg
                      font-bold
                      text-white
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-white/50
                      hover:bg-white/5
                      transition-all duration-300
                    "
                  >
                    <span>{faq.question}</span>

                    {/* CHEVRON */}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="ml-4 text-white/70 group-hover:text-white transition-colors"
                    >
                      <ChevronDown size={22} />
                    </motion.span>
                  </button>

                  {/* ANSWER */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="px-6"
                      >
                        <div
                          className="
                            pb-6
                            text-sm md:text-base
                            text-white/90
                            leading-relaxed
                          "
                        >
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
