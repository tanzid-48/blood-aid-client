"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Users,
  Search,
  Shield,
  Heart,
  UserCheck,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { getAllUsers, updateUserRole } from "@/lib/api/admin";

const ROLES = ["user", "volunteer", "admin"];

const ROLE_CONFIG = {
  admin: {
    color: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-950/30",
    label: "Admin",
  },
  volunteer: {
    color: "text-purple-700 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-950/30",
    label: "Volunteer",
  },
  user: {
    color: "text-zinc-600 dark:text-zinc-400",
    bg: "bg-zinc-100 dark:bg-zinc-800",
    label: "User",
  },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [updatingRole, setUpdatingRole] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const data = await getAllUsers();
      setUsers(data.data || []);
    } catch {
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
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
    setUpdatingRole(userId);
    try {
      await updateUserRole(userId, newRole);
      toast.success(`Role updated to ${newRole}`);
      fetchUsers(true);
    } catch {
      toast.error("Failed to update role.");
    } finally {
      setUpdatingRole(null);
    }
  };

  return (
    <div className="max-w-6xl space-y-5">
      {/* Header */}
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
          <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Search + filter */}
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
        <div className="flex items-center gap-2">
          {["All", "user", "volunteer", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border whitespace-nowrap transition-all ${
                roleFilter === r
                  ? "bg-red-600 border-red-600 text-white"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              {r === "All" ? "All" : r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden"
      >
        {/* Desktop header */}
        <div className="hidden sm:grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 px-6 py-3 border-b border-zinc-100 dark:border-zinc-800 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          <span>User</span>
          <span>Email</span>
          <span>Blood Group</span>
          <span>Status</span>
          <span>Role</span>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-14 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse"
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
              return (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex flex-col sm:grid sm:grid-cols-[1fr_1fr_auto_auto_auto] gap-3 sm:gap-4 px-6 py-4 items-start sm:items-center hover:bg-zinc-50 dark:hover:bg-white/4 transition-colors"
                >
                  {/* Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                      {user.name}
                    </p>
                  </div>

                  {/* Email */}
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                    {user.email}
                  </p>

                  {/* Blood group */}
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full text-center ${
                      user.bloodGroup
                        ? "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {user.bloodGroup || "—"}
                  </span>

                  {/* Donor/Volunteer status */}
                  <div className="flex items-center gap-1.5">
                    {user.isDonor && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400">
                        <Heart size={9} fill="currentColor" /> Donor
                      </span>
                    )}
                  </div>

                  {/* Role selector */}
                  <div className="relative">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      disabled={updatingRole === user._id}
                      className={`text-xs font-bold pl-2.5 pr-6 py-1.5 rounded-full border appearance-none cursor-pointer outline-none transition-all disabled:opacity-50 ${role.bg} ${role.color} border-current/20`}
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
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
