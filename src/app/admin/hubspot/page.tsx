"use client";

import { useState, useEffect } from "react";
import {
  Database,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  DollarSign,
  Building2,
  Users,
  FileText,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowUpRight,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";
import {
  HubspotContact,
  HubspotDeal,
  HubspotCompany,
  HubspotSyncLog,
  HUBSPOT_PORTAL_ID,
} from "@/lib/hubspot";
import { useAdmin } from "../layout";

export default function HubspotCRMPage() {
  const { can } = useAdmin();
  const [activeTab, setActiveTab] = useState<"contacts" | "deals" | "companies" | "logs">("contacts");
  const [contacts, setContacts] = useState<HubspotContact[]>([]);
  const [deals, setDeals] = useState<HubspotDeal[]>([]);
  const [companies, setCompanies] = useState<HubspotCompany[]>([]);
  const [logs, setLogs] = useState<HubspotSyncLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<HubspotContact | null>(null);

  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const loadHubspotData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/hubspot/sync");
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setContacts(json.data.contacts || []);
          setDeals(json.data.deals || []);
          setCompanies(json.data.companies || []);
          setLogs(json.data.logs || []);
        }
      }
    } catch (err) {
      console.error("Failed to load HubSpot data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHubspotData();
  }, []);

  const handleRunSync = async () => {
    setSyncing(true);
    setSyncNotice(null);
    try {
      const res = await fetch("/api/hubspot/sync", { method: "POST" });
      if (res.ok) {
        const json = await res.json();
        setContacts(json.data.contacts);
        setDeals(json.data.deals);
        setCompanies(json.data.companies);
        setLogs(json.data.logs);
        setSyncNotice("Full account sync completed! All HubSpot contacts, deals, and companies refreshed.");
        setTimeout(() => setSyncNotice(null), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSyncing(false);
    }
  };

  const filteredContacts = contacts.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.firstname?.toLowerCase().includes(q) ||
      c.lastname?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.company?.toLowerCase().includes(q) ||
      c.jobtitle?.toLowerCase().includes(q)
    );
  });

  const totalDealsValue = deals.reduce((acc, d) => acc + (d.amount || 0), 0);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary mb-2">
            <Database className="size-3.5" />
            <span>HubSpot CRM Integration · Portal {HUBSPOT_PORTAL_ID}</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
            HubSpot CRM Data Explorer
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Real-time synchronization of all contacts, deals, service engagements, and organizations from your HubSpot account.
          </p>
        </div>

        {can("hubspot.trigger_sync") && (
          <button
            onClick={handleRunSync}
            disabled={syncing}
            className="inline-flex items-center gap-2 rounded-xl bg-secondary hover:bg-secondary/90 px-4 py-2.5 text-xs font-bold text-black transition shadow-lg shadow-secondary/10 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`size-4 ${syncing ? "animate-spin" : ""}`} />
            <span>{syncing ? "Running Full Sync..." : "Sync All HubSpot Data"}</span>
          </button>
        )}
      </div>

      {syncNotice && (
        <div className="rounded-2xl border border-green-400/30 bg-green-500/10 p-4 flex items-center gap-3 text-sm text-green-200">
          <CheckCircle2 className="size-5 text-green-400 shrink-0" />
          <span>{syncNotice}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/10">
        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            activeTab === "contacts"
              ? "bg-secondary text-black"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Users className="size-4" />
          <span>Contacts ({contacts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("deals")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            activeTab === "deals"
              ? "bg-secondary text-black"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <DollarSign className="size-4" />
          <span>Services & Deals ({deals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("companies")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            activeTab === "companies"
              ? "bg-secondary text-black"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Building2 className="size-4" />
          <span>Companies & Hubs ({companies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("logs")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            activeTab === "logs"
              ? "bg-secondary text-black"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Clock className="size-4" />
          <span>Sync Audit Logs ({logs.length})</span>
        </button>
      </div>

      {/* TAB 1: CONTACTS EXPLORER */}
      {activeTab === "contacts" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by name, email, company, or job title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
              />
            </div>
            <p className="text-xs text-neutral-400">
              Showing {filteredContacts.length} of {contacts.length} synced records
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-black/40 text-[11px] uppercase tracking-wider text-neutral-400 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Job / Discipline</th>
                    <th className="px-6 py-4">Company / Hub</th>
                    <th className="px-6 py-4">Lifecycle Stage</th>
                    <th className="px-6 py-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredContacts.map((c) => (
                    <tr key={c.id} className="hover:bg-white/[0.02] transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-white">
                            {c.firstname} {c.lastname}
                          </p>
                          <p className="text-neutral-400 text-[11px]">{c.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-neutral-300">{c.jobtitle || "Community Member"}</td>
                      <td className="px-6 py-4 text-neutral-300">{c.company || "Edo Tech"}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/30">
                          {c.lifecyclestage || "lead"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedContact(c)}
                          className="text-xs text-secondary hover:underline font-medium cursor-pointer"
                        >
                          View Properties
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEALS & SERVICES PIPELINE */}
      {activeTab === "deals" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-secondary/10 via-primary/10 to-transparent p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-secondary font-semibold">Total Pipeline Value</p>
              <p className="text-3xl font-bold text-white mt-1">${totalDealsValue.toLocaleString()} USD</p>
              <p className="text-xs text-neutral-400 mt-1">Across 4 active partnership service contracts and sponsorship pools</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-secondary bg-secondary/10 border border-secondary/30 px-2.5 py-0.5 rounded-full">
                      {deal.serviceType}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2 font-heading">{deal.dealname}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">Partner: {deal.partnerOrg}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-secondary">
                      ${deal.amount.toLocaleString()} {deal.currency}
                    </p>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-green-400">
                      {deal.dealstage}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                  <span>HubSpot Deal ID: <code>{deal.id}</code></span>
                  <span className="text-white font-medium">Stage: {deal.dealstage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COMPANIES & HUBS */}
      {activeTab === "companies" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((comp) => (
            <div
              key={comp.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-secondary/10 text-secondary w-fit">
                  <Building2 className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">{comp.name}</h3>
                <p className="text-xs text-secondary font-medium">{comp.industry}</p>
                <p className="text-xs text-neutral-400 leading-relaxed">{comp.description}</p>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs text-neutral-400 space-y-1">
                <p>City: {comp.city}</p>
                {comp.domain && (
                  <p className="text-secondary font-medium truncate">
                    <a href={`https://${comp.domain}`} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                      {comp.domain}
                      <ExternalLink className="size-3" />
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: SYNC AUDIT LOGS */}
      {activeTab === "logs" && (
        <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-black/40 text-[11px] uppercase tracking-wider text-neutral-400 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Sync Type</th>
                  <th className="px-6 py-4">Records Processed</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Audit Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4 text-neutral-400 font-mono">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white uppercase">{log.syncType}</td>
                    <td className="px-6 py-4 font-bold text-secondary">{log.recordsSynced} / {log.recordsProcessed}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-green-400 font-bold uppercase text-[10px]">
                        <CheckCircle2 className="size-3.5" />
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-300">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Property Inspector Slide-out Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="rounded-3xl border border-white/10 bg-[#0E121E] w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-secondary/20 flex items-center justify-center font-bold text-secondary">
                  {selectedContact.firstname?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {selectedContact.firstname} {selectedContact.lastname}
                  </h3>
                  <p className="text-xs text-neutral-400">{selectedContact.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-1.5 rounded-xl bg-white/5 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <p className="text-neutral-400 font-medium">Job Title & Role</p>
                <p className="text-white font-semibold text-sm">{selectedContact.jobtitle || "Community Member"}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <p className="text-neutral-400 font-medium">Company</p>
                  <p className="text-white font-semibold">{selectedContact.company || "Edo Tech"}</p>
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <p className="text-neutral-400 font-medium">Hub Location</p>
                  <p className="text-white font-semibold">{selectedContact.hubLocation || "Benin City Hub"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <p className="text-neutral-400 font-medium">Phone</p>
                  <p className="text-white font-semibold">{selectedContact.phone || "N/A"}</p>
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <p className="text-neutral-400 font-medium">Lifecycle Stage</p>
                  <p className="text-secondary font-bold uppercase">{selectedContact.lifecyclestage || "lead"}</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <p className="text-neutral-400 font-medium">HubSpot Sync ID</p>
                <p className="text-neutral-300 font-mono text-[11px]">{selectedContact.id}</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedContact(null)}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
