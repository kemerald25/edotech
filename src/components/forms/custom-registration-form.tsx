"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  AlertCircle,
  UploadCloud,
  Phone,
  Mail,
  User,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/lib/utils";
import Image from "next/image";

interface RegistrationFormProps {
  onSuccess?: () => void;
}

export function CustomRegistrationForm({ onSuccess }: RegistrationFormProps) {
  // Section 1: Personal Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState("");

  // Section 2: Work Details
  const [fieldInTech, setFieldInTech] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [isFounder, setIsFounder] = useState(false);

  // Section 3: Addendum
  const [persona, setPersona] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [expectations, setExpectations] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "members");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setAvatarUrl(data.url);
      } else {
        alert(data.error || "Failed to upload picture");
      }
    } catch {
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const whatsappUrl =
      process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL ||
      siteConfig.whatsappCommunityUrl ||
      "https://chat.whatsapp.com/edotech";

    try {
      const res = await fetch("/api/members/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: `${firstName} ${lastName}`.trim(),
          firstName,
          lastName,
          email,
          phone: phone.trim(),
          bio,
          location,
          birthday,
          gender,
          hobbies,
          discipline: fieldInTech,
          fieldInTech,
          jobTitle: jobTitle || "Community Member",
          companyName,
          companyWebsite,
          companyAddress,
          isFounder,
          persona,
          avatarUrl,
          expectations,
          interests: [fieldInTech, persona, isFounder ? "Founder" : ""].filter(Boolean),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || "Failed to submit membership application.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL ||
    siteConfig.whatsappCommunityUrl ||
    "https://chat.whatsapp.com/FHIMwpEYqrm14RaErHjstK";

  if (isSuccess) {
    return (
      <div className="rounded-3xl border border-secondary/40 bg-gradient-to-br from-secondary/15 via-white/[0.04] to-black p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-fade-in">
        <div className="size-20 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center text-secondary mx-auto shadow-glow">
          <CheckCircle2 className="size-10" />
        </div>

        <div className="space-y-3 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1 text-xs font-semibold text-secondary">
            <Sparkles className="size-3.5" />
            <span>Welcome to the Edo Tech Community</span>
          </div>
          <h3 className="font-heading text-3xl font-bold text-white tracking-tight">
            You&apos;re Officially In, {firstName}!
          </h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Your membership profile is confirmed and synced. Click below to join the active Edo Tech WhatsApp Community immediately!
          </p>
        </div>

        <div className="pt-4 max-w-md mx-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 w-full rounded-2xl bg-secondary hover:bg-secondary/90 py-4 px-6 text-sm font-bold text-black shadow-xl shadow-secondary/20 transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Phone className="size-5 text-black" />
            <span>Join the Edo Tech WhatsApp Community Now</span>
            <ExternalLink className="size-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 text-xs">
      {error && (
        <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 flex items-start gap-3 text-red-200">
          <AlertCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1: PERSONAL DETAILS */}
      {/* ========================================================================= */}
      <div className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
          <div className="size-8 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary">
            <User className="size-4" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-white">Personal Details</h3>
            <p className="text-[11px] text-neutral-400">Tell us about yourself</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
              First Name<span className="text-secondary ml-0.5">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Osas"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
              Last Name<span className="text-secondary ml-0.5">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Iyamu"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
              Phone Number<span className="text-secondary ml-0.5">*</span>
            </label>
            <p className="text-[10px] text-neutral-400 mb-1">WhatsApp number preferred (e.g. +234, +1, +44)</p>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
              <input
                type="tel"
                required
                placeholder="+234 801 234 5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
              Email Address<span className="text-secondary ml-0.5">*</span>
            </label>
            <p className="text-[10px] text-neutral-400 mb-1">Your best email address</p>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
            Personal Bio<span className="text-secondary ml-0.5">*</span>
          </label>
          <p className="text-[10px] text-neutral-400 mb-1">
            Write a short bio to introduce yourself and what you do
          </p>
          <textarea
            required
            rows={2}
            placeholder="Frontend engineer passionate about civic technologies and maker labs in Benin City..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
              Location<span className="text-secondary ml-0.5">*</span>
            </label>
            <select
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-3 text-xs text-white focus:border-secondary focus:outline-none"
            >
              <option value="">Please Select</option>
              <option value="Benin City">Benin City</option>
              <option value="Auchi">Auchi</option>
              <option value="Ekpoma">Ekpoma</option>
              <option value="Uromi">Uromi</option>
              <option value="Irrua">Irrua</option>
              <option value="Okada">Okada</option>
              <option value="Iyamho">Iyamho</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Other Nigerian City">Other Nigerian City</option>
              <option value="Diaspora / International">Diaspora / International</option>
            </select>
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
              Birthday<span className="text-secondary ml-0.5">*</span>
            </label>
            <input
              type="date"
              required
              placeholder="DD-MM-YYYY"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-white focus:border-secondary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
              Gender<span className="text-secondary ml-0.5">*</span>
            </label>
            <select
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-3 text-xs text-white focus:border-secondary focus:outline-none"
            >
              <option value="">Please Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
            Hobbies?
          </label>
          <input
            type="text"
            placeholder="e.g. Chess, Robotics, Open Source, Gaming, Cycling"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: WORK DETAILS */}
      {/* ========================================================================= */}
      <div className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
          <div className="size-8 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary">
            <Briefcase className="size-4" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-white">Work Details</h3>
            <p className="text-[11px] text-neutral-400">Your craft and current affiliation</p>
          </div>
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
            Field in Tech<span className="text-secondary ml-0.5">*</span>
          </label>
          <select
            required
            value={fieldInTech}
            onChange={(e) => setFieldInTech(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-3 text-xs text-white focus:border-secondary focus:outline-none"
          >
            <option value="">Please Select</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Business Development">Business Development</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Data">Data</option>
            <option value="Design">Design</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing & Sales">Marketing & Sales</option>
            <option value="Other">Other</option>
            <option value="Product Management">Product Management</option>
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              Job Title
            </label>
            <p className="text-[10px] text-neutral-400 mb-1.5">
              If you&apos;re a student who&apos;s not working, skip this field and the next three
            </p>
            <input
              type="text"
              placeholder="e.g. Senior Frontend Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
              Company Name
            </label>
            <p className="text-[10px] text-neutral-400 mb-1.5">&nbsp;</p>
            <input
              type="text"
              placeholder="e.g. SolGrid Systems"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
              Company Website
            </label>
            <input
              type="url"
              placeholder="https://company.com"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
              Company Address
            </label>
            <input
              type="text"
              placeholder="e.g. Sapele Road, Benin City"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
            />
          </div>
        </div>

        {/* Founder Checkbox */}
        <div className="pt-2">
          <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-white/10 bg-black/30 hover:bg-black/50 cursor-pointer transition">
            <input
              type="checkbox"
              checked={isFounder}
              onChange={(e) => setIsFounder(e.target.checked)}
              className="size-4 rounded text-secondary focus:ring-secondary accent-secondary"
            />
            <span className="text-xs font-semibold text-neutral-200">
              Tick this box if you are the Founder/Co-founder (I am the Founder/Co-founder)
            </span>
          </label>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: ADDENDUM */}
      {/* ========================================================================= */}
      <div className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
          <div className="size-8 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary">
            <Sparkles className="size-4" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-white">Addendum</h3>
            <p className="text-[11px] text-neutral-400">Persona and expectations</p>
          </div>
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
            Persona<span className="text-secondary ml-0.5">*</span>
          </label>
          <p className="text-[10px] text-neutral-400 mb-1">Which of these categories do you fall into?</p>
          <select
            required
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-3 text-xs text-white focus:border-secondary focus:outline-none"
          >
            <option value="">Please Select</option>
            <option value="Founder: You have launched a startup">Founder: You have launched a startup</option>
            <option value="Investor: You fund startups">Investor: You fund startups</option>
            <option value="Operator: You lead a team at a startup">Operator: You lead a team at a startup</option>
            <option value="Mentor: You train talents and/or founders">Mentor: You train talents and/or founders</option>
            <option value="Talent: You're on the team in a startup">Talent: You&apos;re on the team in a startup</option>
            <option value="Newbie: You're just getting into tech and haven't found a place yet">Newbie: You&apos;re just getting into tech and haven&apos;t found a place yet</option>
          </select>
        </div>

        {/* Picture upload */}
        <div>
          <label className="block text-neutral-300 font-semibold mb-1 uppercase tracking-wider">
            Please upload a picture of yourself
          </label>
          <p className="text-[10px] text-neutral-400 mb-2">
            This is optional, but makes it easy for us to put a face to your name when we celebrate you.
          </p>

          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 hover:bg-white/5 cursor-pointer text-xs font-semibold text-neutral-200 transition">
              <UploadCloud className="size-4 text-secondary" />
              <span>{uploadingImage ? "Uploading to CDN..." : "Choose File"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploadingImage}
              />
            </label>
            <span className="text-[11px] text-neutral-400">
              {avatarUrl ? "✓ Picture uploaded" : "No file chosen"}
            </span>
          </div>

          {avatarUrl && (
            <div className="relative size-16 rounded-2xl overflow-hidden border border-secondary/40 mt-3 shadow-glow">
              <Image src={avatarUrl} alt="Avatar preview" fill className="object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
            Expectations from Edo Tech Community<span className="text-secondary ml-0.5">*</span>
          </label>
          <textarea
            required
            rows={3}
            placeholder="Mentorship, collaboration on local hardware/software projects, finding co-founders, attending workshops..."
            value={expectations}
            onChange={(e) => setExpectations(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 p-3.5 text-sm text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading || uploadingImage}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-secondary hover:bg-secondary/90 py-4 text-sm font-bold text-black shadow-xl shadow-secondary/20 transition transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
        >
          <span>{loading ? "Registering Profile..." : "Submit & Join WhatsApp Community"}</span>
          <ArrowRight className="size-4" />
        </button>
      </div>
    </form>
  );
}
