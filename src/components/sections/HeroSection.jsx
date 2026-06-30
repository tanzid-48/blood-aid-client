"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  ArrowRight,
  Search,
  Users,
  Heart,
  Zap,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

const slides = [
  {
    badge: "Pundra University Blood Aid",
    title: "Donate Blood,",
    highlight: "Save Lives",
    sub: "Connect with donors on campus, respond to emergencies, and join a community that saves lives — one donation at a time.",
    cta1: { label: "Become a Donor", href: "/auth/register" },
    cta2: { label: "Find a Donor", href: "/donors/search" },
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1600&q=85",
    accent: "#dc2626",
  },
  {
    badge: "Emergency Response 24/7",
    title: "Every Second",
    highlight: "Matters",
    sub: "Post an emergency blood request and get a response within minutes. Our active donor network is always ready when it matters most.",
    cta1: { label: "Emergency Request", href: "/emergency" },
    cta2: { label: "View Donors", href: "/donors/search" },
    image:
      "https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=1600&auto=format&fit=crop",
    accent: "#ea580c",
  },
  {
    badge: "Join the Mission",
    title: "Be a Hero,",
    highlight: "Be a Donor",
    sub: "One donation saves up to 3 lives. Volunteer with BloodAid, join campaigns, and make a real difference in your university community.",
    cta1: { label: "Join as Volunteer", href: "/volunteer/register" },
    cta2: { label: "View Campaigns", href: "/campaigns" },
    image:
      "https://images.unsplash.com/photo-1639772823849-6efbd173043c?w=1600&auto=format&fit=crop&q=85",
    accent: "#e11d48",
  },
  {
    badge: "Campus Blood Network",
    title: "Together We",
    highlight: "Save More",
    sub: "Over 500 active donors and 1200+ lives saved. BloodAid is the largest student-run blood donation network at Pundra University.",
    cta1: { label: "Our Impact", href: "/stories" },
    cta2: { label: "Get Involved", href: "/about" },
    image:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1600&q=85",
    accent: "#9333ea",
  },
];

const stats = [
  { value: "500+", label: "Active Donors", icon: Users },
  { value: "1200+", label: "Lives Saved", icon: Heart },
  { value: "50+", label: "Campaigns Done", icon: Droplets },
  { value: "24/7", label: "Emergency Support", icon: Zap },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % slides.length),
    [],
  );
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden bg-zinc-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image per slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.82) 30%, rgba(0,0,0,0.45) 58%, rgba(0,0,0,0.2) 100%),
                linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 38%)
              `,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 min-h-[calc(100vh-72px)] flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 py-16 sm:py-20">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${current}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm text-white/80 text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-6 sm:mb-7">
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse shrink-0"
                    style={{ background: slide.accent }}
                  />
                  {slide.badge}
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-4 sm:mb-5">
                  {slide.title}
                  <br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${slide.accent}, #fca5a5)`,
                    }}
                  >
                    {slide.highlight}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed mb-7 sm:mb-8 max-w-lg">
                  {slide.sub}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-10">
                  <Link
                    href={slide.cta1.href}
                    className="flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-3 rounded-full font-bold text-sm text-white transition-all duration-200 active:scale-[0.97] hover:scale-[1.02] shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, #7f1d1d, ${slide.accent})`,
                    }}
                  >
                    <Droplets size={15} fill="currentColor" />
                    {slide.cta1.label}
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href={slide.cta2.href}
                    className="flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-3 rounded-full font-bold text-sm text-white border border-white/25 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
                  >
                    <Search size={14} />
                    {slide.cta2.label}
                  </Link>
                </div>

                {/* Slide controls */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={prev}
                    aria-label="Previous slide"
                    className="h-9 w-9 flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/60 hover:text-white hover:bg-white/20 backdrop-blur-sm transition-all shrink-0"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className="flex items-center gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === current ? "26px" : "7px",
                          height: "7px",
                          background:
                            i === current
                              ? slide.accent
                              : "rgba(255,255,255,0.3)",
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={next}
                    aria-label="Next slide"
                    className="h-9 w-9 flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/60 hover:text-white hover:bg-white/20 backdrop-blur-sm transition-all shrink-0"
                  >
                    <ChevronRight size={16} />
                  </button>

                  <span className="hidden sm:inline text-xs text-white/30 font-mono ml-1">
                    {String(current + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 sm:gap-3 group"
                >
                  <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/10 border border-white/15 shrink-0 group-hover:bg-red-600/30 transition-colors">
                    <Icon
                      size={16}
                      className="text-white/70 group-hover:text-red-400 transition-colors"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base font-black text-white leading-none">
                      {value}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-white/45 mt-0.5 truncate">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency strip */}
      <div className="relative z-10 bg-gradient-to-r from-red-800 to-red-700 border-t border-red-600/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Link
            href="/emergency"
            className="flex items-center justify-between gap-3 sm:gap-4 py-3 group"
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <AlertCircle
                size={14}
                className="text-white shrink-0 sm:hidden"
              />
              <span className="hidden sm:block h-2 w-2 rounded-full bg-white animate-pulse shrink-0" />
              <p className="text-xs sm:text-sm font-semibold text-white truncate">
                Need blood urgently?{" "}
                <span className="font-normal text-red-200 hidden sm:inline">
                  Post an emergency — donors respond within minutes
                </span>
              </p>
            </div>
            <ArrowRight
              size={15}
              className="text-white shrink-0 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
