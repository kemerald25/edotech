"use client";

import { useState, useEffect } from "react";
import {
  RefreshCw,
  Search,
  CheckCircle2,
  Database,
  Building2,
  DollarSign,
  Users,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
} from "lucide-react";
import { HubSpotContact, HubSpotDeal, HubSpotCompany, HubSpotSyncLog } from "@/lib/hubspot";

const ITEMS_PER_PAGE = 25;

export default function HubSpotAdminPage() {
  const [activeTab, setActiveTab] = useState<"contacts" | "deals" | "companies" | "logs">("contacts");
  const [contacts, setContacts] = useState<HubSpotContact[]>([]);
  const [deals, setDeals] = useState<HubSpotDeal[]>([]);
  const [companies, setCompanies] = useState<HubSpotCompany[]>([]);
  const [logs, setLogs] = useState<HubSpotSyncLog[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<HubSpotContact | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loadData = async () => {
    try {
      const res = await fetch("/api/hubspot/sync");
      if (res.ok) {
        const data = await res.json();
        setContacts(data.data.contacts || []);
        setDeals(data.data.deals || []);
        setCompanies(data.data.companies || []);
        setLogs(data.data.logs || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Reset to first page whenever search query or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  const handleTriggerSync = async () => {
    setSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await fetch("/api/hubspot/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entityType: "all" }),
      });
      const data = await res.json();
      if (data.success) {
        setSyncFeedback(`Successfully synchronized all ${data.summary.contactsCount} contacts, ${data.summary.dealsCount} deals, and ${data.summary.companiesCount} companies from HubSpot.`);
        loadData();
      } else {
        setSyncFeedback(`Sync note: ${data.message}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sync error";
      setSyncFeedback(message);
    } finally {
      setSyncing(false);
    }
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.jobTitle && c.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredDeals = deals.filter(
    (d) =>
      d.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.pipeline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.dealStage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.domain && c.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.city && c.city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination calculation
  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE) || 1;
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary mb-2">
            <Database className="size-3.5" />
            <span>HubSpot CRM & Supabase Database Sync (Portal: 27244747)</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
            HubSpot CRM & Services Explorer
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Live synchronization for contacts, pipeline agreements, companies, and community service requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTriggerSync}
            disabled={syncing}
            className="inline-flex items-center gap-2 rounded-xl bg-secondary hover:bg-secondary/90 px-4 py-2.5 text-xs font-bold text-black transition shadow-lg shadow-secondary/10 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`size-3.5 ${syncing ? "animate-spin" : ""}`} />
            <span>{syncing ? "Paginating & Syncing All Records..." : "Sync All HubSpot Data"}</span>
          </button>
        </div>
      </div>

      {syncFeedback && (
        <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-4 flex items-center justify-between gap-4 text-xs text-white">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-secondary shrink-0" />
            <span>{syncFeedback}</span>
          </div>
          <button onClick={() => setSyncFeedback(null)} className="text-xs text-neutral-400 hover:text-white underline">
            Dismiss
          </button>
        </div>
      )}

      {/* KPI Counters */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          onClick={() => setActiveTab("contacts")}
          className={`rounded-3xl border p-6 space-y-2 cursor-pointer transition ${
            activeTab === "contacts" ? "border-secondary bg-secondary/10" : "border-white/10 bg-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs uppercase font-bold tracking-wider">Synced Contacts</span>
            <Users className="size-4 text-secondary" />
          </div>
          <p className="text-3xl font-bold text-white font-heading">{contacts.length}</p>
          <p className="text-[11px] text-neutral-400">Live contacts in Supabase</p>
        </div>

        <div
          onClick={() => setActiveTab("deals")}
          className={`rounded-3xl border p-6 space-y-2 cursor-pointer transition ${
            activeTab === "deals" ? "border-secondary bg-secondary/10" : "border-white/10 bg-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs uppercase font-bold tracking-wider">Services & Deals</span>
            <DollarSign className="size-4 text-secondary" />
          </div>
          <p className="text-3xl font-bold text-white font-heading">
            ${deals.reduce((acc, d) => acc + (d.amount || 0), 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-neutral-400">{deals.length} tracked pipeline agreements</p>
        </div>

        <div
          onClick={() => setActiveTab("companies")}
          className={`rounded-3xl border p-6 space-y-2 cursor-pointer transition ${
            activeTab === "companies" ? "border-secondary bg-secondary/10" : "border-white/10 bg-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs uppercase font-bold tracking-wider">Companies & Hubs</span>
            <Building2 className="size-4 text-secondary" />
          </div>
          <p className="text-3xl font-bold text-white font-heading">{companies.length}</p>
          <p className="text-[11px] text-neutral-400">{companies.length} ecosystem organizations</p>
        </div>

        <div
          onClick={() => setActiveTab("logs")}
          className={`rounded-3xl border p-6 space-y-2 cursor-pointer transition ${
            activeTab === "logs" ? "border-secondary bg-secondary/10" : "border-white/10 bg-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs uppercase font-bold tracking-wider">Database Persistence</span>
            <Database className="size-4 text-secondary" />
          </div>
          <p className="text-3xl font-bold text-green-400 font-heading">Live</p>
          <p className="text-[11px] text-neutral-400">Supabase synchronized</p>
        </div>
      </div>

      {/* Tabs & Search Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          {(["contacts", "deals", "companies", "logs"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedContact(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                activeTab === tab
                  ? "bg-secondary text-black font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-500" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
          />
        </div>
      </div>

      {/* Tab 1: Contacts */}
      {activeTab === "contacts" && (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className={`${selectedContact ? "lg:col-span-7" : "lg:col-span-12"} rounded-3xl border border-white/10 bg-white/5 overflow-hidden flex flex-col justify-between`}>
            {filteredContacts.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <FolderOpen className="size-8 text-neutral-500 mx-auto" />
                <p className="text-sm font-semibold text-white">No Contacts Found</p>
                <p className="text-xs text-neutral-400">Click &quot;Sync All HubSpot Data&quot; to fetch contacts from your HubSpot portal.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-300">
                    <thead className="bg-black/40 text-[11px] uppercase tracking-wider text-neutral-400 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4">Job Title / Role</th>
                        <th className="px-6 py-4">Lifecycle Stage</th>
                        <th className="px-6 py-4">Hub Location</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {paginatedContacts.map((c) => (
                        <tr
                          key={c.id}
                          onClick={() => setSelectedContact(c)}
                          className={`hover:bg-white/[0.04] transition cursor-pointer ${
                            selectedContact?.id === c.id ? "bg-white/[0.06]" : ""
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-bold text-white">
                                {c.firstName} {c.lastName}
                              </p>
                              <p className="text-neutral-400 text-[11px] font-mono">{c.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-neutral-200">{c.jobTitle || "Member"}</p>
                            <p className="text-[11px] text-neutral-400">{c.company || "Independent"}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/20">
                              {c.lifecycleStage}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-neutral-300">{c.hubLocation || "Benin Hub"}</td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-xs text-secondary hover:underline font-semibold">
                              View CRM
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                  <p>
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredContacts.length)} of{" "}
                    <strong className="text-white">{filteredContacts.length}</strong> contacts
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <span className="px-3 py-1 font-mono text-white">
                      Page {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Contact Details Inspector */}
          {selectedContact && (
            <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-white/5 p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                    HubSpot ID: {selectedContact.id}
                  </span>
                  <h3 className="text-xl font-bold text-white font-heading mt-2">
                    {selectedContact.firstName} {selectedContact.lastName}
                  </h3>
                  <p className="text-xs text-neutral-400">{selectedContact.email}</p>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <p className="text-[10px] uppercase text-neutral-400 font-semibold">Phone / WhatsApp</p>
                  <p className="text-white">{selectedContact.phone || "Not specified"}</p>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <p className="text-[10px] uppercase text-neutral-400 font-semibold">Organization</p>
                  <p className="text-white">{selectedContact.company || "Independent Builder"}</p>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <p className="text-[10px] uppercase text-neutral-400 font-semibold">Lead Source</p>
                  <p className="text-white capitalize">{selectedContact.leadSource || "HubSpot CRM"}</p>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <p className="text-[10px] uppercase text-neutral-400 font-semibold">Database Storage</p>
                  <p className="text-green-400 flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5" />
                    <span>Saved permanently in Supabase</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href={`https://app-eu1.hubspot.com/contacts/27244747/contact/${selectedContact.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary/15 hover:bg-secondary/25 border border-secondary/40 text-secondary text-xs font-semibold py-2.5 transition"
                >
                  <span>Open in HubSpot Portal</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Deals & Services */}
      {activeTab === "deals" && (
        <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          {filteredDeals.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <FolderOpen className="size-8 text-neutral-500 mx-auto" />
              <p className="text-sm font-semibold text-white">No Deals or Pipeline Agreements in HubSpot</p>
              <p className="text-xs text-neutral-400">Create deals in HubSpot to track sponsorships and services here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-black/40 text-[11px] uppercase tracking-wider text-neutral-400 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">Service Agreement / Deal Name</th>
                    <th className="px-6 py-4">Pipeline</th>
                    <th className="px-6 py-4">Deal Stage</th>
                    <th className="px-6 py-4">Target Amount</th>
                    <th className="px-6 py-4">Projected Close Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredDeals.map((d) => (
                    <tr key={d.id} className="hover:bg-white/[0.04] transition">
                      <td className="px-6 py-4 font-bold text-white">{d.dealName}</td>
                      <td className="px-6 py-4 text-neutral-300 capitalize">{d.pipeline}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/20">
                          {d.dealStage}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-secondary font-bold font-mono">
                        ${d.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-neutral-400">
                        {d.closeDate ? new Date(d.closeDate).toLocaleDateString() : "Ongoing"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Companies */}
      {activeTab === "companies" && (
        <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          {filteredCompanies.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <FolderOpen className="size-8 text-neutral-500 mx-auto" />
              <p className="text-sm font-semibold text-white">No Companies Synced from HubSpot</p>
              <p className="text-xs text-neutral-400">Company records created in HubSpot will appear here automatically.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-black/40 text-[11px] uppercase tracking-wider text-neutral-400 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">Company / Partner Hub</th>
                    <th className="px-6 py-4">Domain / Website</th>
                    <th className="px-6 py-4">City / Region</th>
                    <th className="px-6 py-4">HubSpot Sync ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredCompanies.map((comp) => (
                    <tr key={comp.id} className="hover:bg-white/[0.04] transition">
                      <td className="px-6 py-4 font-bold text-white">{comp.name}</td>
                      <td className="px-6 py-4 text-secondary">{comp.domain || "—"}</td>
                      <td className="px-6 py-4 text-neutral-300">{comp.city || "Benin City"}</td>
                      <td className="px-6 py-4 font-mono text-neutral-500 text-[11px]">{comp.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Sync Logs */}
      {activeTab === "logs" && (
        <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          {logs.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <FolderOpen className="size-8 text-neutral-500 mx-auto" />
              <p className="text-sm font-semibold text-white">No Sync Logs Yet</p>
              <p className="text-xs text-neutral-400">Click &quot;Sync All HubSpot Data&quot; to perform synchronization.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-black/40 text-[11px] uppercase tracking-wider text-neutral-400 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">Entity</th>
                    <th className="px-6 py-4">Records Pulled</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/[0.04] transition">
                      <td className="px-6 py-4 text-neutral-400">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-semibold text-white capitalize">{log.entityType}</td>
                      <td className="px-6 py-4 font-mono text-secondary">{log.recordsProcessed}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-green-400 font-semibold">
                          <CheckCircle2 className="size-3" />
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
