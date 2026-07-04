"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import {
  Droplets,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  MapPin,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { cancelRequest, getMyRequests } from "@/lib/api/requests";


const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-900/40",
    icon: Clock,
  },
  active: {
    label: "Active",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-900/40",
    icon: Droplets,
  },
  fulfilled: {
    label: "Fulfilled",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-900/40",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-zinc-500",
    bg: "bg-zinc-100 dark:bg-zinc-800",
    border: "border-zinc-200 dark:border-zinc-700",
    icon: X,
  },
};

const URGENCY_COLORS = {
  Normal:
    "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/30",
  Urgent:
    "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/30",
  Emergency:
    "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900/30",
};

const FILTERS = ["All", "pending", "active", "fulfilled", "cancelled"];

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [cancelling, setCancelling] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRequests = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const data = await getMyRequests();
      setRequests(data);
    } catch {
      if (!silent) toast.error("Failed to load requests.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const filtered =
    filter === "All" ? requests : requests.filter((r) => r.status === filter);

  const handleCancel = async (id) => {
    if (!confirm("Cancel this blood request?")) return;
    setCancelling(id);
    try {
      await cancelRequest(id);
      toast.success("Request cancelled.");
      fetchRequests(true);
    } catch {
      toast.error("Failed to cancel. Please try again.");
    } finally {
      setCancelling(null);
    }
  };

  return (
    <div className="max-w-4xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
            My Blood Requests
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {loading ? "Loading..." : `${requests.length} total requests`}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Refresh */}
          <button
            onClick={() => fetchRequests(true)}
            disabled={refreshing}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          </button>
          {/* New request */}
          <Link
            href="/emergency"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all shadow-md shadow-red-600/20"
          >
            <Plus size={15} /> New Request
          </Link>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {FILTERS.map((f) => {
          const count =
            f === "All"
              ? requests.length
              : requests.filter((r) => r.status === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap transition-all shrink-0 ${
                filter === f
                  ? "bg-red-600 border-red-600 text-white shadow-sm shadow-red-600/20"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600"
              }`}
            >
              {f === "All" ? "All" : STATUS_CONFIG[f]?.label}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  filter === f
                    ? "bg-white/20 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-36 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl"
        >
          <div className="h-14 w-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
            <Droplets size={22} className="text-zinc-400" />
          </div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
            No{" "}
            {filter !== "All" ? STATUS_CONFIG[filter]?.label.toLowerCase() : ""}{" "}
            requests
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">
            {filter === "All"
              ? "You haven't made any blood requests yet."
              : `No requests with status "${STATUS_CONFIG[filter]?.label}".`}
          </p>
          {filter === "All" && (
            <Link
              href="/emergency"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all"
            >
              <Plus size={13} /> Post a Request
            </Link>
          )}
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="space-y-3">
            {filtered.map((req, i) => {
              const s = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending;
              const StatusIcon = s.icon;
              return (
                <motion.div
                  key={req._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  {/* Top row */}
                  <div className="flex items-start gap-3 mb-4">
                    {/* Blood group */}
                    <div className="h-12 w-12 rounded-xl bg-red-100 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 flex flex-col items-center justify-center shrink-0">
                      <Droplets
                        size={12}
                        className="text-red-500"
                        fill="currentColor"
                      />
                      <span className="text-xs font-black text-red-600 dark:text-red-400 leading-none mt-0.5">
                        {req.bloodGroup}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <p className="text-sm font-bold text-zinc-900 dark:text-white">
                            {req.patientName}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {req.quantity} bag{req.quantity > 1 ? "s" : ""} ·{" "}
                            {req.reason} · {req.relation}
                          </p>
                        </div>
                        {/* Status badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${s.bg} ${s.color} ${s.border}`}
                        >
                          <StatusIcon size={11} />
                          {s.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <MapPin size={12} className="text-zinc-400 shrink-0" />
                      <span className="truncate">
                        {req.hospitalName}, {req.district}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-zinc-400 shrink-0" />
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Needed by
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          new Date(req.neededBy) < new Date()
                            ? "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                            : new Date(req.neededBy) - new Date() < 86400000 * 2
                              ? "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        }`}
                      >
                        {new Date(req.neededBy).toLocaleDateString("en-BD", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Urgency + Volunteer */}
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${URGENCY_COLORS[req.urgency]}`}
                    >
                      {req.urgency === "Emergency" && "🔴 "}
                      {req.urgency === "Urgent" && "🟡 "}
                      {req.urgency === "Normal" && "🟢 "}
                      {req.urgency}
                    </span>
                    {req.assignedVolunteer && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400">
                        👤 Volunteer: {req.assignedVolunteer.name}
                      </span>
                    )}
                    {req.assignedDonor && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                        🩸 Donor: {req.assignedDonor.name}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs text-zinc-400">
                      Posted{" "}
                      {new Date(req.createdAt).toLocaleDateString("en-BD", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    {req.status === "pending" && (
                      <button
                        onClick={() => handleCancel(req._id)}
                        disabled={cancelling === req._id}
                        className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 disabled:opacity-50 transition-colors"
                      >
                        <X size={13} />
                        {cancelling === req._id ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
