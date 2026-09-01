"use client";

import { useState } from "react";
import { teamMembers } from "@/data/site-data";
import { Users, Shield, Code } from "lucide-react";

const roleCategories = [
  { id: "all", label: "All Members", icon: Users },
  { id: "Executives", label: "Executives & Leads", icon: Shield },
  { id: "Workforce", label: "Design & Engineering", icon: Code },
] as const;

export function TeamTabs() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredMembers =
    activeTab === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.department === activeTab);

  return (
    <div className="space-y-8">
      {/* Role Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {roleCategories.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold transition cursor-pointer ${
                isActive
                  ? "bg-secondary text-black shadow-lg shadow-secondary/15"
                  : "bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="size-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Team Members Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <div
            key={member.name}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 transition hover:-translate-y-1 hover:border-secondary/50 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary bg-secondary/10 border border-secondary/20 px-2.5 py-0.5 rounded-full">
                  {member.department}
                </span>
                <div className="size-8 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary text-xs">
                  {member.name.charAt(0)}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-heading">{member.name}</h3>
                <p className="text-xs text-neutral-400 font-medium mt-0.5">{member.role}</p>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                {member.bio}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] text-neutral-500 font-medium">
              Verified Contributor · Edo Tech Community
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
