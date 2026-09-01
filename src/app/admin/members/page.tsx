"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  CheckCircle2,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { MembershipRecord, getAllMemberships } from "@/lib/data-store";

export default function MembersAdminPage() {
  const [members, setMembers] = useState<MembershipRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMembers(getAllMemberships());
  }, []);

  const filtered = members.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.fullName.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.discipline.toLowerCase().includes(q) ||
      m.hubLocation.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary mb-2">
          <Users className="size-3.5" />
          <span>Membership Guild Directory</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
          Members & Onboarding Applications
        </h1>
        <p className="text-neutral-400 text-sm mt-1">
          Review community membership applications, verified skills, and HubSpot lead synchronization.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name, email, discipline, or hub..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
          />
        </div>
        <p className="text-xs text-neutral-400">
          Showing {filtered.length} of {members.length} members
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-black/40 text-[11px] uppercase tracking-wider text-neutral-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Discipline</th>
                <th className="px-6 py-4">Hub Location</th>
                <th className="px-6 py-4">Interests / Focus</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">HubSpot Sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary text-xs">
                        {m.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{m.fullName}</p>
                        <p className="text-neutral-400 text-[11px]">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-white">{m.discipline}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-neutral-300">
                      <MapPin className="size-3.5 text-secondary" />
                      {m.hubLocation}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {m.interests.map((tag) => (
                        <span key={tag} className="text-[10px] bg-black/40 border border-white/10 px-2 py-0.5 rounded text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/30">
                      {m.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1 text-green-400 font-semibold text-[11px]">
                      <CheckCircle2 className="size-3.5" />
                      Synced
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
