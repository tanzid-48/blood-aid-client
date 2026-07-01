"use client";

import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative bg-white dark:bg-black pt-16 sm:pt-24 pb-0 overflow-hidden">
      {/* bg glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-red-600/8 dark:bg-red-600/12 blur-3xl" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 mb-6">
            <Droplets
              size={12}
              className="text-red-600 dark:text-red-400"
              fill="currentColor"
            />
            <span className="text-[11px] sm:text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
              About BloodAid
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-5 leading-tight">
            We exist to <span className="text-red-600">save lives</span> on
            campus and beyond.
          </h1>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            BloodAid is Pundra University&apos;s student-run blood donation
            organization — built on compassion, urgency, and the belief that no
            one should suffer due to a shortage of blood.
          </p>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative w-full aspect-[16/7] sm:aspect-[21/8] rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1600&q=85"
            alt="Blood donation team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Overlay badge */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/40">
              <Droplets size={18} className="text-white" fill="currentColor" />
            </div>
            <div>
              <p className="text-white font-bold text-sm sm:text-base leading-none">
                BloodAid PUB
              </p>
              <p className="text-white/60 text-xs mt-0.5">
                Est. 2023 · Bogura, Bangladesh
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
