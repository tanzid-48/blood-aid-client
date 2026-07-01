"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "2023",
    title: "How it started",
    text: "A small group of PUB students created a WhatsApp group to share emergency blood requests on campus. Within weeks, they had connected over 50 donors.",
  },
  {
    year: "Early 2024",
    title: "Going digital",
    text: "BloodAid launched its first website — a simple form to register donors. Within months, 200+ donors had signed up.",
  },
  {
    year: "Mid 2024",
    title: "First campaign",
    text: "BloodAid organized its first blood donation camp at PUB, collecting 80+ units of blood in a single day.",
  },
  {
    year: "2025",
    title: "Full platform",
    text: "The platform launched with real-time emergency requests, donor search, and volunteer coordination — saving over 1,200 lives to date.",
  },
];

export default function AboutStory() {
  return (
    <section className="bg-white dark:bg-black py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?auto=format&fit=crop&w=1200&q=85"
                alt="Our story"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xl">
              <p className="text-3xl font-extrabold text-red-600">1,200+</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Lives saved since 2023
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-widest">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mt-3 mb-8 tracking-tight">
              From a WhatsApp group to a campus lifeline
            </h2>

            <div className="relative space-y-0">
              {/* Vertical line */}
              <div className="absolute left-4 top-2 bottom-2 w-px bg-zinc-100 dark:bg-zinc-800" />

              {timeline.map(({ year, title, text }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="relative flex gap-6 pb-7 last:pb-0"
                >
                  {/* Dot */}
                  <div className="relative z-10 h-8 w-8 rounded-full bg-white dark:bg-zinc-950 border-2 border-red-500 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                  </div>
                  <div className="pt-0.5">
                    <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest">
                      {year}
                    </span>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-white mt-0.5 mb-1">
                      {title}
                    </h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
