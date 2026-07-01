"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserPlus,
  Search,
  Phone,
  Droplets,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const donorSteps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Account",
    desc: "Sign up with your blood group and contact info. Takes less than a minute.",
  },
  {
    step: "02",
    icon: Droplets,
    title: "Register as Donor",
    desc: "Complete your donor profile with availability, location, and last donation date.",
  },
  {
    step: "03",
    icon: Phone,
    title: "Get Notified",
    desc: "Receive alerts when someone nearby needs your blood type. Respond with one tap.",
  },
  {
    step: "04",
    icon: Search,
    title: "Donate & Save",
    desc: "Visit the donation point, donate safely, and track the lives you've helped save.",
  },
];

const recipientSteps = [
  {
    step: "01",
    icon: Search,
    title: "Search Donors",
    desc: "Filter donors by blood group, location, and availability in real-time.",
  },
  {
    step: "02",
    icon: Phone,
    title: "Send Request",
    desc: "Contact a matching donor directly or post an emergency broadcast to all nearby donors.",
  },
  {
    step: "03",
    icon: Droplets,
    title: "Get Connected",
    desc: "A verified donor confirms and coordinates the donation at your preferred location.",
  },
  {
    step: "04",
    icon: UserPlus,
    title: "Receive Blood",
    desc: "Get the blood you need quickly, safely, and completely free of charge.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function StepCard({ step, icon: Icon, title, desc, accent, index, isLast }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Connector line desktop */}
      {!isLast && (
        <div
          className="hidden lg:block absolute top-[26px] left-[calc(50%+32px)] right-[-50%] h-px z-0"
          style={{
            background: `linear-gradient(to right, ${accent}40, transparent)`,
          }}
        />
      )}

      <div className="relative z-10 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg dark:hover:shadow-black/30 transition-all duration-300 h-full">
        {/* Top row — icon + step number */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="h-12 w-12 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 shrink-0"
            style={{
              background: `${accent}15`,
              border: `1px solid ${accent}30`,
            }}
          >
            <Icon size={22} style={{ color: accent }} />
          </div>
          <span
            className="text-5xl font-black leading-none select-none"
            style={{ color: `${accent}20` }}
          >
            {step}
          </span>
        </div>

        <h4 className="font-bold text-zinc-900 dark:text-white mb-2 text-base">
          {title}
        </h4>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-28 bg-zinc-50 dark:bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-11/12 mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-5">
            <Droplets size={12} fill="currentColor" />
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
            How It <span className="text-red-600">Works</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Whether you want to donate blood or need it urgently — BloodAid
            makes the process fast, safe, and completely free.
          </p>
        </motion.div>

        {/* Donor flow */}
        <div className="mb-14 sm:mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-red-600 shrink-0">
              <Droplets size={16} className="text-white" fill="currentColor" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white leading-tight">
                For Donors
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                How to register and start saving lives
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {donorSteps.map((s, i) => (
              <StepCard
                key={s.title}
                {...s}
                accent="#dc2626"
                index={i}
                isLast={i === donorSteps.length - 1}
              />
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-6 flex justify-center"
          >
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm text-white bg-red-600 hover:bg-red-500 transition-all shadow-lg shadow-red-600/25 hover:scale-[1.02] active:scale-[0.97]"
            >
              Become a Donor <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-14 sm:mb-16">
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0">
            <ChevronRight size={14} className="text-zinc-500" />
          </div>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Recipient flow */}
        <div className="mb-14 sm:mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-blue-600 shrink-0">
              <Search size={16} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white leading-tight">
                For Recipients
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                How to find and request blood quickly
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {recipientSteps.map((s, i) => (
              <StepCard
                key={s.title}
                {...s}
                accent="#2563eb"
                index={i}
                isLast={i === recipientSteps.length - 1}
              />
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-6 flex justify-center"
          >
            <Link
              href="/donors/search"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25 hover:scale-[1.02] active:scale-[0.97]"
            >
              Find a Donor <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Emergency CTA banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #ef4444 100%)",
              }}
            />
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-black/15" />

            <div className="relative z-10 px-6 sm:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  <span className="text-white/70 text-xs font-bold uppercase tracking-widest">
                    Emergency
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  Need Blood Right Now?
                </h3>
                <p className="text-white/70 text-sm max-w-md">
                  Post an emergency request and reach all available donors
                  instantly. Our average response time is under 15 minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                <Link
                  href="/emergency"
                  className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full font-bold text-sm bg-white text-red-600 hover:bg-red-50 transition-all shadow-lg active:scale-[0.97] hover:scale-[1.02]"
                >
                  <Droplets size={15} fill="currentColor" />
                  Emergency Request
                </Link>
                <Link
                  href="/donors/search"
                  className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full font-bold text-sm text-white border-2 border-white/30 hover:bg-white/15 transition-all active:scale-[0.97]"
                >
                  <Search size={14} />
                  Search Donors
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
