import { ServiceCard } from "@/components/ui/service-card";
import ShinyText from "@/components/ui/ShinyText";
import { cn } from "@/lib/utils";

const FormatSection = () => {
  const steps = [
    {
      title: "Register",
      href: "#apply",
      imgSrc: "/assets/imgs/reg.png",
      imgAlt: "Registration illustration",
      variant: "blue" as const,
      popupContent: [
        "Fill out the registration form with your team details, preferred track, and project idea.",
        "Submit before the deadline to be considered for the hackathon selection process."
      ],
    },
    {
      title: "Get Shortlisted",
      href: "#",
      imgSrc: "/assets/imgs/short.png",
      imgAlt: "Shortlisting illustration",
      variant: "default" as const,
      popupContent: [
        "Our jury reviews all applications based on innovation, feasibility, and alignment with tracks.",
        "Selected teams receive confirmation emails with event details and preparation guidelines."
      ],
    },
    {
      title: "Build for 24 Hours",
      href: "#",
      imgSrc: "/assets/imgs/24hr.png",
      imgAlt: "Building illustration",
      variant: "red" as const,
      popupContent: [
        "Work intensively with your team to develop your solution using provided resources and mentorship.",
        "Leverage workshops, tech support, and industry mentors to refine your project throughout the event."
      ],
    },
    {
      title: "Present & Win",
      href: "#",
      imgSrc: "/assets/imgs/prize.png",
      imgAlt: "Presentation illustration",
      variant: "gray" as const,
      popupContent: [
        "Present your solution to judges including startup CEOs, CTOs, and industry experts.",
        "Winners receive prizes, recognition, and potential opportunities for further development."
      ],
    },
  ];

  return (
    <section id="format" className="relative min-h-[70vh] md:min-h-screen pt-16 md:pt-20 pb-10 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-4 md:whitespace-nowrap">
          <ShinyText
            text="How It Works"
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            className="block"
          />
        </h2>

        <div className="w-full md:max-w-4xl mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step) => (
              <ServiceCard
                key={step.title}
                title={step.title}
                href={step.href}
                imgSrc={step.imgSrc}
                imgAlt={step.imgAlt}
                variant={step.variant}
                popupContent={step.popupContent}
                className="min-h-[180px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormatSection;
