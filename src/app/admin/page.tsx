"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Database,
  Users,
  ArrowRight,
  Plus,
  Sparkles,
} from "lucide-react";
import { getAllEvents } from "@/lib/data-store";
import { useAdmin } from "./layout";

export default function AdminDashboardPage() {
  const { currentUser, can } = useAdmin();
  const [events] = useState(() => getAllEvents());

  const upcomingEvent = events.find((e) => e.status === "published");

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-secondary/15 via-white/5 to-background p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
            <Sparkles className="size-3.5" />
            <span>Role: {currentUser.assignedRoles.join(", ")}</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Welcome back, {currentUser.name}
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Monitor community growth, manage self-hosted innovation sprints, draft research publications, and explore HubSpot CRM intelligence.
          </p>
        </div>
      </div>

      {/* Quick Action Matrix based on RBAC */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {can("events.create") && (
          <Link
            href="/admin/events"
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 transition hover:-translate-y-1 hover:border-secondary/50 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="size-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Calendar className="size-5" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">Host New Event</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Schedule physical, virtual, or hybrid sessions.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-secondary font-semibold">
              <span>Open Event Studio</span>
              <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
            </div>
          </Link>
        )}

        {can("hubspot.view_crm") && (
          <Link
            href="/admin/hubspot"
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 transition hover:-translate-y-1 hover:border-secondary/50 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="size-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Database className="size-5" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">HubSpot CRM</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Explore synced contacts, partner deals, and forms.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-secondary font-semibold">
              <span>Explore CRM</span>
              <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
            </div>
          </Link>
        )}

        {can("roles.manage") && (
          <Link
            href="/admin/roles"
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 transition hover:-translate-y-1 hover:border-secondary/50 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="size-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Users className="size-5" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">Roles & Permissions</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Create custom roles and configure capabilities.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-secondary font-semibold">
              <span>Manage Roles</span>
              <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
            </div>
          </Link>
        )}
      </div>

      {/* Flagship Event Snapshot */}
      {upcomingEvent && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full">
              Flagship Event
            </span>
            <Link href="/admin/events" className="text-xs text-secondary hover:underline font-semibold flex items-center gap-1">
              <span>View all events</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>
          <h3 className="text-2xl font-bold text-white font-heading">{upcomingEvent.title}</h3>
          <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">{upcomingEvent.description}</p>
        </div>
      )}
    </div>
  );
}
