"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Droplets } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "Donation Basics",
    questions: [
      {
        q: "Who can donate blood?",
        a: "Most healthy adults aged 18–60 who weigh at least 50kg can donate blood. You should be free of infectious diseases and in good health. Some conditions like low hemoglobin, recent tattoos, or certain medications may temporarily disqualify you.",
      },
      {
        q: "How often can I donate blood?",
        a: "You can donate whole blood once every 3 months (90 days). This allows your body enough time to replenish the donated blood.",
      },
      {
        q: "Does blood donation hurt?",
        a: "Most donors feel only a brief pinch when the needle is inserted. The donation process itself is painless. Some donors may feel mild lightheadedness afterward, which usually passes quickly.",
      },
      {
        q: "How long does the donation process take?",
        a: "The actual blood draw takes about 8–10 minutes. Including registration, health check, and rest time, the full process takes 30–45 minutes.",
      },
    ],
  },
  {
    category: "Health & Safety",
    questions: [
      {
        q: "Is blood donation safe?",
        a: "Yes, blood donation is completely safe. Sterile, disposable needles are used for each donation and are never reused. There is no risk of contracting any disease by donating blood.",
      },
      {
        q: "What should I eat before donating blood?",
        a: "Eat a healthy meal 3–4 hours before donation. Drink plenty of water. Avoid fatty foods before donation as they can affect blood testing. Avoid alcohol for 24 hours before donating.",
      },
      {
        q: "Can I exercise after donating blood?",
        a: "Avoid strenuous exercise for at least 24 hours after donation. Light activity is fine, but listen to your body. If you feel dizzy or weak, rest and drink fluids.",
      },
      {
        q: "What are the side effects of blood donation?",
        a: "Most people feel fine after donating. Some may experience mild dizziness, lightheadedness, or fatigue. These symptoms usually resolve within a few hours. Serious complications are extremely rare.",
      },
    ],
  },
  {
    category: "BloodAid Platform",
    questions: [
      {
        q: "How does BloodAid work?",
        a: "BloodAid connects blood donors with recipients through our platform. When someone needs blood, they post a request. Our volunteers find matching donors and coordinate the donation.",
      },
      {
        q: "Is BloodAid free to use?",
        a: "Yes, BloodAid is completely free for donors, recipients, and volunteers. We are a non-profit student organization at Pundra University.",
      },
      {
        q: "How do I become a donor on BloodAid?",
        a: "Register on our platform, complete your profile with your blood group and contact information, and click 'Become a Donor' in your dashboard. You'll then appear in our donor directory.",
      },
      {
        q: "How long does it take to respond to an emergency request?",
        a: "Our target response time is under 15 minutes for emergency requests. For urgent requests, within 1–2 hours. For normal requests, within 24 hours.",
      },
      {
        q: "Can I trust that my contact information is safe?",
        a: "Yes. Your phone number is only shared with volunteers when you accept a donation request. We never publicly display personal contact information.",
      },
    ],
  },
  {
    category: "Volunteering",
    questions: [
      {
        q: "How can I become a BloodAid volunteer?",
        a: "Register on our platform and apply to become a volunteer through your dashboard. Our admin team will review your application and assign you the volunteer role.",
      },
      {
        q: "What does a BloodAid volunteer do?",
        a: "Volunteers are responsible for finding matching donors for assigned blood requests, contacting donors, coordinating the donation, and updating request statuses on the platform.",
      },
    ],
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-zinc-50 dark:hover:bg-white/4 transition-colors"
      >
        <span className="text-sm font-semibold text-zinc-900 dark:text-white">
          {question}
        </span>
        <ChevronDown
          size={16}
          className={`text-zinc-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-3">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQsPage() {
  const [search, setSearch] = useState("");

  const filtered = faqs
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(search.toLowerCase()) ||
          q.a.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.questions.length > 0);

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
              <Droplets
                size={12}
                className="text-red-600 dark:text-red-400"
                fill="currentColor"
              />
              <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                FAQs
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mb-8">
              Everything you need to know about blood donation and the BloodAid
              platform.
            </p>

            {/* Search */}
            <div className="relative max-w-lg">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-400 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="max-w-3xl mx-auto space-y-10">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-zinc-500 dark:text-zinc-400">
                No results found for &quot;{search}&quot;
              </p>
            </div>
          ) : (
            filtered.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="h-5 w-1 rounded-full bg-red-600 inline-block" />
                  {cat.category}
                </h2>
                <div className="space-y-2">
                  {cat.questions.map((faq) => (
                    <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </motion.div>
            ))
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-7 text-center"
          >
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
              Can&apos;t find what you&apos;re looking for? Contact us directly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all shadow-md shadow-red-600/20"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
