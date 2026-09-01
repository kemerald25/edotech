"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export function CustomRegistrationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [discipline, setDiscipline] = useState("Software Engineering");
  const [hubLocation, setHubLocation] = useState("Benin City Hub");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Artificial Intelligence",
    "Open Source",
  ]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const interestOptions = [
    "Artificial Intelligence",
    "Civic Technology",
    "Clean Energy & Hardware",
    "Open Source Commons",
    "Paty Sprints",
    "UI/UX Design Systems",
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !discipline) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/members/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          discipline,
          hubLocation,
          portfolioUrl,
          interests: selectedInterests,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Failed to submit membership application.");
      }
    } catch (err: any) {
      setError(err.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-secondary/40 bg-gradient-to-br from-secondary/15 via-white/5 to-background p-8 sm:p-12 text-center space-y-5 shadow-2xl">
        <div className="size-16 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center mx-auto text-green-400">
          <CheckCircle2 className="size-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Welcome to the Guild, {fullName}!
          </h3>
          <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
            Your membership application has been submitted and synced with our community stewards.
          </p>
          <p className="text-xs text-neutral-400 pt-2">
            You will receive orientation materials, Discord guild credentials, and event invitations at{" "}
            <strong className="text-secondary">{email}</strong> within 72 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-6 sm:p-10 space-y-6 shadow-2xl">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-[10px] font-bold uppercase tracking-wider text-secondary mb-2">
          <Sparkles className="size-3" />
          <span>Membership Application</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
          Register Your Free Membership
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400">
          No fees, no paywalls. Complete your profile to connect with mentors and access hubs.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl border border-red-400/30 bg-red-500/10 text-xs text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Osas Iyamu"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="osas@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1.5">
              Phone / WhatsApp
            </label>
            <input
              type="tel"
              placeholder="+234..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1.5">
              Discipline *
            </label>
            <select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 text-xs text-white focus:border-secondary focus:outline-none"
            >
              <option value="Software Engineering">Software Engineering</option>
              <option value="Product Design (UI/UX)">Product Design (UI/UX)</option>
              <option value="Artificial Intelligence / ML">Artificial Intelligence / ML</option>
              <option value="Hardware / IoT">Hardware / IoT</option>
              <option value="Product / Project Management">Product / Project Management</option>
              <option value="Founder / Operator">Founder / Operator</option>
              <option value="Civic Research & Policy">Civic Research & Policy</option>
            </select>
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1.5">
              Primary Hub Location
            </label>
            <select
              value={hubLocation}
              onChange={(e) => setHubLocation(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 text-xs text-white focus:border-secondary focus:outline-none"
            >
              <option value="Benin City Hub">Benin City Hub</option>
              <option value="Auchi Pod">Auchi Pod</option>
              <option value="Ekpoma Pod">Ekpoma Pod</option>
              <option value="Diaspora / Remote">Diaspora / Remote</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1.5">
            Portfolio / GitHub / LinkedIn (Optional)
          </label>
          <input
            type="url"
            placeholder="https://..."
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
          />
        </div>

        {/* Interests Pills Selection */}
        <div className="space-y-2 pt-2">
          <label className="block text-neutral-300 font-semibold uppercase tracking-wider">
            Areas of Interest
          </label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((item) => {
              const selected = selectedInterests.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleInterest(item)}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                    selected
                      ? "border-secondary bg-secondary/15 text-white font-semibold shadow-sm"
                      : "border-white/10 bg-white/5 text-neutral-400 hover:border-white/20"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button & Privacy */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] text-neutral-400">
            <ShieldCheck className="size-4 text-secondary shrink-0" />
            <span>100% Free · Lead synced securely with HubSpot CRM</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-secondary hover:bg-secondary/90 text-sm font-bold text-black shadow-xl shadow-secondary/15 transition hover:scale-[1.01] cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? "Submitting..." : "Complete Registration"}</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
