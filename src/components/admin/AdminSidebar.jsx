"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Droplets,
  Users,
  UserCheck,
  LogOut,
  X,
  ChevronRight,
  Shield,
} from "lucide-react";

const navItems = [
  { label: "Analytics", href: "/admin", icon: LayoutDashboard },
  { label: "Blood Requests", href: "/admin/requests", icon: Droplets },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Volunteers", href: "/admin/volunteers", icon: UserCheck },
];

function SidebarContent({ onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const isActive = (href) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-200 dark:border-white/8">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-600 shrink-0">
            <Droplets size={16} className="text-white" fill="currentColor" />
          </div>
          <div>
            <span className="text-base font-extrabold text-zinc-900 dark:text-white">
              Blood<span className="text-red-600">Aid</span>
            </span>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 -mt-0.5">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      {/* Admin info */}
      {user && (
        <div className="px-4 py-4 border-b border-zinc-200 dark:border-white/8">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
            <div className="h-9 w-9 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                  {user.name}
                </p>
                <Shield size={11} className="text-amber-500 shrink-0" />
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                Administrator
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                active
                  ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/8 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Icon
                size={17}
                className={
                  active
                    ? "text-white"
                    : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200"
                }
              />
              {label}
              {active && (
                <ChevronRight size={13} className="ml-auto text-white/70" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign out — sticky bottom */}
      <div className="px-3 py-4 border-t border-zinc-200 dark:border-white/8 sticky bottom-0 bg-white dark:bg-zinc-900">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
        >
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-white/8 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-zinc-900 z-50 flex flex-col shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
              <SidebarContent onClose={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
