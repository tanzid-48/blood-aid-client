"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, Droplets, Users, Tag } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Blood Donation Awareness Seminar",
    category: "Seminar",
    date: "August 10, 2026",
    time: "2:00 PM – 5:00 PM",
    location: "PUB Seminar Hall, Bogura",
    description:
      "A seminar on the importance of blood donation, myths and facts, and how to prepare for donation.",
    capacity: 200,
    registered: 145,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Volunteer Orientation Program",
    category: "Training",
    date: "July 25, 2026",
    time: "10:00 AM – 1:00 PM",
    location: "PUB Student Center",
    description:
      "Orientation for new BloodAid volunteers. Learn about your role, responsibilities, and how to handle emergency requests.",
    capacity: 50,
    registered: 38,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Annual BloodAid Conference 2026",
    category: "Conference",
    date: "September 20, 2026",
    time: "9:00 AM – 6:00 PM",
    location: "PUB Auditorium, Bogura",
    description:
      "Annual gathering of donors, volunteers, and medical professionals to discuss blood donation challenges and solutions.",
    capacity: 500,
    registered: 312,
    status: "upcoming",
  },
  {
    id: 4,
    title: "Donor Appreciation Night",
    category: "Celebration",
    date: "June 14, 2026",
    time: "6:00 PM – 9:00 PM",
    location: "PUB Convention Center",
    description:
      "A special evening to celebrate and honor our top blood donors. Awards, dinner, and more.",
    capacity: 150,
    registered: 150,
    status: "completed",
  },
];

const CATEGORIES = ["All", "Seminar", "Training", "Conference", "Celebration"];

const STATUS_COLORS = {
  upcoming: {
    label: "Upcoming",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-900/40",
  },
  completed: {
    label: "Completed",
    color: "text-zinc-500",
    bg: "bg-zinc-100 dark:bg-zinc-800",
    border: "border-zinc-200 dark:border-zinc-700",
  },
};

const CATEGORY_COLORS = {
  Seminar:
    "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30",
  Training: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
  Conference:
    "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30",
  Celebration:
    "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
};

export default function EventsPage() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? events : events.filter((e) => e.category === filter);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a]">
      {/* Header */}
      <div className="bg-white dark:bg-black border-b border-zinc-200 dark:border-white/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 mb-5">
              <Calendar size={12} className="text-red-600 dark:text-red-400" />
              <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Events
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              Upcoming & Past Events
            </h1>
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
              Stay updated with BloodAid seminars, training sessions, and
              community events.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
        {/* Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap transition-all shrink-0 ${
                filter === cat
                  ? "bg-red-600 border-red-600 text-white"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((event, i) => {
              const s = STATUS_COLORS[event.status];
              const catColor = CATEGORY_COLORS[event.category];
              const pct = Math.round((event.registered / event.capacity) * 100);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${catColor}`}
                        >
                          <Tag size={9} className="inline mr-1" />
                          {event.category}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${s.bg} ${s.color} ${s.border}`}
                        >
                          {s.label}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <Calendar size={13} className="text-red-500 shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <Clock size={13} className="text-red-500 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <MapPin size={13} className="text-red-500 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <Users size={13} className="text-red-500 shrink-0" />
                      <span>
                        {event.registered} / {event.capacity} registered
                      </span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className={`h-full rounded-full ${pct >= 100 ? "bg-emerald-500" : "bg-red-600"}`}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-1">
                      {pct}% capacity filled
                    </p>
                  </div>

                  {event.status === "upcoming" && pct < 100 && (
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all">
                      Register Now
                    </button>
                  )}
                  {pct >= 100 && event.status === "upcoming" && (
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                      Fully booked
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
