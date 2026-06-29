"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useSession, signOut } from "@/lib/auth-client";
import {
  Menu,
  X,
  Sun,
  Moon,
  Droplets,
  ChevronDown,
  LayoutDashboard,
  User,
  LogOut,
  Shield,
} from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Emergency", href: "/emergency" },
  { label: "Find Donors", href: "/donors/search" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user ?? null;

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const dashboardHref =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "volunteer"
        ? "/volunteer"
        : "/dashboard";

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 shadow-sm"
          : "bg-white dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-white/8"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-[72px] lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-600 group-hover:bg-red-500 transition-colors shrink-0">
              <Droplets className="h-4 w-4 text-white" fill="currentColor" />
            </div>
            <span className="text-lg font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Blood<span className="text-red-600">Aid</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center justify-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-semibold tracking-wider uppercase transition-colors duration-200 relative group whitespace-nowrap ${
                  isActive(link.href)
                    ? "text-red-600"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 transition-transform duration-200 origin-left ${
                    isActive(link.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme toggle */}
            <button
              suppressHydrationWarning
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/8 transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun size={17} />
              ) : (
                <Moon size={17} />
              )}
            </button>

            {/* Auth — desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {isPending ? (
                <div className="h-9 w-24 rounded-full bg-zinc-200 dark:bg-white/10 animate-pulse" />
              ) : user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((p) => !p)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/8 transition-colors"
                  >
                    {user.image ? (
                      <Image
                        width={28}
                        height={28}
                        src={user.image}
                        alt={user.name ?? "User"}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">
                        {initials}
                      </div>
                    )}
                    <span className="text-sm font-semibold max-w-[80px] truncate text-zinc-900 dark:text-white">
                      {user.name?.split(" ")[0]}
                    </span>
                    {user.role === "admin" && (
                      <Shield size={13} className="text-amber-400" />
                    )}
                    <ChevronDown
                      size={13}
                      className={`text-zinc-400 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-zinc-100 dark:border-white/8">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="text-sm font-bold truncate text-zinc-900 dark:text-white">
                              {user.name}
                            </p>
                            {user.role === "admin" && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-400/10 text-amber-500 shrink-0">
                                ADMIN
                              </span>
                            )}
                            {user.role === "volunteer" && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-400/10 text-blue-500 shrink-0">
                                VOL
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        <div className="p-1.5 space-y-0.5">
                          <Link
                            href={dashboardHref}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-white/8 transition-colors text-zinc-700 dark:text-zinc-300"
                          >
                            <LayoutDashboard
                              size={15}
                              className="text-zinc-400"
                            />
                            Dashboard
                          </Link>
                          <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-white/8 transition-colors text-zinc-700 dark:text-zinc-300"
                          >
                            <User size={15} className="text-zinc-400" />
                            Profile
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut size={15} /> Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-5 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-white/15 hover:border-zinc-900 dark:hover:border-white hover:text-zinc-900 dark:hover:text-white transition-all duration-200"
                    style={{ borderRadius: "9999px" }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-5 py-2 text-sm font-bold bg-red-600 hover:bg-red-500 text-white transition-all duration-200 shadow-md shadow-red-600/30"
                    style={{ borderRadius: "9999px" }}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen((p) => !p)}
              className="lg:hidden p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/8 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white dark:bg-[#0a0a0a] border-t border-zinc-200 dark:border-white/8"
          >
            <div className="max-w-[1400px] mx-auto px-6 py-3">
              <div className="space-y-0.5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-2.5 text-sm font-semibold uppercase tracking-wider rounded-lg transition-colors duration-200 ${
                        isActive(link.href)
                          ? "text-red-600 bg-red-50 dark:bg-red-500/10"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/8"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-3 pt-3 pb-2 border-t border-zinc-200 dark:border-white/8">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-2 py-2">
                      <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={dashboardHref}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold border border-zinc-300 dark:border-white/15 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/8 transition-colors"
                      style={{ borderRadius: "9999px" }}
                    >
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-500 transition-colors"
                      style={{ borderRadius: "9999px" }}
                    >
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/auth/login"
                      className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold border border-zinc-300 dark:border-white/15 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/8 transition-colors"
                      style={{ borderRadius: "9999px" }}
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold bg-red-600 hover:bg-red-500 text-white transition-colors"
                      style={{ borderRadius: "9999px" }}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
