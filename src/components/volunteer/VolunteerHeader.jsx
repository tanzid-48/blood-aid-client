"use client";

import { Bell, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

export default function VolunteerHeader({ onMenuClick }) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/8 px-5 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/8 transition-colors"
      >
        <Menu size={20} />
      </button>

      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
          Volunteer Panel
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
