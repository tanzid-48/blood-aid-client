"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Droplets,
  Heart,
  Clock,
  CheckCircle,
  AlertCircle,
  UserCheck,
  Activity,
} from "lucide-react";
import { getAnalytics } from "@/lib/api/admin";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAnalytics();
        setStats(data);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const statCards = stats
    ? [
        {
          label: "Total Users",
          value: stats.totalUsers,
          icon: Users,
          color: "text-blue-500",
          bg: "bg-blue-100 dark:bg-blue-950/40",
        },
        {
          label: "Active Donors",
          value: stats.totalDonors,
          icon: Heart,
          color: "text-red-500",
          bg: "bg-red-100 dark:bg-red-950/40",
        },
        {
          label: "Volunteers",
          value: stats.totalVolunteers,
          icon: UserCheck,
          color: "text-purple-500",
          bg: "bg-purple-100 dark:bg-purple-950/40",
        },
        {
          label: "Total Requests",
          value: stats.requests.total,
          icon: Droplets,
          color: "text-zinc-500",
          bg: "bg-zinc-100 dark:bg-zinc-800",
        },
        {
          label: "Pending",
          value: stats.requests.pending,
          icon: Clock,
          color: "text-amber-500",
          bg: "bg-amber-100 dark:bg-amber-950/40",
        },
        {
          label: "Active",
          value: stats.requests.active,
          icon: Activity,
          color: "text-blue-500",
          bg: "bg-blue-100 dark:bg-blue-950/40",
        },
        {
          label: "Fulfilled",
          value: stats.requests.fulfilled,
          icon: CheckCircle,
          color: "text-emerald-500",
          bg: "bg-emerald-100 dark:bg-emerald-950/40",
        },
        {
          label: "Cancelled",
          value:
            stats.requests.total -
            stats.requests.pending -
            stats.requests.active -
            stats.requests.fulfilled,
          icon: AlertCircle,
          color: "text-zinc-400",
          bg: "bg-zinc-100 dark:bg-zinc-800",
        },
      ]
    : [];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">
          Dashboard Analytics
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Overview of BloodAid platform activity
        </p>
      </motion.div>

      {/* Stats grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statCards.map(({ label, value, icon: Icon, color, bg }, i) => (
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
                {value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Request breakdown */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6"
        >
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white mb-5">
            Request Status Overview
          </h2>
          <div className="space-y-3">
            {[
              {
                label: "Pending",
                value: stats.requests.pending,
                total: stats.requests.total,
                color: "bg-amber-500",
              },
              {
                label: "Active",
                value: stats.requests.active,
                total: stats.requests.total,
                color: "bg-blue-500",
              },
              {
                label: "Fulfilled",
                value: stats.requests.fulfilled,
                total: stats.requests.total,
                color: "bg-emerald-500",
              },
            ].map(({ label, value, total, color }) => {
              const pct = total > 0 ? Math.round((value / total) * 100) : 0;
              return (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {label}
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">
                      {value}{" "}
                      <span className="text-zinc-400 font-normal">
                        ({pct}%)
                      </span>
                    </span>
                  </div>
                  <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: "easeOut",
                      }}
                      className={`h-full ${color} rounded-full`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
