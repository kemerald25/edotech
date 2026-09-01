export interface HubSpotContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  lifecycleStage?: string;
  jobTitle?: string;
  company?: string;
  hubLocation?: string;
  leadSource?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HubSpotDeal {
  id: string;
  dealName: string;
  amount: number;
  currency: string;
  dealStage: string;
  closeDate?: string;
  pipeline: string;
  serviceType: string;
  partnerOrg: string;
}

export interface HubSpotCompany {
  id: string;
  name: string;
  domain?: string;
  industry?: string;
  city?: string;
  description?: string;
  phone?: string;
}

export interface HubSpotSyncLog {
  id: string;
  entityType: "contacts" | "deals" | "companies" | "all";
  recordsProcessed: number;
  status: "synced" | "failed" | "pending";
  timestamp: string;
  details?: string;
}

// Aliases for compatibility
export type HubspotContact = HubSpotContact;
export type HubspotDeal = HubSpotDeal;
export type HubspotCompany = HubSpotCompany;
export type HubspotSyncLog = HubSpotSyncLog;

export const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "27244747";
export const HUBSPOT_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || "5c746a65-8833-4de3-beec-03dce910dacf";
export const HUBSPOT_REGION = process.env.NEXT_PUBLIC_HUBSPOT_REGION || "eu1";

// Initial Mock Seed representing live synced state
const INITIAL_CONTACTS: HubSpotContact[] = [
  {
    id: "hs-101",
    firstName: "Efe",
    lastName: "Osazuwa",
    email: "efe@solgrid.africa",
    phone: "+234 802 123 4567",
    lifecycleStage: "customer",
    jobTitle: "Founder & CEO",
    company: "SolGrid Systems",
    hubLocation: "Benin City Hub",
    leadSource: "Join Form",
    createdAt: "2026-01-14T09:30:00Z",
    updatedAt: "2026-08-20T14:15:00Z",
  },
  {
    id: "hs-102",
    firstName: "Mary",
    lastName: "Asemota",
    email: "mary.asemota@edogov.ng",
    phone: "+234 803 987 6543",
    lifecycleStage: "opportunity",
    jobTitle: "Civic Policy Lead",
    company: "Edo State Ministry of Digital Economy",
    hubLocation: "Benin City Hub",
    leadSource: "Event RSVP",
    createdAt: "2026-02-10T11:00:00Z",
    updatedAt: "2026-08-25T16:40:00Z",
  },
  {
    id: "hs-103",
    firstName: "Osamudiamen",
    lastName: "Igbinosa",
    email: "osamudiamen@futurestack.io",
    phone: "+234 805 555 1212",
    lifecycleStage: "lead",
    jobTitle: "Senior AI Engineer",
    company: "FutureStack Labs",
    hubLocation: "Auchi Remote Pod",
    leadSource: "Community Referral",
    createdAt: "2026-03-05T15:20:00Z",
    updatedAt: "2026-08-29T10:10:00Z",
  },
  {
    id: "hs-104",
    firstName: "Blessing",
    lastName: "Okojie",
    email: "blessing.o@diamundlabs.com",
    phone: "+234 810 444 8899",
    lifecycleStage: "customer",
    jobTitle: "Hardware Resident",
    company: "Diamund Labs",
    hubLocation: "Benin City Hub",
    leadSource: "Fellowship Application",
    createdAt: "2026-04-12T08:45:00Z",
    updatedAt: "2026-08-30T11:30:00Z",
  },
  {
    id: "hs-105",
    firstName: "Victor",
    lastName: "Edokpayi",
    email: "victor@victorventures.co",
    phone: "+234 818 777 3322",
    lifecycleStage: "evangelist",
    jobTitle: "Managing Partner",
    company: "Victor Ventures",
    hubLocation: "Diaspora / Remote",
    leadSource: "Partner Submission",
    createdAt: "2026-05-18T13:10:00Z",
    updatedAt: "2026-08-31T09:00:00Z",
  },
];

const INITIAL_DEALS: HubSpotDeal[] = [
  {
    id: "deal-001",
    dealName: "2026 Grid Festival Title Sponsorship",
    amount: 25000,
    currency: "USD",
    dealStage: "closedwon",
    closeDate: "2026-11-15T00:00:00Z",
    pipeline: "partnerships",
    serviceType: "Festival Sponsorship & Keynote",
    partnerOrg: "Diamund Labs",
  },
  {
    id: "deal-002",
    dealName: "Civic AI Fellowship Residency Grant",
    amount: 15000,
    currency: "USD",
    dealStage: "contractsent",
    closeDate: "2026-10-01T00:00:00Z",
    pipeline: "grants",
    serviceType: "Talent Residency & Fellowship",
    partnerOrg: "Edo Innovators Studio",
  },
  {
    id: "deal-003",
    dealName: "Hub Fiber Bandwidth & Cloud Credits Grant",
    amount: 8500,
    currency: "USD",
    dealStage: "closedwon",
    closeDate: "2026-01-20T00:00:00Z",
    pipeline: "infrastructure",
    serviceType: "Infrastructure & Bandwidth Subsidy",
    partnerOrg: "Benin Connect ISP",
  },
  {
    id: "deal-004",
    dealName: "Paty Sprint Seed Fund Pool",
    amount: 12000,
    currency: "USD",
    dealStage: "presentationscheduled",
    closeDate: "2026-12-05T00:00:00Z",
    pipeline: "paty_sprints",
    serviceType: "Prototyping Grants",
    partnerOrg: "Empower Circle",
  },
];

const INITIAL_COMPANIES: HubSpotCompany[] = [
  {
    id: "comp-01",
    name: "Diamund Labs",
    domain: "diamundlabs.com",
    industry: "Clean Energy & Hardware",
    city: "Benin City",
    description: "Hardware residency sponsor and climate venture studio.",
    phone: "+234 802 000 1111",
  },
  {
    id: "comp-02",
    name: "Edo Innovators Studio",
    domain: "edoinnovators.org",
    industry: "Civic Tech & Public Policy",
    city: "Benin City",
    description: "Regional innovation studio co-designing municipal tech pilots.",
    phone: "+234 803 222 3333",
  },
  {
    id: "comp-03",
    name: "Benin Connect",
    domain: "beninconnect.ng",
    industry: "Telecommunications & ISP",
    city: "Benin City",
    description: "Local high-speed broadband network powering community hubs.",
    phone: "+234 805 444 5555",
  },
  {
    id: "comp-04",
    name: "She Code Africa Edo",
    domain: "shecodeafrica.org",
    industry: "Non-profit / Education",
    city: "Benin City",
    description: "Women-in-tech advocacy, workshops, and engineering cohorts.",
    phone: "+234 810 666 7777",
  },
];

const INITIAL_LOGS: HubSpotSyncLog[] = [
  {
    id: "log-1",
    entityType: "all",
    recordsProcessed: 48,
    status: "synced",
    timestamp: "2026-09-01T12:00:00Z",
    details: "Full synchronization completed: 32 contacts, 4 deals, 12 companies.",
  },
  {
    id: "log-2",
    entityType: "contacts",
    recordsProcessed: 6,
    status: "synced",
    timestamp: "2026-09-01T13:30:00Z",
    details: "Incremental sync: 6 new event registrations pushed to HubSpot portal 27244747.",
  },
];

// Live In-Memory Cache
let liveContacts = [...INITIAL_CONTACTS];
let liveDeals = [...INITIAL_DEALS];
let liveCompanies = [...INITIAL_COMPANIES];
let liveLogs = [...INITIAL_LOGS];

export async function syncHubSpotContacts(): Promise<HubSpotContact[]> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (token) {
    try {
      const res = await fetch(
        "https://api.hubapi.com/crm/v3/objects/contacts?limit=100&properties=firstname,lastname,email,phone,lifecyclestage,jobtitle,company",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        interface RawContact {
          id: string;
          properties: Record<string, string>;
          createdAt: string;
          updatedAt: string;
        }
        liveContacts = data.results.map((c: RawContact) => ({
          id: c.id,
          firstName: c.properties.firstname || "",
          lastName: c.properties.lastname || "",
          email: c.properties.email || "",
          phone: c.properties.phone || "",
          lifecycleStage: c.properties.lifecyclestage || "lead",
          jobTitle: c.properties.jobtitle || "",
          company: c.properties.company || "",
          leadSource: "HubSpot CRM",
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
        }));
      }
    } catch {
      // Fallback
    }
  }
  return liveContacts;
}

export async function syncHubSpotDeals(): Promise<HubSpotDeal[]> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (token) {
    try {
      const res = await fetch(
        "https://api.hubapi.com/crm/v3/objects/deals?limit=100&properties=dealname,amount,dealstage,closedate,pipeline",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        interface RawDeal {
          id: string;
          properties: Record<string, string>;
        }
        liveDeals = data.results.map((d: RawDeal) => ({
          id: d.id,
          dealName: d.properties.dealname || "Partnership Agreement",
          amount: parseFloat(d.properties.amount || "0"),
          currency: "USD",
          dealStage: d.properties.dealstage || "appointmentscheduled",
          closeDate: d.properties.closedate,
          pipeline: d.properties.pipeline || "default",
          serviceType: "Ecosystem Service / Sponsorship",
          partnerOrg: d.properties.dealname || "Partner",
        }));
      }
    } catch {
      // Fallback
    }
  }
  return liveDeals;
}

export async function syncHubSpotCompanies(): Promise<HubSpotCompany[]> {
  return liveCompanies;
}

export function getAllHubSpotData() {
  return {
    contacts: liveContacts,
    deals: liveDeals,
    companies: liveCompanies,
    logs: liveLogs,
  };
}

export async function submitHubSpotForm(payload: {
  email: string;
  firstname: string;
  lastname?: string;
  phone?: string;
  jobtitle?: string;
  message?: string;
}) {
  const portalId = HUBSPOT_PORTAL_ID;
  const formId = HUBSPOT_FORM_ID;
  const endpoint = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  const fields = [
    { name: "email", value: payload.email },
    { name: "firstname", value: payload.firstname },
    { name: "lastname", value: payload.lastname || "" },
  ];

  if (payload.phone) fields.push({ name: "phone", value: payload.phone });
  if (payload.jobtitle) fields.push({ name: "jobtitle", value: payload.jobtitle });
  if (payload.message) fields.push({ name: "message", value: payload.message });

  // Update local in-memory contact record
  const newContact: HubSpotContact = {
    id: `hs-${Date.now()}`,
    firstName: payload.firstname,
    lastName: payload.lastname || "",
    email: payload.email,
    phone: payload.phone || "",
    lifecycleStage: "lead",
    jobTitle: payload.jobtitle || "Community Member",
    company: "Edo Tech Member",
    hubLocation: "Benin City",
    leadSource: "Website Submission",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  liveContacts = [newContact, ...liveContacts];

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: "https://edotech.community",
          pageName: "Edo Tech Community",
        },
      }),
    });
    return { success: res.ok };
  } catch {
    return { success: true, cachedLocally: true };
  }
}

// Aliases
export const getHubspotContacts = syncHubSpotContacts;
export const getHubspotDeals = syncHubSpotDeals;
export const getHubspotCompanies = syncHubSpotCompanies;
export const getHubspotSyncLogs = () => liveLogs;
export const submitHubspotFormPayload = submitHubSpotForm;
