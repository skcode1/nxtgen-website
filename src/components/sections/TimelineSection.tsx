import { FullScreenCalendar } from "@/components/ui/fullscreen-calendar";
import ShinyText from "@/components/ui/ShinyText";

const TimelineSection = () => {
  const calendarData = [
    {
      day: new Date(2026, 0, 27),
      events: [
        {
          id: 1,
          name: "Registrations Open",
          time: "Jan 27",
          datetime: "2026-01-27",
        },
      ],
    },
    {
      day: new Date(2026, 1, 14),
      events: [
        {
          id: 2,
          name: "Registrations Close",
          time: "Feb 14",
          datetime: "2026-02-14",
        },
      ],
    },
    {
      day: new Date(2026, 1, 16),
      events: [
        {
          id: 3,
          name: "Team Shortlisting",
          time: "Feb 16",
          datetime: "2026-02-16",
        },
      ],
    },
    {
      day: new Date(2026, 1, 21),
      events: [
        {
          id: 4,
          name: "Hackathon Kickoff",
          time: "Feb 21, 9 AM",
          datetime: "2026-02-21T09:00",
        },
      ],
    },
    {
      day: new Date(2026, 1, 22),
      events: [
        {
          id: 5,
          name: "Build Ends",
          time: "Feb 22, 9 AM",
          datetime: "2026-02-22T09:00",
        },
        {
          id: 6,
          name: "Jury Demos",
          time: "Feb 22, 10 AM",
          datetime: "2026-02-22T10:00",
        },
        {
          id: 7,
          name: "Winners Announced",
          time: "Feb 22, 1 PM",
          datetime: "2026-02-22T13:00",
        },
      ],
    },
  ];

  return (
    <section id="schedule" className="relative py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-10 md:mb-12 md:whitespace-nowrap">
          <ShinyText
            text="Calendar"
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            className="block"
          />
        </h2>
        <div className="rounded-2xl border border-white/10 bg-black/60">
          <FullScreenCalendar data={calendarData} />
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
