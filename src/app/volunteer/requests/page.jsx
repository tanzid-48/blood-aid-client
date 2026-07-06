"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Droplets,
  Clock,
  CheckCircle,
  X,
  MapPin,
  Calendar,
  RefreshCw,
  Phone,
  User,
  ChevronDown,
} from "lucide-react";
import {
  getAssignedRequestsAction,
  updateRequestStatusAction,
} from "@/lib/actions/volunteer";

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
  Normal: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
  Urgent: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30",
  Emergency: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30",
};

const FILTERS = ["All", "pending", "active", "fulfilled", "cancelled"];

// Donor info modal
function DonorModal({ request, onClose, onSubmit }) {
  const [form, setForm] = useState({ donorName: "", donorPhone: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.donorName || !form.donorPhone) {
      toast.error("Please fill in donor details.");
      return;
    }
    setLoading(true);
    const { success } = await onSubmit(
      request._id,
      "fulfilled",
      form.donorName,
      form.donorPhone,
    );
    if (success) onClose();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 w-full max-w-md shadow-2xl"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            Mark as Fulfilled
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mb-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800">
          <p className="font-semibold text-zinc-900 dark:text-white text-sm">
            {request.patientName}
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">
            {request.bloodGroup} · {request.hospitalName}
          </p>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Enter the donor details who provided blood for this request.
        </p>

        <div className="space-y-3 mb-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Donor Name
            </label>
            <div className="relative">
              <User
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                value={form.donorName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, donorName: e.target.value }))
                }
                placeholder="Donor full name"
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-400 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Donor Phone
            </label>
            <div className="relative">
              <Phone
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="tel"
                value={form.donorPhone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, donorPhone: e.target.value }))
                }
                placeholder="01XXXXXXXXX"
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-400 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Saving..." : "Mark Fulfilled"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function VolunteerRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const [donorModal, setDonorModal] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchRequests = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    const { data } = await getAssignedRequestsAction();
    setRequests(data);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const filtered =
    filter === "All" ? requests : requests.filter((r) => r.status === filter);

  const handleStatusUpdate = async (
    requestId,
    status,
    donorName,
    donorPhone,
  ) => {
    setUpdatingId(requestId);
    const result = await updateRequestStatusAction(
      requestId,
      status,
      donorName,
      donorPhone,
    );
    if (result.success) fetchRequests(true);
    setUpdatingId(null);
    return result;
  };

  return (
    <div className="max-w-4xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
            Assigned Requests
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {loading ? "Loading..." : `${requests.length} total assignments`}
          </p>
        </div>
        <button
          onClick={() => fetchRequests(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all disabled:opacity-50 shrink-0"
        >
          <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
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
                  ? "bg-red-600 border-red-600 text-white"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              {f === "All" ? "All" : STATUS_CONFIG[f]?.label}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  filter === f
                    ? "bg-white/20"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center">
          <Droplets
            size={28}
            className="text-zinc-300 dark:text-zinc-600 mb-3"
          />
          <p className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
            No{" "}
            {filter !== "All" ? STATUS_CONFIG[filter]?.label.toLowerCase() : ""}{" "}
            assignments
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {filter === "All"
              ? "Admin will assign blood requests to you."
              : `No requests with this status.`}
          </p>
        </div>
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
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5"
                >
                  {/* Top */}
                  <div className="flex items-start gap-3 mb-4">
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
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <p className="text-sm font-bold text-zinc-900 dark:text-white">
                            {req.patientName}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {req.quantity} bag{req.quantity > 1 ? "s" : ""} ·{" "}
                            {req.reason}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${s.bg} ${s.color} ${s.border}`}
                        >
                          <StatusIcon size={11} /> {s.label}
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
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <Calendar size={12} className="text-zinc-400 shrink-0" />
                      <span>
                        {new Date(req.neededBy).toLocaleDateString("en-BD", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {/* Contact — volunteer-এর জন্য phone দেখাবে */}
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <Phone size={12} className="text-zinc-400 shrink-0" />
                      <span>{req.yourName} · </span>
                      <a
                        href={`tel:${req.yourPhone}`}
                        className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {req.yourPhone}
                      </a>
                    </div>
                  </div>

                  {/* Urgency + donor info */}
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${URGENCY_COLORS[req.urgency]}`}
                    >
                      {req.urgency === "Emergency" && "🔴 "}
                      {req.urgency === "Urgent" && "🟡 "}
                      {req.urgency === "Normal" && "🟢 "}
                      {req.urgency}
                    </span>
                    {req.assignedDonor && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                        🩸 Donor: {req.assignedDonor.name} ·{" "}
                        {req.assignedDonor.phone}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 gap-3 flex-wrap">
                    <p className="text-xs text-zinc-400">
                      {new Date(req.createdAt).toLocaleDateString("en-BD", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <div className="flex items-center gap-2">
                      {/* Mark fulfilled */}
                      {req.status === "active" && (
                        <button
                          onClick={() => setDonorModal(req)}
                          disabled={updatingId === req._id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 transition-all disabled:opacity-50"
                        >
                          <CheckCircle size={13} /> Mark Fulfilled
                        </button>
                      )}

                      {/* Cancel */}
                      {(req.status === "active" ||
                        req.status === "pending") && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, "cancelled")
                          }
                          disabled={updatingId === req._id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-500 hover:text-red-500 hover:border-red-300 transition-all disabled:opacity-50"
                        >
                          <X size={13} />
                          {updatingId === req._id ? "..." : "Cancel"}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}

      {/* Donor modal */}
      <AnimatePresence>
        {donorModal && (
          <DonorModal
            request={donorModal}
            onClose={() => setDonorModal(null)}
            onSubmit={handleStatusUpdate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
