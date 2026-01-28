import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      fixedWeeks={false}
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
      classNames={{
        /* Months wrapper */
        months: "flex flex-col sm:flex-row gap-6",

        /* Single month */
        month: "space-y-4 w-full",

        /* Header */
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-semibold tracking-wide",

        /* Navigation */
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",

        /* Table */
        table: "w-full border-collapse",

        /* Weekday header */
        head_row: "grid grid-cols-7",
        head_cell:
          "text-muted-foreground text-center font-normal text-[0.75rem]",

        /* Week rows → GRID instead of flex */
        row: "grid grid-cols-7 gap-1",

        /* Day cell wrapper */
        cell:
          "relative aspect-square text-center text-sm [&:has([aria-selected])]:bg-accent rounded-xl",

        /* Day button */
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-full w-full rounded-xl p-0 font-normal aria-selected:opacity-100"
        ),

        /* States */
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-40 aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-40",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",

        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
