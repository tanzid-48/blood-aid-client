"use client";

import { Menu, Bell, Sun, Moon, Shield } from "lucide-react";
import { useTheme } from "@/lib/theme";

export default function AdminHeader({ onMenuClick }) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/8 px-5 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/8 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Admin badge */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
        <Shield size={13} className="text-amber-500" />
        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
          Admin Panel
        </span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/8 transition-colors"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="relative p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/8 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  );
}
