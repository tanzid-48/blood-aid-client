"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Search,
  Droplets,
  MapPin,
  Filter,
  X,
  CheckCircle,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";

const BLOOD_GROUPS = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const LOCATIONS = [
  "All Areas",
  "Bogura Sadar",
  "Shahjahanpur",
  "Kahaloo",
  "Shibganj",
  "Nandigram",
  "Gabtali",
];

const MOCK_DONORS = [
  {
    id: 1,
    name: "Tanzid Ahmed",
    bloodGroup: "B+",
    location: "Bogura Sadar",
    lastDonation: "3 months ago",
    donations: 5,
    available: true,
    verified: true,
  },
  {
    id: 2,
    name: "Rakib Hassan",
    bloodGroup: "A+",
    location: "Shahjahanpur",
    lastDonation: "2 months ago",
    donations: 8,
    available: true,
    verified: true,
  },
  {
    id: 3,
    name: "Sadia Islam",
    bloodGroup: "O+",
    location: "Bogura Sadar",
    lastDonation: "5 months ago",
    donations: 3,
    available: true,
    verified: true,
  },
  {
    id: 4,
    name: "Mahmudul Hasan",
    bloodGroup: "AB+",
    location: "Gabtali",
    lastDonation: "1 month ago",
    donations: 12,
    available: false,
    verified: true,
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    bloodGroup: "B-",
    location: "Kahaloo",
    lastDonation: "4 months ago",
    donations: 2,
    available: true,
    verified: true,
  },
  {
    id: 6,
    name: "Arif Hossain",
    bloodGroup: "A-",
    location: "Shibganj",
    lastDonation: "6 months ago",
    donations: 7,
    available: true,
    verified: false,
  },
  {
    id: 7,
    name: "Fatema Akter",
    bloodGroup: "O-",
    location: "Nandigram",
    lastDonation: "2 months ago",
    donations: 4,
    available: true,
    verified: true,
  },
  {
    id: 8,
    name: "Sajib Rahman",
    bloodGroup: "B+",
    location: "Bogura Sadar",
    lastDonation: "3 months ago",
    donations: 9,
    available: false,
    verified: true,
  },
  {
    id: 9,
    name: "Mitu Begum",
    bloodGroup: "A+",
    location: "Shahjahanpur",
    lastDonation: "7 months ago",
    donations: 1,
    available: true,
    verified: true,
  },
  {
    id: 10,
    name: "Rahim Uddin",
    bloodGroup: "AB-",
    location: "Gabtali",
    lastDonation: "4 months ago",
    donations: 6,
    available: true,
    verified: true,
  },
  {
    id: 11,
    name: "Poly Khatun",
    bloodGroup: "O+",
    location: "Kahaloo",
    lastDonation: "1 month ago",
    donations: 3,
    available: false,
    verified: true,
  },
  {
    id: 12,
    name: "Jubayer Ahmed",
    bloodGroup: "B+",
    location: "Bogura Sadar",
    lastDonation: "5 months ago",
    donations: 11,
    available: true,
    verified: true,
  },
];

const GROUP_COLORS = {
  "A+": {
    bg: "bg-red-100 dark:bg-red-950/40",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-200 dark:border-red-900/50",
  },
  "A-": {
    bg: "bg-red-100 dark:bg-red-950/40",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-200 dark:border-red-900/50",
  },
  "B+": {
    bg: "bg-blue-100 dark:bg-blue-950/40",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-900/50",
  },
  "B-": {
    bg: "bg-blue-100 dark:bg-blue-950/40",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-900/50",
  },
  "AB+": {
    bg: "bg-purple-100 dark:bg-purple-950/40",
    text: "text-purple-700 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-900/50",
  },
  "AB-": {
    bg: "bg-purple-100 dark:bg-purple-950/40",
    text: "text-purple-700 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-900/50",
  },
  "O+": {
    bg: "bg-emerald-100 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-900/50",
  },
  "O-": {
    bg: "bg-emerald-100 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-900/50",
  },
};

function DonorCard({ donor, index }) {
  const router = useRouter();
  const colors = GROUP_COLORS[donor.bloodGroup];

  const handleRequest = () => {
    router.push(
      `/emergency?bloodGroup=${donor.bloodGroup}&donorId=${donor.id}`,
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md dark:hover:shadow-black/30 transition-all duration-200 flex flex-col"
    >
      {/* Top — avatar + name + blood group */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-11 w-11 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center shrink-0">
            <User size={18} className="text-red-600 dark:text-red-500" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                {donor.name}
              </p>
              {donor.verified && (
                <CheckCircle size={13} className="text-blue-500 shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-zinc-400 shrink-0" />
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {donor.location}
              </p>
            </div>
          </div>
        </div>
        {/* Blood group badge */}
        <div
          className={`px-2.5 py-1 rounded-lg text-sm font-black border shrink-0 ${colors.bg} ${colors.text} ${colors.border}`}
        >
          {donor.bloodGroup}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="flex items-center gap-1.5">
          <span
            className={`h-2 w-2 rounded-full shrink-0 ${donor.available ? "bg-emerald-500" : "bg-zinc-400"}`}
          />
          <span
            className={`text-xs font-medium ${donor.available ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500"}`}
          >
            {donor.available ? "Available" : "Unavailable"}
          </span>
        </div>
        <span className="text-zinc-300 dark:text-zinc-700">·</span>
        <div className="flex items-center gap-1">
          <Droplets size={11} className="text-red-500" fill="currentColor" />
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {donor.donations} donations
          </span>
        </div>
        <span className="text-zinc-300 dark:text-zinc-700">·</span>
        <div className="flex items-center gap-1">
          <Clock size={11} className="text-zinc-400" />
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {donor.lastDonation}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        {donor.available ? (
          <button
            onClick={handleRequest}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all duration-200 active:scale-[0.98] hover:scale-[1.01] group"
          >
            <Droplets size={14} fill="currentColor" />
            Request This Donor
            <ArrowRight
              size={13}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-sm font-semibold cursor-not-allowed">
            Currently Unavailable
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function DonorsPage() {
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Areas");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_DONORS.filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
      const matchGroup =
        selectedGroup === "All" || d.bloodGroup === selectedGroup;
      const matchLocation =
        selectedLocation === "All Areas" || d.location === selectedLocation;
      const matchAvailable = !availableOnly || d.available;
      return matchSearch && matchGroup && matchLocation && matchAvailable;
    });
  }, [search, selectedGroup, selectedLocation, availableOnly]);

  const hasFilters =
    selectedGroup !== "All" ||
    selectedLocation !== "All Areas" ||
    availableOnly;

  const clearFilters = () => {
    setSelectedGroup("All");
    setSelectedLocation("All Areas");
    setAvailableOnly(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a]">
      {/* Header */}
      <div className="bg-white dark:bg-black border-b border-zinc-200 dark:border-white/8">
        <div className=" max-w-11/12 mx-auto px-6 lg:px-12 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 mb-4">
              <Droplets
                size={12}
                className="text-red-600 dark:text-red-400"
                fill="currentColor"
              />
              <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Donor Directory
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
              Find Blood Donors
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
              {MOCK_DONORS.length} verified donors registered at Pundra
              University
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
        {/* Search + filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-400 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all"
            />
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters((p) => !p)}
            className={`sm:hidden h-11 px-4 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-all ${
              showFilters || hasFilters
                ? "border-red-400 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400"
                : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            <Filter size={15} />
            Filters
            {hasFilters && (
              <span className="h-5 w-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                !
              </span>
            )}
          </button>

          {/* Desktop filters */}
          <div className="hidden sm:flex items-center gap-2">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="h-11 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white outline-none focus:border-red-400 cursor-pointer"
            >
              {BLOOD_GROUPS.map((g) => (
                <option key={g} value={g}>
                  {g === "All" ? "All Blood Groups" : g}
                </option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="h-11 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white outline-none focus:border-red-400 cursor-pointer"
            >
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <button
              onClick={() => setAvailableOnly((p) => !p)}
              className={`h-11 px-4 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${
                availableOnly
                  ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Available only
            </button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="h-11 w-11 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Mobile filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden overflow-hidden mb-5"
            >
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Blood Group
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {BLOOD_GROUPS.map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGroup(g)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selectedGroup === g
                            ? "bg-red-600 border-red-600 text-white"
                            : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Location
                  </p>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white outline-none"
                  >
                    {LOCATIONS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availableOnly}
                      onChange={(e) => setAvailableOnly(e.target.checked)}
                      className="h-4 w-4 accent-red-600"
                    />
                    <span className="text-sm text-zinc-600 dark:text-zinc-300 font-medium">
                      Available only
                    </span>
                  </label>
                  {hasFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-red-500 font-semibold"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results + quick filters */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            <span className="font-bold text-zinc-900 dark:text-white">
              {filtered.length}
            </span>{" "}
            donors found
          </p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-red-500 font-semibold hidden sm:block"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {BLOOD_GROUPS.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap transition-all shrink-0 ${
                selectedGroup === g
                  ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-600/25"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Donor grid */}
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((donor, i) => (
                <DonorCard key={donor.id} donor={donor} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="h-16 w-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-zinc-400" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              No donors found
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
              Try changing your filters or search term.
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
