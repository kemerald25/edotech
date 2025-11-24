"use client";

import { teamMembers } from "@/data/site-data";
import { TeamMember } from "@/types/content";
import { useMemo, useState } from "react";
import { X } from "lucide-react";

const departments = ["All", ...new Set(teamMembers.map((m) => m.department))];

export function TeamGrid() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const filtered = useMemo(() => {
    if (filter === "All") return teamMembers;
    return teamMembers.filter((member) => member.department === filter);
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {departments.map((department) => (
          <button
            key={department}
            onClick={() => setFilter(department)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              filter === department
                ? "border-secondary/60 bg-secondary/10 text-secondary"
                : "border-white/10 bg-transparent text-white"
            }`}
          >
            {department}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((member) => (
          <button
            key={member.name}
            onClick={() => setSelected(member)}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-secondary/60"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-secondary/80">
              {member.department}
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{member.name}</h3>
            <p className="text-sm text-neutral-400">{member.role}</p>
            <p className="mt-4 line-clamp-2 text-neutral-300">{member.bio}</p>
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-background p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-secondary/80">
                  {selected.department}
                </p>
                <h3 className="mt-2 text-3xl font-semibold">{selected.name}</h3>
                <p className="text-sm text-neutral-400">{selected.role}</p>
              </div>
              <button
                className="rounded-full border border-white/10 p-2"
                onClick={() => setSelected(null)}
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-6 text-neutral-200">{selected.bio}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-secondary">
              {selected.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-secondary/50 px-4 py-2"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

