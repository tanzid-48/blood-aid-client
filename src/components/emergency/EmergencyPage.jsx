"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Droplets,
  AlertCircle,
  User,
  Hospital,
  Phone,
  Clock,
  Heart,
  ChevronDown,
  Loader2,
} from "lucide-react";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const DISTRICTS = [
  "Bogura",
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Mymensingh",
  "Rangpur",
  "Comilla",
  "Narayanganj",
  "Gazipur",
  "Other",
];
const CONDITIONS = ["Stable", "Critical", "Very Critical"];
const REASONS = [
  "Surgery",
  "Accident / Trauma",
  "Disease",
  "Cancer / Chemotherapy",
  "Childbirth",
  "Thalassemia",
  "Anemia",
  "Organ Transplant",
  "Other",
];
const RELATIONS = [
  "Self",
  "Parent",
  "Sibling",
  "Spouse",
  "Child",
  "Relative",
  "Friend",
  "Other",
];
const URGENCY = ["Normal", "Urgent", "Emergency"];

const selectCls =
  "w-full h-11 px-4 pr-9 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white outline-none focus:border-red-400 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all appearance-none cursor-pointer";
const inputCls =
  "w-full h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-red-400 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all";

const Label = ({ children, required }) => (
  <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
    {children}
    {required && <span className="text-red-500 ml-0.5">*</span>}
  </label>
);

const SelectWrapper = ({ children }) => (
  <div className="relative">
    {children}
    <ChevronDown
      size={14}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
    />
  </div>
);

const urgencyConfig = {
  Normal: {
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-900/40",
  },
  Urgent: {
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-900/40",
  },
  Emergency: {
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-900/40",
  },
};

function EmergencyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    // Patient
    patientName: "",
    bloodGroup: searchParams.get("bloodGroup") || "",
    quantity: "1",
    condition: "",
    reason: "",
    relation: "",
    // Hospital
    hospitalName: "",
    district: "",
    neededBy: "",
    // Contact
    yourName: "",
    yourPhone: "",
    urgency: "Urgent",
  });

  const [loading, setLoading] = useState(false);

  const set = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !form.patientName ||
      !form.bloodGroup ||
      !form.condition ||
      !form.reason ||
      !form.relation ||
      !form.hospitalName ||
      !form.district ||
      !form.neededBy ||
      !form.yourName ||
      !form.yourPhone
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (form.yourPhone.length < 11) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    try {
      // TODO: POST /api/requests (backend connect করলে)
      await new Promise((r) => setTimeout(r, 1500)); // mock delay
      toast.success(
        "Request submitted! Our volunteers will contact you shortly. 🩸",
      );
      router.push("/");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selected = urgencyConfig[form.urgency];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a]">
      {/* Header */}
      <div className="bg-white dark:bg-black border-b border-zinc-200 dark:border-white/8">
        <div className="max-w-11/12 mx-auto px-6 lg:px-12 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Emergency Request
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
              Request Blood Now
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl">
              Fill out the form below. Our volunteers will review your request
              and contact you as soon as possible.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-11/12 mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form — 2/3 width */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* ── Patient Info ── */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-7">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="h-9 w-9 rounded-xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center shrink-0">
                    <User
                      size={16}
                      className="text-red-600 dark:text-red-500"
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                      Patient Information
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Details about the patient who needs blood
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Patient name */}
                  <div className="sm:col-span-2">
                    <Label required>Patient Name</Label>
                    <input
                      name="patientName"
                      type="text"
                      value={form.patientName}
                      onChange={set}
                      placeholder="Full name of patient"
                      className={inputCls}
                    />
                  </div>

                  {/* Blood group */}
                  <div>
                    <Label required>Blood Group Needed</Label>
                    <SelectWrapper>
                      <select
                        name="bloodGroup"
                        value={form.bloodGroup}
                        onChange={set}
                        className={selectCls}
                      >
                        <option value="" disabled>
                          Select blood group
                        </option>
                        {BLOOD_GROUPS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </SelectWrapper>
                  </div>

                  {/* Quantity */}
                  <div>
                    <Label required>Quantity (bags)</Label>
                    <SelectWrapper>
                      <select
                        name="quantity"
                        value={form.quantity}
                        onChange={set}
                        className={selectCls}
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (n) => (
                            <option key={n} value={n}>
                              {n} bag{n > 1 ? "s" : ""}
                            </option>
                          ),
                        )}
                      </select>
                    </SelectWrapper>
                  </div>

                  {/* Patient condition */}
                  <div>
                    <Label required>Patient Condition</Label>
                    <SelectWrapper>
                      <select
                        name="condition"
                        value={form.condition}
                        onChange={set}
                        className={selectCls}
                      >
                        <option value="" disabled>
                          Select condition
                        </option>
                        {CONDITIONS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </SelectWrapper>
                  </div>

                  {/* Reason */}
                  <div>
                    <Label required>Why Blood is Needed</Label>
                    <SelectWrapper>
                      <select
                        name="reason"
                        value={form.reason}
                        onChange={set}
                        className={selectCls}
                      >
                        <option value="" disabled>
                          Select reason
                        </option>
                        {REASONS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </SelectWrapper>
                  </div>

                  {/* Relation */}
                  <div className="sm:col-span-2">
                    <Label required>Your Relation with Patient</Label>
                    <div className="flex flex-wrap gap-2">
                      {RELATIONS.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() =>
                            setForm((p) => ({ ...p, relation: r }))
                          }
                          className={`px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                            form.relation === r
                              ? "bg-red-600 border-red-600 text-white"
                              : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Hospital Info ── */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-7">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="h-9 w-9 rounded-xl bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center shrink-0">
                    <Hospital
                      size={16}
                      className="text-blue-600 dark:text-blue-500"
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                      Hospital Information
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Where the blood is needed
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label required>Hospital Name</Label>
                    <input
                      name="hospitalName"
                      type="text"
                      value={form.hospitalName}
                      onChange={set}
                      placeholder="e.g. TMSS Medical College Hospital,Thengamara,Bogura Sodor,Bogura"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <Label required>District / Location</Label>
                    <SelectWrapper>
                      <select
                        name="district"
                        value={form.district}
                        onChange={set}
                        className={selectCls}
                      >
                        <option value="" disabled>
                          Select district
                        </option>
                        {DISTRICTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </SelectWrapper>
                  </div>
                  <div>
                    <Label required>Blood Needed By</Label>
                    <input
                      name="neededBy"
                      type="datetime-local"
                      value={form.neededBy}
                      onChange={set}
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>

              {/* ── Contact Info ── */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-7">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center shrink-0">
                    <Phone
                      size={16}
                      className="text-emerald-600 dark:text-emerald-500"
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                      Contact Information
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      How volunteers can reach you
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label required>Your Name</Label>
                    <input
                      name="yourName"
                      type="text"
                      value={form.yourName}
                      onChange={set}
                      placeholder="Your full name"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <Label required>Your Phone Number</Label>
                    <input
                      name="yourPhone"
                      type="tel"
                      value={form.yourPhone}
                      onChange={set}
                      placeholder="01XXXXXXXXX"
                      className={inputCls}
                    />
                  </div>

                  {/* Urgency */}
                  <div className="sm:col-span-2">
                    <Label required>Urgency Level</Label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {URGENCY.map((u) => {
                        const cfg = urgencyConfig[u];
                        const isSelected = form.urgency === u;
                        return (
                          <button
                            key={u}
                            type="button"
                            onClick={() =>
                              setForm((p) => ({ ...p, urgency: u }))
                            }
                            className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all ${
                              isSelected
                                ? `${cfg.bg} ${cfg.border} ${cfg.color}`
                                : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600"
                            }`}
                          >
                            {u === "Normal" && "🟢 "}
                            {u === "Urgent" && "🟡 "}
                            {u === "Emergency" && "🔴 "}
                            {u}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-500 active:scale-[0.98] shadow-lg shadow-red-600/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting
                    Request...
                  </>
                ) : (
                  <>
                    <Droplets size={15} fill="currentColor" /> Submit Blood
                    Request
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Sidebar — 1/3 width */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Urgency preview */}
            <div
              className={`rounded-2xl border p-5 ${selected.bg} ${selected.border}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={16} className={selected.color} />
                <span className={`text-sm font-bold ${selected.color}`}>
                  {form.urgency} Request
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {form.urgency === "Emergency" &&
                  "Our volunteers will be notified immediately. Expected response: within 15 minutes."}
                {form.urgency === "Urgent" &&
                  "Volunteers will be alerted. Expected response: within 1-2 hours."}
                {form.urgency === "Normal" &&
                  "Your request will be processed. Expected response: within 24 hours."}
              </p>
            </div>

            {/* What happens next */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock size={15} className="text-red-500" />
                What happens next?
              </h3>
              <div className="space-y-3">
                {[
                  "Your request is reviewed by our team",
                  "A volunteer is assigned to your case",
                  "Volunteer finds a matching donor",
                  "Donor contacts you directly",
                  "Blood donation is completed",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-black text-red-600 dark:text-red-400">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Important note */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-5">
              <div className="flex items-start gap-2">
                <AlertCircle
                  size={15}
                  className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0"
                />
                <div>
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
                    Important
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-500 leading-relaxed">
                    For life-threatening emergencies, please also call emergency
                    services (999) immediately. BloodAid is not a substitute for
                    emergency medical care.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact BloodAid directly */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                <Heart size={15} className="text-red-500" fill="currentColor" />
                Need direct help?
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                Call our helpline directly during emergencies.
              </p>
              <a
                href="tel:+8801700000000"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all"
              >
                <Phone size={14} />
                +880 1700-000000
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function EmergencyPage() {
  return (
    <Suspense>
      <EmergencyForm />
    </Suspense>
  );
}
