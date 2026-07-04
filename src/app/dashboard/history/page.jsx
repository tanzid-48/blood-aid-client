"use client";

import { motion } from "framer-motion";
import { Droplets, Heart, Calendar, MapPin } from "lucide-react";
import { useSession } from "@/lib/auth-client";

// Mock data — backend-এ donation collection
const MOCK_HISTORY = [];

export default function HistoryPage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
            Donation History
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Your blood donation contributions
          </p>
        </div>

        {/* Total donations badge */}
        {user?.totalDonations > 0 && (
          <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40">
            <Heart size={14} className="text-red-500" fill="currentColor" />
            <span className="text-sm font-bold text-red-700 dark:text-red-400">
              {user.totalDonations} donations
            </span>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Total Donations",
            value: user?.totalDonations || 0,
            icon: Droplets,
            color: "text-red-500",
            bg: "bg-red-100 dark:bg-red-950/40",
          },
          {
            label: "Blood Donated",
            value: `${(user?.totalDonations || 0) * 450}ml`,
            icon: Heart,
            color: "text-pink-500",
            bg: "bg-pink-100 dark:bg-pink-950/40",
          },
          {
            label: "Lives Saved",
            value: (user?.totalDonations || 0) * 3,
            icon: Heart,
            color: "text-emerald-500",
            bg: "bg-emerald-100 dark:bg-emerald-950/40",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5"
          >
            <div
              className={`h-9 w-9 rounded-xl ${bg} flex items-center justify-center mb-3`}
            >
              <Icon size={16} className={color} />
            </div>
            <p className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              {value}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* History list */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
            Donation Records
          </h2>
        </div>

        {MOCK_HISTORY.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="h-14 w-14 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-4">
              <Heart size={24} className="text-red-400" />
            </div>
            <p className="text-sm font-bold text-zinc-900 dark:text-white mb-1">
              No donations recorded yet
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
              Your donation records will appear here after you donate blood
              through BloodAid volunteers.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {MOCK_HISTORY.map((record) => (
              <div
                key={record._id}
                className="flex items-center gap-4 px-6 py-4"
              >
                <div className="h-11 w-11 rounded-xl bg-red-100 dark:bg-red-950/40 flex flex-col items-center justify-center shrink-0">
                  <Droplets
                    size={12}
                    className="text-red-500"
                    fill="currentColor"
                  />
                  <span className="text-[10px] font-black text-red-600 dark:text-red-400">
                    {record.bloodGroup}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {record.quantity}ml donated
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <MapPin size={10} /> {record.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <Calendar size={10} />
                      {new Date(record.donationDate).toLocaleDateString(
                        "en-BD",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 shrink-0">
                  Completed
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
