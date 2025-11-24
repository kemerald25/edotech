"use client";

import { upcomingEvents } from "@/data/site-data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

function getDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const days = Array(firstDay).fill(null);
  for (let day = 1; day <= totalDays; day++) {
    days.push(day);
  }
  while (days.length % 7 !== 0) {
    days.push(null);
  }
  return days;
}

export function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const days = useMemo(
    () => getDays(selectedDate.getFullYear(), selectedDate.getMonth()),
    [selectedDate],
  );
  const monthLabel = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const eventLookup = useMemo(() => {
    const map = new Map<string, { title: string; location: string }>();
    upcomingEvents.forEach((event) => {
      const date = new Date(event.date);
      if (
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      ) {
        map.set(date.getDate().toString(), {
          title: event.title,
          location: event.location,
        });
      }
    });
    return map;
  }, [selectedDate]);

  return (
    <div className="rounded-3xl border border-white/10 p-6">
      <div className="mb-4 flex items-center justify-between">
        <button
          className="rounded-full border border-white/10 p-2"
          onClick={() =>
            setSelectedDate(
              new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1),
            )
          }
        >
          <ArrowLeft className="size-4" />
        </button>
        <p className="text-lg font-semibold">{monthLabel}</p>
        <button
          className="rounded-full border border-white/10 p-2"
          onClick={() =>
            setSelectedDate(
              new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1),
            )
          }
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.3em] text-neutral-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2 text-center">
        {days.map((day, index) => {
          const key = `${index}-${day ?? "null"}`;
          const event = day ? eventLookup.get(day.toString()) : null;
          return (
            <div
              key={key}
              className={`rounded-2xl border px-2 py-4 text-sm ${
                event
                  ? "border-secondary/60 bg-secondary/10 text-secondary"
                  : "border-white/5 text-neutral-300"
              }`}
            >
              {day ?? ""}
              {event && (
                <div className="mt-2 text-[10px] uppercase tracking-[0.3em]">
                  {event.location}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

