"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Droplets,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import {
  getVolunteerStatsAction,
  getAssignedRequestsAction,
} from "@/lib/actions/volunteer";

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

export default function VolunteerPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [stats, setStats] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [statsResult, reqResult] = await Promise.all([
        getVolunteerStatsAction(),
        getAssignedRequestsAction(),
      ]);
      if (statsResult.success) setStats(statsResult.data);
      if (reqResult.success) setRequests(reqResult.data);
      setLoading(false);
    };
    load();
  }, []);

  const statCards = [
    {
      label: "Total Assigned",
      value: stats?.total || 0,
      icon: Droplets,
      color: "text-red-500",
      bg: "bg-red-100 dark:bg-red-950/40",
    },
    {
      label: "Active",
      value: stats?.active || 0,
      icon: Clock,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-950/40",
    },
    {
      label: "Fulfilled",
      value: stats?.fulfilled || 0,
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-950/40",
    },
    {
      label: "Pending",
      value: stats?.pending || 0,
      icon: AlertCircle,
      color: "text-amber-500",
      bg: "bg-amber-100 dark:bg-amber-950/40",
    },
  ];

  const activeRequests = requests.filter(
    (r) => r.status === "active" || r.status === "pending",
  );

  return (
    <div className="max-w-5xl space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">
          Welcome, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Your volunteer activity overview
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
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

      {/* Active requests */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
            Active Assignments
          </h2>
          <Link
            href="/volunteer/requests"
            className="text-xs text-red-500 font-semibold hover:text-red-400 flex items-center gap-1"
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
        ) : activeRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="h-14 w-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
              <UserCheck size={22} className="text-zinc-400" />
            </div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
              No active assignments
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Admin will assign blood requests to you.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {activeRequests.slice(0, 5).map((req) => {
              const s = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending;
              return (
                <div
                  key={req._id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-50 dark:hover:bg-white/4 transition-colors"
                >
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
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${s.bg} ${s.color} ${s.border}`}
                    >
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
