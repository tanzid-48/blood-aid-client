"use client";

import { motion } from "framer-motion";
import { Heart, Quote, Droplets, Star } from "lucide-react";

const stories = [
  {
    id: 1,
    name: "Rakib Hassan",
    role: "Accident Survivor",
    bloodGroup: "B+",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80",
    story: "I was in a severe road accident and lost a lot of blood. My family posted an emergency request on BloodAid at midnight. Within 20 minutes, two donors showed up at the hospital. I owe my life to those strangers and the BloodAid volunteers who coordinated everything so quickly.",
    location: "Bogura Sadar",
    date: "March 2026",
    impact: "3 units received",
  },
  {
    id: 2,
    name: "Fatema Begum",
    role: "Thalassemia Patient",
    bloodGroup: "A+",
    image: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&w=200&q=80",
    story: "As a thalassemia patient, I need regular blood transfusions every month. Finding blood used to be a nightmare for my family. Since BloodAid, we always have donors ready. The platform has given our family peace of mind that we couldn't find anywhere else.",
    location: "Shahjahanpur, Bogura",
    date: "Ongoing",
    impact: "Monthly donor",
  },
  {
    id: 3,
    name: "Ariful Islam",
    role: "Surgery Patient",
    bloodGroup: "O-",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80",
    story: "O-negative is rare and hard to find. Before my open-heart surgery, doctors told us we needed 4 units within 48 hours. BloodAid found all 4 donors in just 6 hours. The surgery was a success and I'm now fully recovered.",
    location: "Shaheed Ziaur Rahman Medical College",
    date: "January 2026",
    impact: "4 units in 6 hours",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    role: "New Mother",
    bloodGroup: "AB+",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    story: "During childbirth I had severe complications and needed an emergency transfusion. My husband posted on BloodAid and within 30 minutes a volunteer arrived at the hospital with a matching donor. Both my baby and I are healthy today because of BloodAid.",
    location: "Modern Hospital, Bogura",
    date: "April 2026",
    impact: "2 units received",
  },
  {
    id: 5,
    name: "Sadia Islam",
    role: "Regular Donor & Volunteer",
    bloodGroup: "O+",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    story: "I joined BloodAid as a donor and later became a volunteer. In the past year, I've donated blood 3 times and helped coordinate over 20 donation requests. Seeing the thank-you messages from patients' families is what keeps me going. This is the most meaningful thing I've ever done.",
    location: "PUB Campus, Bogura",
    date: "Since 2024",
    impact: "20+ lives helped",
  },
  {
    id: 6,
    name: "Mahmudul Hasan",
    role: "Cancer Patient",
    bloodGroup: "B-",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=200&q=80",
    story: "During chemotherapy I needed frequent blood transfusions. B-negative is extremely rare. BloodAid not only found donors but also kept a list of regular B-negative donors specifically for me. This kind of personalized care from a student organization is truly extraordinary.",
    location: "Bogura Medical Center",
    date: "2025–2026",
    impact: "12+ transfusions",
  },
];

const stats = [
  { value: "1,200+", label: "Lives Saved" },
  { value: "500+", label: "Active Donors" },
  { value: "15 min", label: "Avg Response Time" },
  { value: "100%", label: "Free Service" },
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="bg-white dark:bg-black border-b border-zinc-200 dark:border-white/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 mb-5">
              <Heart size={12} className="text-red-600 dark:text-red-400" fill="currentColor" />
              <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Success Stories
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              Lives Changed by{" "}
              <span className="text-red-600">BloodAid</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
              Real stories from patients, donors, and volunteers whose lives have been
              touched by the power of blood donation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-white/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-black text-red-600 mb-1">{value}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stories */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.image} alt={story.name}
                  className="h-14 w-14 rounded-full object-cover shrink-0 border-2 border-red-100 dark:border-red-900/40"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-base font-bold text-zinc-900 dark:text-white">
                      {story.name}
                    </p>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={11} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {story.role}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400">
                      <Droplets size={9} fill="currentColor" /> {story.bloodGroup}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {story.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-4">
                <Quote
                  size={32}
                  className="absolute -top-1 -left-1 text-red-100 dark:text-red-950/60"
                  fill="currentColor"
                />
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-6 italic">
                  &ldquo;{story.story}&rdquo;
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <Heart size={12} className="text-red-500" fill="currentColor" />
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {story.impact}
                  </span>
                </div>
                <span className="text-xs text-zinc-400">{story.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-3">
              Your story could be next
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-7 max-w-md mx-auto">
              Join BloodAid and become part of a community that saves lives every day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/auth/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all shadow-lg shadow-red-600/25"
              >
                <Droplets size={15} fill="currentColor" />
                Become a Donor
              </a>
              <a
                href="/emergency"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-sm hover:border-red-400 hover:text-red-600 dark:hover:text-red-400 transition-all"
              >
                Request Blood
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}