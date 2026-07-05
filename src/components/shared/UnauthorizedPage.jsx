"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import { ArrowLeft, Home, ShieldOff } from "lucide-react";

export default function UnauthorizedPage() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const homeHref =
    role === "admin"
      ? "/admin"
      : role === "volunteer"
        ? "/volunteer"
        : session
          ? "/dashboard"
          : "/";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-600/5 dark:bg-red-600/8 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative text-center max-w-lg w-full"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="h-24 w-24 rounded-3xl bg-red-100 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 flex items-center justify-center">
              <ShieldOff size={40} className="text-red-600 dark:text-red-500" />
            </div>
            {/* Ping */}
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 border-2 border-white dark:border-zinc-950 animate-ping" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 border-2 border-white dark:border-zinc-950" />
          </div>
        </motion.div>

        {/* 403 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-bold text-red-500 uppercase tracking-widest mb-3"
        >
          Error 403
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight"
        >
          Access Denied
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10"
        >
          You don&apos;t have permission to view this page.
          {session && (
            <span className="block mt-1 text-sm">
              Your current role is{" "}
              <span className="font-bold text-zinc-700 dark:text-zinc-300 uppercase">
                {role}
              </span>
            </span>
          )}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-zinc-300 dark:border-zinc-600 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
          <Link
            href={homeHref}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all shadow-lg shadow-red-600/25 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto justify-center"
          >
            <Home size={16} />
            {session ? "My Dashboard" : "Go Home"}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
