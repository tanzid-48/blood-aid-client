"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  Droplets,
  MapPin,
  Save,
  Loader2,
  Heart,
  CheckCircle,
  Shield,
} from "lucide-react";
import { updateProfile, becomeDonor } from "@/lib/api/users";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const inputCls =
  "w-full h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-red-400 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all";

const FieldLabel = ({ children }) => (
  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
    {children}
  </label>
);

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    bloodGroup: "",
    location: "",
  });
  const [saving, setSaving] = useState(false);
  const [becomingDonor, setBecomingDonor] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        bloodGroup: user.bloodGroup || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const set = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    setSaving(true);
    try {
      await updateProfile(form);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleBecomeDonor = async () => {
    if (!user?.bloodGroup && !form.bloodGroup) {
      toast.error("Please set your blood group first.");
      return;
    }
    setBecomingDonor(true);
    try {
      await becomeDonor();
      toast.success("You are now a registered donor! 🩸");
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      toast.error("Failed. Please try again.");
    } finally {
      setBecomingDonor(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-2xl space-y-4 animate-pulse">
        <div className="h-10 w-48 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-28 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-64 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
          My Profile
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          Update your personal information
        </p>
      </div>

      {/* Avatar card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-4"
      >
        <div className="h-16 w-16 rounded-full bg-red-600 flex items-center justify-center text-white text-2xl font-black shrink-0 shadow-lg shadow-red-600/20">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-base font-bold text-zinc-900 dark:text-white truncate">
            {user?.name}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
            {user?.email}
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                user?.role === "admin"
                  ? "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400"
                  : user?.role === "volunteer"
                    ? "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              <Shield size={10} />
              {user?.role?.toUpperCase()}
            </span>
            {user?.isDonor && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400">
                <Heart size={10} fill="currentColor" />
                DONOR · {user?.bloodGroup}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Edit form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6"
      >
        <h2 className="text-sm font-bold text-zinc-900 dark:text-white mb-5">
          Personal Information
        </h2>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Name */}
          <div>
            <FieldLabel>Full Name</FieldLabel>
            <div className="relative">
              <User
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={set}
                placeholder="Your full name"
                className={`${inputCls} pl-10`}
              />
            </div>
          </div>

          {/* Email — read only */}
          <div>
            <FieldLabel>Email Address</FieldLabel>
            <div className="relative">
              <Mail
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className={`${inputCls} pl-10 opacity-50 cursor-not-allowed`}
              />
            </div>
            <p className="text-xs text-zinc-400 mt-1 ml-1">
              Email cannot be changed
            </p>
          </div>

          {/* Blood group + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>Blood Group</FieldLabel>
              <div className="relative">
                <Droplets
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={set}
                  className={`${inputCls} pl-10 appearance-none cursor-pointer`}
                >
                  <option value="">Select</option>
                  {BLOOD_GROUPS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <FieldLabel>Phone Number</FieldLabel>
              <div className="relative">
                <Phone
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={set}
                  placeholder="01XXXXXXXXX"
                  className={`${inputCls} pl-10`}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <FieldLabel>Location</FieldLabel>
            <div className="relative">
              <MapPin
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                name="location"
                type="text"
                value={form.location}
                onChange={set}
                placeholder="e.g. Bogura Sadar"
                className={`${inputCls} pl-10`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full h-11 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-500 transition-all shadow-md shadow-red-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save size={15} /> Save Changes
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Become donor / Donor status */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {user?.isDonor ? (
          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
            <CheckCircle
              size={20}
              className="text-emerald-600 dark:text-emerald-400 shrink-0"
            />
            <div>
              <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                You are a registered donor 🩸
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-0.5">
                Blood group: <strong>{user.bloodGroup}</strong> · You appear in
                the donor directory
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center shrink-0">
                <Heart size={20} className="text-red-600" fill="currentColor" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-zinc-900 dark:text-white mb-1">
                  Become a Blood Donor
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                  Register as a donor to appear in the donor directory. Make
                  sure your blood group is set first.
                </p>
                <button
                  onClick={handleBecomeDonor}
                  disabled={becomingDonor || !form.bloodGroup}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all shadow-md shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {becomingDonor ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />{" "}
                      Registering...
                    </>
                  ) : (
                    <>
                      <Droplets size={14} fill="currentColor" /> Register as
                      Donor
                    </>
                  )}
                </button>
                {!form.bloodGroup && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                    ⚠️ Set your blood group above first
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
