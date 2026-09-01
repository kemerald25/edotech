"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  FileText,
  Users,
  Database,
  RefreshCw,
  Plus,
  Shield,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  DollarSign,
} from "lucide-react";
import { useAdmin } from "./layout";

export default function AdminDashboardPage() {
  const { currentRole, can } = useAdmin();
  const [stats, setStats] = useState({
    membersCount: 2680,
    eventsCount: 3,
    rsvpsCount: 316,
    hubspotContacts: 52,
    hubspotDealsValue: 60500,
    blogCount: 3,
    rolesCount: 4,
  });
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const handleManualSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/hubspot/sync", { method: "POST" });
      if (res.ok) {
        setSyncSuccess(true);
        setTimeout(() => setSyncSuccess(false), 4000);
      }
    } catch (e) {
      console.error("Sync failed", e);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary mb-2">
            <Sparkles className="size-3.5" />
            <span>Active as {currentRole.name}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight">
            Ecosystem Command Center
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Real-time insights across self-hosted events, publications, member onboarding, and HubSpot CRM.
          </p>
        </div>

        {/* Quick Action Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {(can("hubspot.trigger_sync") || can("hubspot.view_crm")) && (
            <button
              onClick={handleManualSync}
              disabled={syncing}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-xs font-medium text-white transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`size-3.5 ${syncing ? "animate-spin text-secondary" : "text-neutral-400"}`} />
              <span>{syncing ? "Syncing CRM..." : "Sync with HubSpot"}</span>
            </button>
          )}

          {can("events.create") && (
            <Link
              href="/admin/events"
              className="inline-flex items-center gap-2 rounded-xl bg-secondary hover:bg-secondary/90 px-4 py-2.5 text-xs font-semibold text-black transition shadow-lg shadow-secondary/10"
            >
              <Plus className="size-4" />
              <span>Host New Event</span>
            </Link>
          )}

          {can("blog.create") && !can("events.create") && (
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-2 rounded-xl bg-secondary hover:bg-secondary/90 px-4 py-2.5 text-xs font-semibold text-black transition shadow-lg"
            >
              <Plus className="size-4" />
              <span>Draft New Article</span>
            </Link>
          )}
        </div>
      </div>

      {syncSuccess && (
        <div className="rounded-2xl border border-green-400/30 bg-green-500/10 p-4 flex items-center gap-3 text-sm text-green-200">
          <CheckCircle2 className="size-5 text-green-400 shrink-0" />
          <span>HubSpot CRM sync completed successfully! All contacts, deals, and service records are up to date.</span>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Hosted Events */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Self-Hosted Events
            </span>
            <div className="p-2.5 rounded-2xl bg-secondary/10 text-secondary">
              <Calendar className="size-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-white font-heading">{stats.eventsCount}</p>
            <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
              <span className="text-secondary font-semibold">{stats.rsvpsCount} RSVPs</span>
              <span>across active sessions</span>
            </p>
          </div>
        </div>

        {/* HubSpot Synced Contacts */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              HubSpot CRM Contacts
            </span>
            <div className="p-2.5 rounded-2xl bg-primary/20 text-primary">
              <Database className="size-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-white font-heading">{stats.hubspotContacts}</p>
            <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="size-3 text-green-400" />
              <span>Two-way synced (Portal {process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "27244747"})</span>
            </p>
          </div>
        </div>

        {/* HubSpot Deals / Services Value */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Partnership Pipeline
            </span>
            <div className="p-2.5 rounded-2xl bg-secondary/10 text-secondary">
              <DollarSign className="size-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-white font-heading">
              ${(stats.hubspotDealsValue).toLocaleString()}
            </p>
            <p className="text-xs text-neutral-400 mt-1">Sponsorship & ecosystem grants</p>
          </div>
        </div>

        {/* Members Community */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Verified Members
            </span>
            <div className="p-2.5 rounded-2xl bg-white/10 text-white">
              <Users className="size-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-white font-heading">{stats.membersCount}+</p>
            <p className="text-xs text-neutral-400 mt-1">Benin, Auchi & diaspora</p>
          </div>
        </div>
      </div>

      {/* Two Column Modular Grid */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Active Events & Fast Access */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-heading">Next Flagship Event</h2>
            {can("events.create") && (
              <Link href="/admin/events" className="text-xs text-secondary hover:underline flex items-center gap-1">
                <span>Manage all</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                  Product Studio · Hybrid
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  Paty Innovation Sprint: Civic AI & Smart Transit
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-neutral-400">Scheduled for</p>
                <p className="text-sm font-semibold text-white">Oct 18–19, 2026</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                <p className="text-neutral-400">Total RSVPs</p>
                <p className="text-lg font-bold text-white mt-0.5">84 / 200</p>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                <p className="text-neutral-400">Location</p>
                <p className="text-sm font-medium text-white mt-0.5">Edo Innovation Hub</p>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 col-span-2 sm:col-span-1">
                <p className="text-neutral-400">HubSpot Sync</p>
                <p className="text-sm font-medium text-green-400 mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="size-3.5" />
                  Synced
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-neutral-400">Direct registration is live on homepage & programs page.</span>
              <Link
                href="/programs"
                target="_blank"
                className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
              >
                <span>View Public Page</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: HubSpot CRM Live Status */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-heading">HubSpot CRM Integration</h2>
            <Link href="/admin/hubspot" className="text-xs text-secondary hover:underline flex items-center gap-1">
              <span>Explore CRM</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="size-3 rounded-full bg-green-400 animate-pulse" />
              <div>
                <p className="text-sm font-semibold text-white">HubSpot API Connected</p>
                <p className="text-xs text-neutral-400">Portal ID: 27244747 · EU1 Region</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-neutral-400">Membership Lead Form</span>
                <span className="text-white font-medium">5c746a65-8833-4de3...</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-neutral-400">Active Deals / Services</span>
                <span className="text-secondary font-medium">4 Contracts Tracked</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-neutral-400">Last Two-Way Sync</span>
                <span className="text-white font-medium">Just now</span>
              </div>
            </div>

            <Link
              href="/admin/hubspot"
              className="block w-full text-center py-2.5 rounded-xl border border-secondary/30 bg-secondary/10 hover:bg-secondary/20 text-xs font-semibold text-secondary transition"
            >
              Open Full CRM Explorer (Contacts, Deals, Companies)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
