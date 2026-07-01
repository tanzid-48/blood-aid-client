"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export default function AboutMission() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-950 py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-widest">
            Mission & Vision
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mt-3 tracking-tight">
            What drives us every day
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden p-7 sm:p-10"
            style={{ background: "linear-gradient(135deg, #7f1d1d, #dc2626)" }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 translate-x-10 -translate-y-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-black/10 -translate-x-8 translate-y-8" />

            <div className="relative z-10">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                <Target size={22} className="text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Our Mission
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                To build a reliable, student-driven blood donation network at
                Pundra University — ensuring no one on campus or in our
                community suffers due to blood shortage.
              </p>
              <div className="mt-6 pt-5 border-t border-white/20">
                <p className="text-white/60 text-sm italic">
                  &ldquo;Every drop of blood donated is a step toward a safer,
                  stronger community.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl p-7 sm:p-10 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-red-600/5 translate-x-10 -translate-y-10" />

            <div className="relative z-10">
              <div className="h-12 w-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-5">
                <Eye size={22} className="text-red-600 dark:text-red-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                Our Vision
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                A future where every emergency blood request is answered within
                minutes, powered by a connected, compassionate community of
                verified donors across Pundra University and beyond.
              </p>
              <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex flex-wrap gap-2">
                  {[
                    "Fast Response",
                    "Verified Donors",
                    "Community-Driven",
                    "Always Available",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
