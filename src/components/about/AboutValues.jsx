"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Zap, Users, Lock, Star } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    text: "Every decision we make starts with empathy — for donors, recipients, and our community.",
    color: "text-red-500", bg: "bg-red-500/10",
  },
  {
    icon: Zap,
    title: "Urgency Always",
    text: "Blood emergencies can't wait. We build every feature with speed and reliability as the priority.",
    color: "text-amber-500", bg: "bg-amber-500/10",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    text: "All donors are verified. All requests are screened. Your safety is never compromised.",
    color: "text-blue-500", bg: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Community-Driven",
    text: "Built by students, for the community. Every feature exists because someone on campus needed it.",
    color: "text-emerald-500", bg: "bg-emerald-500/10",
  },
  {
    icon: Lock,
    title: "Privacy Respected",
    text: "Your personal data stays private. Donor contact info is only shared when a request is accepted.",
    color: "text-purple-500", bg: "bg-purple-500/10",
  },
  {
    icon: Star,
    title: "Always Free",
    text: "BloodAid is and will always be completely free — for donors, recipients, and volunteers.",
    color: "text-orange-500", bg: "bg-orange-500/10",
  },
];

export default function AboutValues() {
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
            Our Values
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mt-3 tracking-tight">
            Principles we never compromise on
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {values.map(({ icon: Icon, title, text, color, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="group p-6 sm:p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md dark:hover:shadow-none transition-all duration-200"
            >
              <div className={`h-11 w-11 rounded-xl ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon size={20} className={color} />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}