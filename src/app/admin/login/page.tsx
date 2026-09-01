"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        // Redirect to admin dashboard
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed. Please check your credentials.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-[radial-gradient(circle,_rgba(108,36,201,0.35),_transparent_65%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-[radial-gradient(circle,_rgba(240,177,46,0.15),_transparent_65%)] blur-3xl" />

      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-secondary/15 border border-secondary/40 text-secondary mx-auto shadow-glow">
            <ShieldCheck className="size-8" />
          </div>

          <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
            Edo Tech Staff Portal
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Secure Role-Based Dashboard for Super Admins, Event Managers, and Writers.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl p-8 space-y-6 shadow-2xl">
          {error && (
            <div className="p-4 rounded-2xl border border-red-400/30 bg-red-500/10 flex items-start gap-3 text-xs text-red-200">
              <AlertCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                <input
                  type="email"
                  required
                  placeholder="admin@edotech.community"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1.5">
                Designated Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-secondary hover:bg-secondary/90 py-3.5 text-sm font-bold text-black shadow-xl shadow-secondary/15 transition hover:scale-[1.01] cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Admin"}</span>
              <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-[11px] text-neutral-400">
              Accounts are provisioned by the Super Admin. Contact your lead to request staff credentials.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-neutral-400 hover:text-white transition">
            ← Return to Edo Tech Community Website
          </Link>
        </div>
      </div>
    </div>
  );
}
