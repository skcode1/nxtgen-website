import React, { useState } from "react";
import ShinyText from "@/components/ui/ShinyText";
import { cn } from "@/lib/utils";

/* ---------------- DATA ---------------- */

const EVENTS: Record<string, { title: string; time: string }[]> = {
  "2026-01-27": [{ title: "Registrations Open", time: "09:00 AM" }],
  "2026-02-14": [{ title: "Registrations Close", time: "11:59 PM" }],
  "2026-02-16": [{ title: "Team Shortlisting", time: "10:00 AM" }],
  "2026-02-21": [{ title: "Hackathon Kickoff", time: "09:00 AM" }],
  "2026-02-22": [
    { title: "Build Ends", time: "09:00 AM" },
    { title: "Jury Demos", time: "10:00 AM" },
    { title: "Winners Announced", time: "01:00 PM" },
  ],
};

const MONTHS = [
  { name: "January", year: 2026, days: 31, startDay: 4 },
  { name: "February", year: 2026, days: 28, startDay: 0 },
  { name: "March", year: 2026, days: 31, startDay: 0 },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ---------------- COMPONENT ---------------- */

export default function TimelineSection() {
  const [selectedDate, setSelectedDate] = useState("2026-01-27");

  return (
    <section id="schedule" className="relative py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-14">
          <ShinyText
            text="Calendar"
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
          />
        </h2>

        {/* Hybrid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
          {/* ================= HORIZONTAL CALENDAR ================= */}
          <div className="relative rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-6 overflow-hidden">
            {/* Scroll Container */}
            <div
              className="
                flex gap-8 overflow-x-auto scroll-smooth
                snap-x snap-mandatory
                scrollbar-hide
              "
            >
              {MONTHS.map((month, monthIndex) => (
                <div
                  key={month.name}
                  className="snap-center shrink-0 w-full"
                >
                  {/* Month Header */}
                  <h3 className="text-white font-semibold mb-4 text-center">
                    {month.name} {month.year}
                  </h3>

                  {/* Weekdays */}
                  <div className="grid grid-cols-7 text-xs text-white/50 mb-2">
                    {WEEKDAYS.map((d) => (
                      <div key={d} className="text-center">
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: month.startDay }).map((_, i) => (
                      <div key={`spacer-${monthIndex}-${i}`} />
                    ))}

                    {Array.from({ length: month.days }).map((_, i) => {
                      const day = i + 1;
                      const monthNumber = monthIndex + 1;
                      const dateKey = `2026-${String(
                        monthNumber
                      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                      const hasEvent = !!EVENTS[dateKey];
                      const active = selectedDate === dateKey;

                      return (
                        <button
                          key={dateKey}
                          onClick={() => hasEvent && setSelectedDate(dateKey)}
                          className={cn(
                            "aspect-square max-w-[44px] w-full mx-auto rounded-xl",
                            "flex items-center justify-center text-sm font-medium transition",
                            hasEvent
                              ? "bg-white/10 border border-white/20 hover:bg-white/20"
                              : "text-white/30",
                            active &&
                              "ring-2 ring-emerald-400 bg-emerald-400/10"
                          )}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= TIMELINE ================= */}
          <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-6">
            <h3 className="text-white font-semibold mb-6">
              Schedule · {selectedDate}
            </h3>

            <div className="space-y-4">
              {EVENTS[selectedDate]?.map((event, idx) => (
                <div
                  key={idx}
                  className="relative pl-6 border-l border-white/20"
                >
                  <div className="absolute -left-[6px] top-1.5 h-3 w-3 rounded-full bg-emerald-400" />
                  <p className="text-white font-medium">{event.title}</p>
                  <p className="text-sm text-white/60">{event.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
