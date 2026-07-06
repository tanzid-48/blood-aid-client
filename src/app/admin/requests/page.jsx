"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  Clock,
  CheckCircle,
  X,
  MapPin,
  Calendar,
  RefreshCw,
  UserCheck,
  ChevronDown,
  Trash2,
  Eye,
  Phone,
} from "lucide-react";
import {
  getAllRequestsAction,
  assignVolunteerAction,
  updateRequestStatusAction,
  deleteRequestAction,
} from "@/lib/actions/admin";
import { getAllUsersAction } from "@/lib/actions/admin";
import { toast } from "sonner";

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

function DetailModal({ request, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            Request Details
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {[
            {
              title: "Patient Info",
              items: [
                { label: "Patient Name", value: request.patientName },
                { label: "Blood Group", value: request.bloodGroup },
                { label: "Quantity", value: `${request.quantity} bag(s)` },
                { label: "Condition", value: request.condition },
                { label: "Reason", value: request.reason },
                { label: "Relation", value: request.relation },
              ],
            },
            {
              title: "Hospital Info",
              items: [
                { label: "Hospital", value: request.hospitalName },
                { label: "District", value: request.district },
                {
                  label: "Needed By",
                  value: new Date(request.neededBy).toLocaleDateString(
                    "en-BD",
                    { day: "numeric", month: "short", year: "numeric" },
                  ),
                },
                { label: "Urgency", value: request.urgency },
              ],
            },
            {
              title: "Contact Info",
              items: [
                { label: "Contact Name", value: request.yourName },
                { label: "Phone", value: request.yourPhone },
                { label: "Requester", value: request.requesterName },
                { label: "Status", value: request.status },
              ],
            },
          ].map(({ title, items }) => (
            <div key={title}>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                {title}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {items.map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-zinc-50 dark:bg-zinc-800 rounded-xl px-4 py-3"
                  >
                    <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white capitalize">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {(request.assignedVolunteer || request.assignedDonor) && (
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                Assignment
              </p>
              <div className="grid grid-cols-2 gap-2">
                {request.assignedVolunteer && (
                  <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-0.5">
                      Volunteer
                    </p>
                    <p className="text-sm font-bold text-purple-700 dark:text-purple-400">
                      {request.assignedVolunteer.name}
                    </p>
                  </div>
                )}
                {request.assignedDonor && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 rounded-xl px-4 py-3">
                    <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-0.5">
                      Donor
                    </p>
                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                      {request.assignedDonor.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function AssignModal({ request, volunteers, onAssign, onClose }) {
  const [selected, setSelected] = useState(request.assignedVolunteer?.id || "");
  const [loading, setLoading] = useState(false);

  const handleAssign = async () => {
    if (!selected) {
      toast.error("Select a volunteer.");
      return;
    }
    const vol = volunteers.find((v) => v._id === selected);
    setLoading(true);
    const { success } = await assignVolunteerAction(
      request._id,
      selected,
      vol.name,
    );
    if (success) {
      onAssign();
      onClose();
    }
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
            Assign Volunteer
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
            {request.bloodGroup} · {request.hospitalName} · {request.district}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Phone size={11} className="text-zinc-400" />
            <span className="text-xs text-zinc-500">{request.yourPhone}</span>
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Select Volunteer
          </label>
          <div className="relative">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full h-11 px-4 pr-9 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white outline-none focus:border-red-400 appearance-none cursor-pointer"
            >
              <option value="">Choose a volunteer...</option>
              {volunteers.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.name} {v.bloodGroup ? `— ${v.bloodGroup}` : ""}{" "}
                  {v.phone ? `· ${v.phone}` : ""}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
            />
          </div>
          {volunteers.length === 0 && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
              No volunteers found. Go to Users and assign someone as Volunteer
              first.
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selected || loading || volunteers.length === 0}
            className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [detailModal, setDetailModal] = useState(null);
  const [assignModal, setAssignModal] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchAll = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    const [reqResult, volResult] = await Promise.all([
      getAllRequestsAction(),
      getAllUsersAction({ role: "volunteer" }),
    ]);
    setRequests(reqResult.data);
    setVolunteers(volResult.data);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const filtered =
    filter === "All" ? requests : requests.filter((r) => r.status === filter);

  const handleStatusChange = async (id, status) => {
    const { success } = await updateRequestStatusAction(id, status);
    if (success) fetchAll(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Permanently delete this request?")) return;
    setDeletingId(id);
    const { success } = await deleteRequestAction(id);
    if (success) fetchAll(true);
    setDeletingId(null);
  };

  return (
    <div className="max-w-6xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
            Blood Requests
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {loading ? "Loading..." : `${requests.length} total requests`}
          </p>
        </div>
        <button
          onClick={() => fetchAll(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all disabled:opacity-50 shrink-0"
        >
          <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />{" "}
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
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${filter === f ? "bg-white/20" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`}
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
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            No requests found
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
                            {req.reason} · {req.relation}
                          </p>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            By: {req.requesterName}
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

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
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
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <Phone size={12} className="text-zinc-400 shrink-0" />
                      <span>
                        {req.yourName} · {req.yourPhone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${URGENCY_COLORS[req.urgency]}`}
                    >
                      {req.urgency === "Emergency" && "🔴 "}
                      {req.urgency === "Urgent" && "🟡 "}
                      {req.urgency === "Normal" && "🟢 "}
                      {req.urgency}
                    </span>
                    {req.assignedVolunteer && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30 text-purple-600 dark:text-purple-400">
                        👤 {req.assignedVolunteer.name}
                      </span>
                    )}
                    {req.assignedDonor && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                        🩸 {req.assignedDonor.name}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 gap-3 flex-wrap">
                    <p className="text-xs text-zinc-400">
                      {new Date(req.createdAt).toLocaleDateString("en-BD", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => setDetailModal(req)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all"
                      >
                        <Eye size={13} /> View
                      </button>
                      {(req.status === "pending" ||
                        req.status === "active") && (
                        <button
                          onClick={() => setAssignModal(req)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-200 dark:border-purple-900/40 bg-purple-50 dark:bg-purple-950/20 text-xs font-bold text-purple-700 dark:text-purple-400 hover:bg-purple-100 transition-all"
                        >
                          <UserCheck size={13} />
                          {req.assignedVolunteer ? "Reassign" : "Assign"}
                        </button>
                      )}
                      {req.status === "active" && (
                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "fulfilled")
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 transition-all"
                        >
                          <CheckCircle size={13} /> Fulfilled
                        </button>
                      )}
                      {req.status === "pending" && (
                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "cancelled")
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-500 hover:text-amber-600 hover:border-amber-300 transition-all"
                        >
                          <X size={13} /> Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(req._id)}
                        disabled={deletingId === req._id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-100 transition-all disabled:opacity-50"
                      >
                        <Trash2 size={13} />
                        {deletingId === req._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}

      <AnimatePresence>
        {detailModal && (
          <DetailModal
            request={detailModal}
            onClose={() => setDetailModal(null)}
          />
        )}
        {assignModal && (
          <AssignModal
            request={assignModal}
            volunteers={volunteers}
            onAssign={() => fetchAll(true)}
            onClose={() => setAssignModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
