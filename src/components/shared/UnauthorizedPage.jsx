"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldX, ArrowLeft, Home } from "lucide-react";

export default function UnauthorizedPage({ requiredRole }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-3xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
            <ShieldX size={36} className="text-red-600 dark:text-red-500" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-3">
          Access Denied
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-2 leading-relaxed">
          You don&apos;t have permission to view this page.
        </p>
        {requiredRole && (
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-8">
            Required role:{" "}
            <span className="font-bold text-red-600 dark:text-red-400 uppercase">
              {requiredRole}
            </span>
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-600 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            <ArrowLeft size={15} /> Go Back
          </button>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all shadow-md shadow-red-600/20"
          >
            <Home size={15} /> My Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
