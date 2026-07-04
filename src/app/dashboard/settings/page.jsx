"use client";

import { motion } from "framer-motion";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LogOut,
  Trash2,
  Shield,
  Bell,
  Moon,
  Eye,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "@/lib/theme";
import Link from "next/link";

const SettingRow = ({ icon: Icon, label, description, children }) => (
  <div className="flex items-center justify-between gap-4 py-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
    <div className="flex items-center gap-3 min-w-0">
      <div className="h-9 w-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-zinc-500 dark:text-zinc-400" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-zinc-900 dark:text-white">
          {label}
        </p>
        {description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            {description}
          </p>
        )}
      </div>
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully.");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="max-w-3xl  mx-auto  space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
          Settings
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          Manage your account and preferences
        </p>
      </div>

      {/* Account info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6"
      >
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Account
        </h2>
        <div className="space-y-0">
          <SettingRow
            icon={Shield}
            label="Role"
            description="Your account type"
          >
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                user?.role === "admin"
                  ? "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400"
                  : user?.role === "volunteer"
                    ? "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {user?.role?.toUpperCase()}
            </span>
          </SettingRow>

          <SettingRow
            icon={Eye}
            label="Profile"
            description="Edit your personal information"
          >
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-400 transition-colors"
            >
              Edit <ChevronRight size={13} />
            </Link>
          </SettingRow>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6"
      >
        <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          Preferences
        </h2>
        <div className="space-y-0">
          <SettingRow
            icon={Moon}
            label="Dark Mode"
            description="Toggle dark or light theme"
          >
            {/* Toggle switch */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                theme === "dark" ? "bg-red-600" : "bg-zinc-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  theme === "dark" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </SettingRow>

          <SettingRow
            icon={Bell}
            label="Notifications"
            description="Coming soon"
          >
            <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full font-medium">
              Soon
            </span>
          </SettingRow>
        </div>
      </motion.div>

      {/* Danger zone */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-900/40 rounded-2xl p-6"
      >
        <h2 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-4">
          Danger Zone
        </h2>
        <div className="space-y-0">
          <SettingRow
            icon={LogOut}
            label="Sign Out"
            description="Sign out from your account"
          >
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
            >
              Sign Out
            </button>
          </SettingRow>

          <SettingRow
            icon={Trash2}
            label="Delete Account"
            description="Permanently delete your account and all data"
          >
            <button
              onClick={() =>
                toast.error("Contact admin to delete your account.")
              }
              className="px-4 py-2 rounded-xl border border-red-200 dark:border-red-900/40 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
            >
              Delete
            </button>
          </SettingRow>
        </div>
      </motion.div>
    </div>
  );
}
