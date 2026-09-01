"use client";

import { useState } from "react";
import { PlatformEvent } from "@/lib/data-store";
import { Calendar, MapPin, CheckCircle2, ShieldCheck, X, Sparkles } from "lucide-react";

interface EventRegistrationModalProps {
  event: PlatformEvent;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EventRegistrationModal({
  event,
  isOpen,
  onClose,
  onSuccess,
}: EventRegistrationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Developer / Engineer");
  const [attendanceMode, setAttendanceMode] = useState<"in-person" | "virtual">("in-person");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          name,
          email,
          phone,
          role,
          attendanceMode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || "Failed to register. Please try again.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0B0E17] p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden">
        {/* Top Glow Accent */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-48 rounded-full bg-secondary/20 blur-3xl" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/10 border border-secondary/30 text-[10px] font-bold uppercase tracking-wider text-secondary mb-2">
              <Sparkles className="size-3" />
              <span>Event RSVP</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading leading-snug">
              {event.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-2">
              <span className="flex items-center gap-1 text-neutral-200">
                <Calendar className="size-3.5 text-secondary" />
                {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5 text-secondary" />
                {event.venueName}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4 relative z-10">
            <div className="size-16 rounded-full bg-green-500/10 border border-green-400/30 flex items-center justify-center mx-auto text-green-400">
              <CheckCircle2 className="size-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-2xl font-bold text-white font-heading">RSVP Confirmed!</h4>
              <p className="text-sm text-neutral-300">
                You&apos;re registered for <strong className="text-white">{event.title}</strong>.
              </p>
              <p className="text-xs text-neutral-400 pt-2">
                Orientation details and calendar invite have been sent to <span className="text-secondary">{email}</span>.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-black font-bold text-xs shadow-lg transition"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10 text-xs">
            {error && (
              <div className="p-3 rounded-xl border border-red-400/30 bg-red-500/10 text-red-200 text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Osas Iyamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white focus:border-secondary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="osas@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white focus:border-secondary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                  Phone (WhatsApp)
                </label>
                <input
                  type="tel"
                  placeholder="+234..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                  Discipline / Track
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-secondary focus:outline-none"
                >
                  <option value="Developer / Engineer">Developer / Engineer</option>
                  <option value="Product Designer">Product Designer</option>
                  <option value="Founder / Operator">Founder / Operator</option>
                  <option value="Researcher / Policy">Researcher / Policy</option>
                  <option value="Student">Student</option>
                </select>
              </div>
            </div>

            {event.locationType === "hybrid" && (
              <div>
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1.5">
                  How will you attend?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendanceMode("in-person")}
                    className={`p-2.5 rounded-xl border text-center font-medium transition cursor-pointer ${
                      attendanceMode === "in-person"
                        ? "border-secondary bg-secondary/15 text-white font-semibold"
                        : "border-white/10 bg-white/5 text-neutral-400"
                    }`}
                  >
                    In-Person (Hub)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendanceMode("virtual")}
                    className={`p-2.5 rounded-xl border text-center font-medium transition cursor-pointer ${
                      attendanceMode === "virtual"
                        ? "border-secondary bg-secondary/15 text-white font-semibold"
                        : "border-white/10 bg-white/5 text-neutral-400"
                    }`}
                  >
                    Virtual Livestream
                  </button>
                </div>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                <ShieldCheck className="size-3.5 text-secondary" />
                <span>100% Free · Lead synced with HubSpot</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-xs font-bold text-black shadow-lg shadow-secondary/10 transition cursor-pointer disabled:opacity-50"
              >
                {loading ? "Confirming..." : "Confirm RSVP"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
