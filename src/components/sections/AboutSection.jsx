"use client";

import { motion } from "framer-motion";
import { Droplets, Target, Eye, Heart } from "lucide-react";

const cards = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To build a reliable, student-driven blood donation network at Pundra University — ensuring no one on campus or in our community suffers due to blood shortage.",
    accent: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "A future where every emergency blood request is answered within minutes, powered by a connected, compassionate community of verified donors.",
    accent: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Heart,
    title: "Our Values",
    text: "Compassion, urgency, and trust. We verify every donor and request to make sure every donation reaches the person who needs it most.",
    accent: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function AboutSection() {
  return (
    <section className="relative bg-white dark:bg-black py-16 sm:py-24 overflow-hidden">
      {/* Subtle bg accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-red-600/5 dark:bg-red-600/8 blur-3xl" />
      </div>

      <div className="relative max-w-11/12 mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 mb-5">
            <Droplets
              size={12}
              className="text-red-600 dark:text-red-400"
              fill="currentColor"
            />
            <span className="text-[11px] sm:text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
              About BloodAid
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4 leading-tight">
            More than a platform —{" "}
            <span className="text-red-600">a lifeline</span> for our campus.
          </h2>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            BloodAid is a student-run blood donation organization at Pundra
            University of Science & Technology, connecting verified donors with
            patients in need — fast, free, and built on trust.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-14 sm:mb-20">
          {cards.map(({ icon: Icon, title, text, accent, bg }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
              className="p-6 sm:p-7 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors"
            >
              <div
                className={`h-11 w-11 rounded-xl ${bg} flex items-center justify-center mb-4`}
              >
                <Icon size={20} className={accent} />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Image + content split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85"
              alt="Blood donation volunteers"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              Built by students, for the community
            </h3>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
              Founded by a group of passionate PUB students, BloodAid started as
              a small WhatsApp group connecting blood donors during emergencies.
              Today, it&apos;s a structured platform with verified donor
              profiles, volunteer coordination, and real-time emergency response
              — but our mission stays the same: save lives, one donation at a
              time.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-extrabold text-red-600">2023</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Founded
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-red-600">100%</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Free Service
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
