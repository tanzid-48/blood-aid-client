"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Droplets, ArrowRight, Phone } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="bg-white dark:bg-black py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden text-center px-8 py-14 sm:py-20"
          style={{ background: "linear-gradient(135deg, #450a0a 0%, #991b1b 40%, #dc2626 100%)" }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-black/15" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/3" />

          <div className="relative z-10">
            <div className="flex justify-center mb-5">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Droplets size={28} className="text-white" fill="currentColor" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Ready to save a life?
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Join over 500 donors at Pundra University who are making a real difference.
              It takes 10 minutes to register. It can take 1 donation to save 3 lives.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-red-700 font-bold text-sm hover:bg-red-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-black/20"
              >
                <Droplets size={15} fill="currentColor" />
                Become a Donor
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/40 text-white font-bold text-sm hover:bg-white/15 hover:border-white/70 transition-all duration-200"
              >
                <Phone size={14} />
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}