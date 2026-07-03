"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Droplets,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Clock,
  ChevronRight,
  Target,
} from "lucide-react";

const campaigns = [
  {
    id: 1,
    title: "Spring Blood Drive 2025",
    slug: "spring-blood-drive-2025",
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=600&q=80",
    date: "March 25, 2025",
    time: "9:00 AM – 4:00 PM",
    location: "PUB Central Hall, Bogura",
    target: 100,
    collected: 74,
    status: "active",
    tag: "Urgent",
    tagColor: "#dc2626",
    organizer: "BloodAid Team",
  },
  {
    id: 2,
    title: "Ramadan Donation Campaign",
    slug: "ramadan-donation-2025",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    date: "April 5, 2025",
    time: "10:00 AM – 3:00 PM",
    location: "PUB Auditorium, Bogura",
    target: 150,
    collected: 92,
    status: "active",
    tag: "Featured",
    tagColor: "#7c3aed",
    organizer: "Volunteer Club",
  },
  {
    id: 3,
    title: "Emergency Stock Replenishment",
    slug: "emergency-stock-2025",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    date: "April 12, 2025",
    time: "8:00 AM – 5:00 PM",
    location: "Bogura Medical College",
    target: 200,
    collected: 45,
    status: "active",
    tag: "Critical",
    tagColor: "#ea580c",
    organizer: "BloodAid x Medical College",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

function ProgressBar({ target, collected, color }) {
  const pct = Math.min(Math.round((collected / target) * 100), 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-bold text-zinc-900 dark:text-white">
            {collected}
          </span>{" "}
          / {target} bags
        </span>
        <span className="text-xs font-bold" style={{ color }}>
          {pct}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${color}99, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

function CampaignCard({ campaign, index }) {
  const color = campaign.tagColor;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Tag badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: color }}
        >
          {campaign.tag}
        </div>

        {/* Status */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white text-xs font-semibold">Live</span>
        </div>

        {/* Date on image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/90 text-xs font-medium">
          <Calendar size={12} />
          {campaign.date}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-zinc-900 dark:text-white text-base mb-3 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors line-clamp-1">
          {campaign.title}
        </h3>

        {/* Meta */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <Clock size={12} className="shrink-0" />
            {campaign.time}
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <MapPin size={12} className="shrink-0" />
            <span className="truncate">{campaign.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <Users size={12} className="shrink-0" />
            {campaign.organizer}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-5">
          <ProgressBar
            target={campaign.target}
            collected={campaign.collected}
            color={color}
          />
        </div>

        {/* CTA */}
        <Link
          href={`/campaigns/${campaign.slug}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.97]"
          style={{ background: `linear-gradient(135deg, #7f1d1d, ${color})` }}
        >
          <Droplets size={14} fill="currentColor" />
          Join Campaign
          <ArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function CampaignsSection() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* ── Header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              Live Now
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-3">
              Active <span className="text-red-600">Campaigns</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
              Join an ongoing campaign and make an immediate impact. Every bag
              of blood counts.
            </p>
          </div>

          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 hover:border-red-400 hover:text-red-600 dark:hover:text-red-400 transition-all whitespace-nowrap shrink-0"
          >
            All Campaigns <ChevronRight size={14} />
          </Link>
        </motion.div>

        {/* ── Campaign cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {campaigns.map((c, i) => (
            <CampaignCard key={c.id} campaign={c} index={i} />
          ))}
        </div>

        {/* ── Impact summary bar ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
        >
          {[
            {
              icon: Target,
              value: "3",
              label: "Active Campaigns",
              color: "#dc2626",
            },
            {
              icon: Droplets,
              value: "211",
              label: "Bags Collected So Far",
              color: "#ea580c",
            },
            {
              icon: Users,
              value: "450+",
              label: "Total Target (Bags)",
              color: "#7c3aed",
            },
          ].map(({ icon: Icon, value, label, color }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            >
              <div
                className="h-12 w-12 flex items-center justify-center rounded-xl shrink-0"
                style={{
                  background: `${color}15`,
                  border: `1px solid ${color}25`,
                }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <div>
                <p className="text-2xl font-black text-zinc-900 dark:text-white">
                  {value}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Host campaign CTA ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-red-50 dark:bg-red-950/20 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-500 mb-2">
              Organize a Campaign
            </p>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">
              Want to Host a Blood Drive?
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
              Any department, club, or individual can organize a campaign with
              BloodAid support. We handle logistics, volunteers, and
              coordination.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/campaigns/create"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white bg-red-600 hover:bg-red-500 transition-all shadow-lg shadow-red-600/25 active:scale-[0.97]"
            >
              <Droplets size={14} fill="currentColor" />
              Start a Campaign
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-zinc-600 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 hover:border-red-400 hover:text-red-600 dark:hover:text-red-400 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
