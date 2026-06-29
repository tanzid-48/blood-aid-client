"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Droplets,
  Eye,
  EyeOff,
  Loader2,
  ChevronDown,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const RULES = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One number", test: (p) => /[0-9]/.test(p) },
];

const inp =
  "w-full h-11 px-4 rounded-xl border border-zinc-800 bg-zinc-900/80 text-sm text-white placeholder-zinc-600 outline-none focus:border-red-900/60 focus:bg-zinc-900 transition-all duration-200";
const lbl = "block text-sm font-medium text-zinc-300 mb-1.5";

function PasswordStrength({ password }) {
  if (!password) return null;
  const passed = RULES.filter((r) => r.test(password)).length;
  const colors = ["bg-red-500", "bg-amber-400", "bg-emerald-500"];
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1.5">
        {RULES.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < passed ? colors[passed - 1] : "bg-zinc-800"}`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {RULES.map((rule, i) => {
          const ok = rule.test(password);
          return (
            <div key={i} className="flex items-center gap-1.5">
              {ok ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
              ) : (
                <XCircle className="h-3 w-3 text-zinc-700 shrink-0" />
              )}
              <span
                className={`text-[11px] ${ok ? "text-emerald-400" : "text-zinc-600"}`}
              >
                {rule.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    bloodGroup: "",
    phone: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const set = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const passStrength = RULES.filter((r) => r.test(form.password)).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Full name is required.");
    if (!form.email) return toast.error("Email is required.");
    if (!form.bloodGroup) return toast.error("Please select a blood group.");
    if (!form.phone.trim()) return toast.error("Phone number is required.");
    if (passStrength < 3)
      return toast.error("Password does not meet all requirements.");

    setLoading(true);
    const { error: err } = await signUp.email({
      name: form.name.trim(),
      email: form.email,
      password: form.password,
      bloodGroup: form.bloodGroup,
      phone: form.phone.trim(),
    });

    if (err) {
      toast.error(err.message || "Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    toast.success("Account created! Welcome to BloodAid 🩸");
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Radial red glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(185,28,28,0.35) 0%, rgba(127,0,0,0.15) 40%, rgba(0,0,0,0) 70%)",
          }}
        />
      </div>

      {/* Logo */}
      <Link href="/" className="relative z-10 flex items-center gap-2.5 mb-8">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/40">
          <Droplets className="h-5 w-5 text-white" fill="currentColor" />
        </div>
        <span className="text-xl font-extrabold text-white tracking-tight">
          BloodAid
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 self-start mt-1.5" />
      </Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-zinc-950/90 border border-zinc-800/50 rounded-2xl px-7 py-8 backdrop-blur-sm shadow-2xl shadow-black/70">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-sm text-zinc-500">
            Join BloodAid and help save lives
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className={lbl}>
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={set}
              placeholder="Enter your name"
              required
              autoComplete="name"
              className={inp}
            />
          </div>

          {/* Email */}
          <div>
            <label className={lbl}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={set}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className={inp}
            />
          </div>

          {/* Blood Group + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>
                Blood group <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={set}
                  required
                  className={`${inp} appearance-none cursor-pointer pr-9`}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {GROUPS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
              </div>
            </div>
            <div>
              <label className={lbl}>
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={set}
                placeholder="01XXXXXXXXX"
                required
                className={inp}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={lbl}>
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={set}
                placeholder="Min 8 chars, A-Z, 0-9"
                required
                autoComplete="new-password"
                className={`${inp} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <PasswordStrength password={form.password} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || passStrength < 3}
            className="w-full h-11 rounded-xl font-semibold text-sm text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
            style={{
              background: "linear-gradient(135deg, #991b1b 0%, #dc2626 100%)",
            }}
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Creating
                account...
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already a donor?{" "}
          <Link
            href="/auth/login"
            className="text-red-500 hover:text-red-400 font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
