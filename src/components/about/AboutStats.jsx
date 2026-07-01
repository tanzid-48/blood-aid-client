"use client";

import { motion } from "framer-motion";
import { Droplets, Heart, Users, Calendar, Award, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Active Donors",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Heart,
    value: "1,200+",
    label: "Lives Saved",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: Droplets,
    value: "50+",
    label: "Campaigns Done",
    color: "text-red-600",
    bg: "bg-red-600/10",
  },
  {
    icon: Calendar,
    value: "2",
    label: "Years Active",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Award,
    value: "200+",
    label: "Volunteers",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Emergency Support",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

export default function AboutStats() {
  return (
    <section className="bg-white dark:bg-black py-14 sm:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {stats.map(({ icon: Icon, value, label, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="flex flex-col items-center text-center p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors"
            >
              <div
                className={`h-11 w-11 rounded-xl ${bg} flex items-center justify-center mb-3`}
              >
                <Icon size={20} className={color} />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white leading-none mb-1">
                {value}
              </p>
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-tight">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
