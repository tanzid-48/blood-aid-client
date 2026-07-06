"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Droplets, Eye, EyeOff, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";


const GoogleIcon = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const inp =
  "w-full h-11 px-4 rounded-xl border border-zinc-700/80 bg-zinc-800/60 text-sm text-white placeholder-zinc-500 outline-none focus:border-red-500/70 focus:bg-zinc-800 focus:ring-2 focus:ring-red-500/10 transition-all duration-200";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gLoad, setGLoad] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const set = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleGoogle = async () => {
    setGLoad(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: from || "/dashboard",
      });
    } catch {
      setError("Google sign-in failed.");
      setGLoad(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const { data, error: err } = await signIn.email({
        email: form.email,
        password: form.password,
      });

      if (err) {
        setError(
          err.status === 401
            ? "Invalid email or password."
            : (err.message ?? "Login failed."),
        );
        return;
      }

      toast.success("Welcome back! 🩸");

      if (from) {
        router.push(from);
        router.refresh();
        return;
      }

      const role = data?.user?.role;

      setTimeout(() => {
        if (role === "admin") {
          router.push("/admin");
        } else if (role === "volunteer") {
          router.push("/volunteer");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      }, 300);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-10">
      {/* Radial red glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(127,29,29,0.35) 0%, rgba(10,10,10,0) 65%)",
          }}
        />
      </div>
      {/* bg glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-red-600/6 blur-3xl" />
      </div>

      <div
        className="relative w-full max-w-[450px] 
      "
      >
        {/* Card */}
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/60 rounded-2xl shadow-2xl shadow-black/50 px-8 py-9">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2.5 mb-8 "
          >
            <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/30">
              <Droplets className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              Blood<span className="text-red-500">Aid</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-white mb-1.5">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-500">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 text-sm text-red-400 bg-red-950/30 border border-red-900/40 rounded-xl px-4 py-3">
              <XCircle size={14} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Email
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-red-500 hover:text-red-400 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={set}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className={`${inp} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShow((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 accent-red-600 cursor-pointer"
              />
              <span className="text-sm text-zinc-400">Remember me</span>
            </label>

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading || gLoad}
                className="w-full h-11 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-500 active:scale-[0.98] shadow-lg shadow-red-600/20 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Signing in...
                  </>
                ) : (
                  "LOGIN"
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs text-zinc-600 font-medium whitespace-nowrap">
              or continue with
            </span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={gLoad || loading}
            className="w-full h-11 rounded-xl border border-zinc-700/80 bg-zinc-800/40 hover:bg-zinc-800 hover:border-zinc-600 flex items-center justify-center gap-2.5 text-sm font-medium text-zinc-300 hover:text-white transition-all duration-200 disabled:opacity-40 active:scale-[0.98]"
          >
            {gLoad ? (
              <Loader2 size={15} className="animate-spin text-zinc-400" />
            ) : (
              <GoogleIcon />
            )}
            Continue with Google
          </button>

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-zinc-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-red-500 font-semibold hover:text-red-400 transition-colors"
              >
                Sign up
              </Link>
            </p>
            <p className="text-xs text-zinc-700">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="underline hover:text-zinc-500 transition-colors"
              >
                Terms
              </Link>
              {" & "}
              <Link
                href="/privacy"
                className="underline hover:text-zinc-500 transition-colors"
              >
                Privacy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
