import React from "react";
import { cn } from "@/lib/utils";

type EventMap = Record<string, { title: string; time?: string }[]>;

const MONTHS = [
  { name: "January", year: 2026, days: 31, startDay: 4 }, // Thu
  { name: "February", year: 2026, days: 28, startDay: 0 }, // Sun
  { name: "March", year: 2026, days: 31, startDay: 0 }, // Sun
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface ManualCalendarProps {
  events?: EventMap;
}

export default function ManualCalendar({ events = {} }: ManualCalendarProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {MONTHS.map((month) => (
        <div
          key={month.name}
          className="w-full rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 p-5"
        >
          {/* Month Header */}
          <h3 className="text-center text-lg font-semibold text-white mb-4">
            {month.name} {month.year}
          </h3>

          {/* Weekdays */}
          <div className="grid grid-cols-7 text-xs text-white/60 mb-2">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-center">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty offset cells */}
            {Array.from({ length: month.startDay }).map((_, i) => (
              <div key={`offset-${i}`} />
            ))}

            {/* Days */}
            {Array.from({ length: month.days }).map((_, i) => {
              const date = i + 1;
              const key = `${month.year}-${month.name}-${date}`;
              const hasEvent = events[key]?.length;

              return (
                <div
                  key={key}
                  className={cn(
                    "aspect-square max-w-[44px] w-full mx-auto rounded-xl",
                    "flex items-center justify-center text-sm font-medium",
                    "bg-white/5 border border-white/10",
                    "hover:bg-white/10 transition",
                    hasEvent && "ring-2 ring-emerald-400"
                  )}
                >
                  {date}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
