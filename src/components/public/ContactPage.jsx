"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Clock, Loader2, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";



const inputCls =
  "w-full h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-red-400 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Pundra University of Science & Technology, Bogura, Bangladesh",
  },
  { icon: Phone, label: "Helpline", value: "+880 1700-000000" },
  { icon: MessageCircle, label: "WhatsApp", value: "+880 1700-000000  " },
  { icon: Clock, label: "Office Hours", value: "Sat–Thu: 9AM–5PM" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500)); // mock
    toast.success("Message sent! We'll get back to you soon. 🩸");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

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
              <MessageCircle
                size={12}
                className="text-red-600 dark:text-red-400"
              />
              <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Contact Us
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
              Have a question, suggestion, or need help? We&apos;d love to hear
              from you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-5">
                Contact Information
              </h2>
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon
                        size={16}
                        className="text-red-600 dark:text-red-500"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-sm text-zinc-900 dark:text-white mt-0.5">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-3">
                Follow Us
              </h3>
              <div className="flex items-center gap-2">
                {[
                  { icon: FaFacebook, label: "Facebook", href: "#" },
                  { icon: FaInstagram, label: "Instagram", href: "#" },
                  { icon: FaWhatsapp, label: "WhatsApp", href: "#" },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="h-10 w-10 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 hover:border-red-300 dark:hover:border-red-800 transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Emergency */}
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40">
              <p className="text-sm font-bold text-red-700 dark:text-red-400 mb-1">
                🔴 Emergency Blood Need?
              </p>
              <p className="text-xs text-red-600 dark:text-red-500 leading-relaxed">
                Don&apos;t use this form for emergencies. Call our helpline or
                post an emergency request immediately.
              </p>
              <a
                href="tel:+8801700000000"
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all"
              >
                <Phone size={12} /> Call Now
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-7"
          >
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={set}
                    placeholder="Full name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={set}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={set}
                  placeholder="What's this about?"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={set}
                  placeholder="Write your message here..."
                  rows={5}
                  className={`${inputCls} h-auto resize-none py-3`}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-500 transition-all shadow-md shadow-red-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
