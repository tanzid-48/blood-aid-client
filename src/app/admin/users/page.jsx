"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Heart,
  UserCheck,
  ChevronDown,
  RefreshCw,
  Trash2,
  ShieldOff,
  Shield,
  Eye,
  X,
  Phone,
  Mail,
  Droplets,
} from "lucide-react";
import {
  getAllUsersAction,
  updateUserRoleAction,
  suspendUserAction,
  deleteUserAction,
} from "@/lib/actions/admin";
import { useSession } from "@/lib/auth-client";

const ROLES = ["user", "volunteer", "admin"];

const ROLE_CONFIG = {
  admin: {
    color: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-950/30",
  },
  volunteer: {
    color: "text-purple-700 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-950/30",
  },
  user: {
    color: "text-zinc-600 dark:text-zinc-400",
    bg: "bg-zinc-100 dark:bg-zinc-800",
  },
};

function UserDetailModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            User Details
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-black shrink-0">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-base font-bold text-zinc-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {user.email}
              </p>
              {user.isSuspended && (
                <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400">
                  Suspended
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Role", value: user.role?.toUpperCase() },
              { label: "Blood Group", value: user.bloodGroup || "Not set" },
              { label: "Phone", value: user.phone || "Not set" },
              { label: "Location", value: user.location || "Not set" },
              { label: "Donor", value: user.isDonor ? "Yes" : "No" },
              {
                label: "Email Verified",
                value: user.emailVerified ? "Yes" : "No",
              },
              {
                label: "Joined",
                value: new Date(user.createdAt).toLocaleDateString("en-BD", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-zinc-50 dark:bg-zinc-800 rounded-xl px-4 py-3"
              >
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-0.5">
                  {label}
                </p>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
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

export default function AdminUsersPage() {
  const { data: adminSession } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [detailUser, setDetailUser] = useState(null);

  const fetchUsers = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    const { data } = await getAllUsersAction();
    setUsers(data);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingId(userId + "_role");
    const { success } = await updateUserRoleAction(
      userId,
      newRole,
      adminSession?.user?.id,
    );
    if (success) fetchUsers(true);
    setUpdatingId(null);
  };

  const handleSuspend = async (userId, currentStatus) => {
    setUpdatingId(userId + "_suspend");
    const { success } = await suspendUserAction(
      userId,
      currentStatus,
      adminSession?.user?.id,
    );
    if (success) fetchUsers(true);
    setUpdatingId(null);
  };

  const handleDelete = async (userId) => {
    if (!confirm("Permanently delete this user? This cannot be undone."))
      return;
    setDeletingId(userId);
    const { success } = await deleteUserAction(userId, adminSession?.user?.id);
    if (success) fetchUsers(true);
    setDeletingId(null);
  };

  return (
    <div className="max-w-6xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
            User Management
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {loading ? "Loading..." : `${users.length} registered users`}
          </p>
        </div>
        <button
          onClick={() => fetchUsers(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all disabled:opacity-50 shrink-0"
        >
          <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />{" "}
          Refresh
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-400 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {["All", "user", "volunteer", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border whitespace-nowrap transition-all shrink-0 ${
                roleFilter === r
                  ? "bg-red-600 border-red-600 text-white"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              {r === "All" ? "All" : r.charAt(0).toUpperCase() + r.slice(1)}
              <span className="ml-1 text-[10px] opacity-70">
                (
                {r === "All"
                  ? users.length
                  : users.filter((u) => u.role === r).length}
                )
              </span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden"
      >
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users
              size={28}
              className="text-zinc-300 dark:text-zinc-600 mb-3"
            />
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              No users found
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filtered.map((user, i) => {
              const role = ROLE_CONFIG[user.role] || ROLE_CONFIG.user;
              const isSelf = user._id === adminSession?.user?.id;
              return (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-5 py-4 hover:bg-zinc-50 dark:hover:bg-white/4 transition-colors ${user.isSuspended ? "opacity-60" : ""}`}
                >
                  {/* Name */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shrink-0">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                          {user.name}
                          {isSelf && (
                            <span className="text-[10px] text-zinc-400 ml-1">
                              (you)
                            </span>
                          )}
                        </p>
                        {user.isSuspended && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400">
                            Suspended
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="flex items-center gap-0.5 text-xs text-zinc-400">
                          <Mail size={10} /> {user.email}
                        </span>
                        {user.phone && (
                          <span className="flex items-center gap-0.5 text-xs text-zinc-400">
                            <Phone size={10} /> {user.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap sm:shrink-0">
                    {user.bloodGroup && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400">
                        <Droplets size={9} fill="currentColor" />{" "}
                        {user.bloodGroup}
                      </span>
                    )}
                    {user.isDonor && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                        <Heart size={9} fill="currentColor" /> Donor
                      </span>
                    )}
                  </div>

                  {/* Role selector */}
                  <div className="relative shrink-0">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      disabled={updatingId === user._id + "_role" || isSelf}
                      className={`text-xs font-bold pl-2.5 pr-6 py-1.5 rounded-full border appearance-none cursor-pointer outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${role.bg} ${role.color} border-current/20`}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r.charAt(0).toUpperCase() + r.slice(1)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={10}
                      className={`absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none ${role.color}`}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setDetailUser(user)}
                      className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                      title="View details"
                    >
                      <Eye size={14} />
                    </button>
                    {!isSelf && (
                      <button
                        onClick={() =>
                          handleSuspend(user._id, user.isSuspended)
                        }
                        disabled={updatingId === user._id + "_suspend"}
                        className={`p-2 rounded-lg border transition-all disabled:opacity-50 ${
                          user.isSuspended
                            ? "border-emerald-200 dark:border-emerald-900/40 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                            : "border-amber-200 dark:border-amber-900/40 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                        }`}
                        title={user.isSuspended ? "Activate" : "Suspend"}
                      >
                        {user.isSuspended ? (
                          <Shield size={14} />
                        ) : (
                          <ShieldOff size={14} />
                        )}
                      </button>
                    )}
                    {!isSelf && (
                      <button
                        onClick={() => handleDelete(user._id)}
                        disabled={deletingId === user._id}
                        className="p-2 rounded-lg border border-red-200 dark:border-red-900/40 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all disabled:opacity-50"
                        title="Delete user"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {detailUser && (
          <UserDetailModal
            user={detailUser}
            onClose={() => setDetailUser(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
