"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Tag, User, ArrowRight, Search } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Why Blood Donation is Important: A Complete Guide",
    excerpt:
      "Blood donation saves millions of lives every year. Learn why donating blood is one of the most impactful things you can do for your community.",
    category: "Education",
    author: "Dr. Rafiqul Islam",
    date: "July 1, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "How to Prepare for Your First Blood Donation",
    excerpt:
      "Nervous about donating blood for the first time? Here's everything you need to know before, during, and after your donation.",
    category: "Tips",
    author: "Nurse Fatema Begum",
    date: "June 20, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "BloodAid PUB: Our Journey from 50 to 500 Donors",
    excerpt:
      "A look back at how BloodAid started as a small WhatsApp group and grew into a platform that has saved over 1,200 lives.",
    category: "Story",
    author: "Tanzid Ahmed",
    date: "June 10, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1615461066159-fea0960485d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Blood Types Explained: What You Need to Know",
    excerpt:
      "Understanding blood types — A, B, AB, O, Rh factors — and why compatibility matters for transfusions.",
    category: "Education",
    author: "Dr. Rafiqul Islam",
    date: "May 28, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "5 Myths About Blood Donation — Debunked",
    excerpt:
      "Many people avoid donating blood due to common myths. Let's separate fact from fiction and encourage more donors.",
    category: "Tips",
    author: "BloodAid Team",
    date: "May 15, 2026",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1639772823849-6efbd173043c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "How Volunteer Sadia Helped Save 3 Lives in One Week",
    excerpt:
      "A volunteer's story of coordinating three emergency blood donations in a single week, and what keeps her motivated.",
    category: "Story",
    author: "BloodAid Team",
    date: "May 5, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
  },
];

const CATEGORIES = ["All", "Education", "Tips", "Story"];

const CAT_COLORS = {
  Education: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
  Tips: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
  Story:
    "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30",
};

export default function BlogPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = posts.filter((p) => {
    const matchCat = filter === "All" || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = posts[0];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="bg-white dark:bg-black border-b border-zinc-200 dark:border-white/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 mb-5">
              <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Blog
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              Stories, Tips & Education
            </h1>
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
              Read about blood donation, health tips, volunteer stories, and
              BloodAid updates.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
        {/* Featured post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden"
        >
          <div className="relative h-64 lg:h-auto overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <span className="absolute top-4 left-4 text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-600 text-white">
              Featured
            </span>
          </div>
          <div className="p-7 flex flex-col justify-center">
            <span
              className={`self-start text-[11px] font-bold px-2.5 py-1 rounded-full mb-3 ${CAT_COLORS[featured.category]}`}
            >
              {featured.category}
            </span>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
              {featured.title}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-zinc-400 mb-5">
              <span className="flex items-center gap-1">
                <User size={11} /> {featured.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} /> {featured.readTime}
              </span>
              <span>{featured.date}</span>
            </div>
            <button className="self-start inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all">
              Read Article <ArrowRight size={13} />
            </button>
          </div>
        </motion.div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-400 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border whitespace-nowrap transition-all ${
                  filter === c
                    ? "bg-red-600 border-red-600 text-white"
                    : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group cursor-pointer"
            >
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full mb-3 inline-block ${CAT_COLORS[post.category]}`}
                >
                  {post.category}
                </span>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <User size={10} /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {post.readTime}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
