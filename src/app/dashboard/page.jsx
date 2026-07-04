"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Droplets,
  Heart,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Plus,
  User,
} from "lucide-react";
import api from "@/lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-900/40",
  },
  active: {
    label: "Active",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-900/40",
  },
  fulfilled: {
    label: "Fulfilled",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-900/40",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-zinc-500",
    bg: "bg-zinc-100 dark:bg-zinc-800",
    border: "border-zinc-200 dark:border-zinc-700",
  },
};

//

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await api.get("/api/requests/my");
        setRequests(data.data || []);
      } catch {
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const stats = [
    {
      label: "Total Requests",
      value: requests.length,
      icon: Droplets,
      color: "text-red-500",
      bg: "bg-red-100 dark:bg-red-950/40",
    },
    {
      label: "Active Requests",
      value: requests.filter((r) => r.status === "active").length,
      icon: Clock,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-950/40",
    },
    {
      label: "Fulfilled",
      value: requests.filter((r) => r.status === "fulfilled").length,
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-950/40",
    },
    {
      label: "Pending",
      value: requests.filter((r) => r.status === "pending").length,
      icon: AlertCircle,
      color: "text-amber-500",
      bg: "bg-amber-100 dark:bg-amber-950/40",
    },
  ];

  const recentRequests = requests.slice(0, 5);

  return (
    <div className="max-w-5xl">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Here&apos;s an overview of your BloodAid activity.
        </p>
      </motion.div>

      {/* Donor banner — if not a donor */}
      {user && !user.isDonor && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-6 relative rounded-2xl overflow-hidden p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: "linear-gradient(135deg, #7f1d1d, #dc2626)" }}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Heart size={18} className="text-white" fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Become a Donor</p>
              <p className="text-xs text-white/70">
                Register as a donor to help save lives in your community.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/donate"
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-red-700 text-xs font-bold hover:bg-red-50 transition-all"
          >
            Register Now <ArrowRight size={12} />
          </Link>
        </motion.div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }, i) => (
          <motion.div
            key={label}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={i}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5"
          >
            <div
              className={`h-10 w-10 rounded-xl ${bg} flex items-center justify-center mb-3`}
            >
              <Icon size={18} className={color} />
            </div>
            <p className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              {loading ? "—" : value}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
              {label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent requests + profile card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent requests — 2/3 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              Recent Requests
            </h2>
            <Link
              href="/dashboard/requests"
              className="text-xs text-red-500 font-semibold hover:text-red-400 transition-colors flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse"
                />
              ))}
            </div>
          ) : recentRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="h-14 w-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
                <Droplets size={22} className="text-zinc-400" />
              </div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                No requests yet
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                Post your first blood request when you need help.
              </p>
              <Link
                href="/emergency"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all"
              >
                <Plus size={13} /> New Request
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {recentRequests.map((req) => {
                const status =
                  STATUS_CONFIG[req.status] || STATUS_CONFIG.pending;
                return (
                  <div
                    key={req._id}
                    className="flex items-center gap-4 px-6 py-4"
                  >
                    {/* Blood group */}
                    <div className="h-10 w-10 rounded-xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center shrink-0">
                      <span className="text-xs font-black text-red-600 dark:text-red-400">
                        {req.bloodGroup}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                        {req.patientName}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {req.hospitalName} · {req.district}
                      </p>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${status.bg} ${status.color} ${status.border}`}
                    >
                      {status.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Profile card — 1/3 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6"
        >
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white mb-5">
            My Profile
          </h2>

          {/* Avatar */}
          <div className="flex flex-col items-center text-center mb-5">
            <div className="h-16 w-16 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-black mb-3">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">
              {user?.name}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {user?.email}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-2.5">
            {[
              { label: "Blood Group", value: user?.bloodGroup || "Not set" },
              { label: "Phone", value: user?.phone || "Not set" },
              {
                label: "Role",
                value:
                  user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1),
              },
              {
                label: "Donor Status",
                value: user?.isDonor ? "Active Donor" : "Not a donor",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-2"
              >
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {label}
                </span>
                <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate max-w-[60%] text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/profile"
            className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/8 transition-all"
          >
            <User size={13} /> Edit Profile
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
