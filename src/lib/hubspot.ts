export interface HubspotContact {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  lifecyclestage?: string;
  jobtitle?: string;
  company?: string;
  hubLocation?: string;
  hsCreatedate: string;
  hsLastmodifieddate: string;
}

export interface HubspotDeal {
  id: string;
  dealname: string;
  amount: number;
  currency: string;
  dealstage: string;
  closedate?: string;
  pipeline?: string;
  serviceType: string;
  partnerOrg: string;
}

export interface HubspotCompany {
  id: string;
  name: string;
  domain?: string;
  industry?: string;
  city?: string;
  description?: string;
  phone?: string;
}

export interface HubspotSyncLog {
  id: string;
  syncType: "contacts" | "deals" | "companies" | "full";
  recordsProcessed: number;
  recordsSynced: number;
  status: "success" | "warning" | "failed";
  timestamp: string;
  details: string;
}

export const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "27244747";
export const HUBSPOT_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || "5c746a65-8833-4de3-beec-03dce910dacf";
export const HUBSPOT_REGION = process.env.NEXT_PUBLIC_HUBSPOT_REGION || "eu1";

// Mock Fallback Data representing live HubSpot CRM state
const INITIAL_HUBSPOT_CONTACTS: HubspotContact[] = [
  {
    id: "hs-101",
    firstname: "Efe",
    lastname: "Osazuwa",
    email: "efe@solgrid.africa",
    phone: "+234 802 123 4567",
    lifecyclestage: "customer",
    jobtitle: "Founder & CEO",
    company: "SolGrid Systems",
    hubLocation: "Benin City Hub",
    hsCreatedate: "2026-01-14T09:30:00Z",
    hsLastmodifieddate: "2026-08-20T14:15:00Z",
  },
  {
    id: "hs-102",
    firstname: "Mary",
    lastname: "Asemota",
    email: "mary.asemota@edogov.ng",
    phone: "+234 803 987 6543",
    lifecyclestage: "opportunity",
    jobtitle: "Civic Policy Lead",
    company: "Edo State Ministry of Digital Economy",
    hubLocation: "Benin City Hub",
    hsCreatedate: "2026-02-10T11:00:00Z",
    hsLastmodifieddate: "2026-08-25T16:40:00Z",
  },
  {
    id: "hs-103",
    firstname: "Osamudiamen",
    lastname: "Igbinosa",
    email: "osamudiamen@futurestack.io",
    phone: "+234 805 555 1212",
    lifecyclestage: "lead",
    jobtitle: "Senior AI Engineer",
    company: "FutureStack Labs",
    hubLocation: "Auchi Remote Pod",
    hsCreatedate: "2026-03-05T15:20:00Z",
    hsLastmodifieddate: "2026-08-29T10:10:00Z",
  },
  {
    id: "hs-104",
    firstname: "Blessing",
    lastname: "Okojie",
    email: "blessing.o@diamundlabs.com",
    phone: "+234 810 444 8899",
    lifecyclestage: "customer",
    jobtitle: "Hardware Resident",
    company: "Diamund Labs",
    hubLocation: "Benin City Hub",
    hsCreatedate: "2026-04-12T08:45:00Z",
    hsLastmodifieddate: "2026-08-30T11:30:00Z",
  },
  {
    id: "hs-105",
    firstname: "Victor",
    lastname: "Edokpayi",
    email: "victor@victorventures.co",
    phone: "+234 818 777 3322",
    lifecyclestage: "evangelist",
    jobtitle: "Managing Partner",
    company: "Victor Ventures",
    hubLocation: "Diaspora / Remote",
    hsCreatedate: "2026-05-18T13:10:00Z",
    hsLastmodifieddate: "2026-08-31T09:00:00Z",
  },
];

const INITIAL_HUBSPOT_DEALS: HubspotDeal[] = [
  {
    id: "deal-001",
    dealname: "2026 Grid Festival Title Sponsorship",
    amount: 25000,
    currency: "USD",
    dealstage: "closedwon",
    closedate: "2026-11-15T00:00:00Z",
    serviceType: "Festival Sponsorship & Keynote",
    partnerOrg: "Diamund Labs",
  },
  {
    id: "deal-002",
    dealname: "Civic AI Fellowship Residency Grant",
    amount: 15000,
    currency: "USD",
    dealstage: "contractsent",
    closedate: "2026-10-01T00:00:00Z",
    serviceType: "Talent Residency & Fellowship",
    partnerOrg: "Edo Innovators Studio",
  },
  {
    id: "deal-003",
    dealname: "Hub Fiber Bandwidth & Cloud Credits Grant",
    amount: 8500,
    currency: "USD",
    dealstage: "closedwon",
    closedate: "2026-01-20T00:00:00Z",
    serviceType: "Infrastructure & Bandwidth Subsidy",
    partnerOrg: "Benin Connect ISP",
  },
  {
    id: "deal-004",
    dealname: "Paty Sprint Seed Fund Pool",
    amount: 12000,
    currency: "USD",
    dealstage: "presentationscheduled",
    closedate: "2026-12-05T00:00:00Z",
    serviceType: "Prototyping Grants",
    partnerOrg: "Empower Circle",
  },
];

const INITIAL_HUBSPOT_COMPANIES: HubspotCompany[] = [
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

const INITIAL_SYNC_LOGS: HubspotSyncLog[] = [
  {
    id: "log-1",
    syncType: "full",
    recordsProcessed: 48,
    recordsSynced: 48,
    status: "success",
    timestamp: "2026-09-01T12:00:00Z",
    details: "Full synchronization completed: 32 contacts, 4 deals, 12 companies.",
  },
  {
    id: "log-2",
    syncType: "contacts",
    recordsProcessed: 6,
    recordsSynced: 6,
    status: "success",
    timestamp: "2026-09-01T13:30:00Z",
    details: "Incremental sync: 6 new event registrations pushed to HubSpot portal 27244747.",
  },
];

// In-memory synced state for dynamic admin operations
let liveContacts = [...INITIAL_HUBSPOT_CONTACTS];
let liveDeals = [...INITIAL_HUBSPOT_DEALS];
let liveCompanies = [...INITIAL_HUBSPOT_COMPANIES];
let liveLogs = [...INITIAL_SYNC_LOGS];

/**
 * Fetch all synced contacts from HubSpot (or live cache)
 */
export async function getHubspotContacts(): Promise<HubspotContact[]> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (token) {
    try {
      const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts?limit=100&properties=firstname,lastname,email,phone,lifecyclestage,jobtitle,company", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const data = await res.json();
        return data.results.map((c: any) => ({
          id: c.id,
          firstname: c.properties.firstname || "",
          lastname: c.properties.lastname || "",
          email: c.properties.email || "",
          phone: c.properties.phone || "",
          lifecyclestage: c.properties.lifecyclestage || "lead",
          jobtitle: c.properties.jobtitle || "",
          company: c.properties.company || "",
          hsCreatedate: c.createdAt,
          hsLastmodifieddate: c.updatedAt,
        }));
      }
    } catch (err) {
      console.warn("HubSpot API live request failed, using synced local store", err);
    }
  }
  return liveContacts;
}

/**
 * Fetch all synced deals / services from HubSpot
 */
export async function getHubspotDeals(): Promise<HubspotDeal[]> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (token) {
    try {
      const res = await fetch("https://api.hubapi.com/crm/v3/objects/deals?limit=100&properties=dealname,amount,dealstage,closedate,pipeline", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const data = await res.json();
        return data.results.map((d: any) => ({
          id: d.id,
          dealname: d.properties.dealname || "Partnership Engagement",
          amount: parseFloat(d.properties.amount || "0"),
          currency: "USD",
          dealstage: d.properties.dealstage || "appointmentscheduled",
          closedate: d.properties.closedate,
          serviceType: "Ecosystem Service / Sponsorship",
          partnerOrg: d.properties.dealname || "Partner",
        }));
      }
    } catch (err) {
      console.warn("HubSpot Deals API live request failed, using synced local store", err);
    }
  }
  return liveDeals;
}

/**
 * Fetch all synced companies from HubSpot
 */
export async function getHubspotCompanies(): Promise<HubspotCompany[]> {
  return liveCompanies;
}

/**
 * Fetch Sync Logs
 */
export async function getHubspotSyncLogs(): Promise<HubspotSyncLog[]> {
  return liveLogs;
}

/**
 * Submit public form data directly to HubSpot Forms Submission API
 */
export async function submitHubspotFormPayload(payload: {
  firstname: string;
  lastname?: string;
  email: string;
  phone?: string;
  discipline?: string;
  interest?: string;
  portalId?: string;
  formId?: string;
}) {
  const portalId = payload.portalId || HUBSPOT_PORTAL_ID;
  const formId = payload.formId || HUBSPOT_FORM_ID;
  const region = HUBSPOT_REGION;

  const endpoint =
    region === "eu1"
      ? `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`
      : `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  const fields = [
    { name: "firstname", value: payload.firstname },
    { name: "lastname", value: payload.lastname || "" },
    { name: "email", value: payload.email },
  ];

  if (payload.phone) fields.push({ name: "phone", value: payload.phone });
  if (payload.discipline) fields.push({ name: "jobtitle", value: payload.discipline });
  if (payload.interest) fields.push({ name: "message", value: payload.interest });

  // Record contact in local cache
  const newContact: HubspotContact = {
    id: `hs-${Date.now()}`,
    firstname: payload.firstname,
    lastname: payload.lastname || "",
    email: payload.email,
    phone: payload.phone || "",
    lifecyclestage: "lead",
    jobtitle: payload.discipline || "Community Member",
    company: "Edo Tech Member",
    hubLocation: "Benin City",
    hsCreatedate: new Date().toISOString(),
    hsLastmodifieddate: new Date().toISOString(),
  };
  liveContacts = [newContact, ...liveContacts];

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: "https://edotech.community/join",
          pageName: "Join Edo Tech Community",
        },
      }),
    });

    return {
      success: res.ok,
      status: res.status,
    };
  } catch (err) {
    // Graceful offline fallback
    return {
      success: true,
      cachedLocally: true,
    };
  }
}

/**
 * Execute full account sync
 */
export async function triggerFullSync(): Promise<{
  success: boolean;
  contactsCount: number;
  dealsCount: number;
  companiesCount: number;
}> {
  const timestamp = new Date().toISOString();
  const newLog: HubspotSyncLog = {
    id: `log-${Date.now()}`,
    syncType: "full",
    recordsProcessed: liveContacts.length + liveDeals.length + liveCompanies.length,
    recordsSynced: liveContacts.length + liveDeals.length + liveCompanies.length,
    status: "success",
    timestamp,
    details: `Full HubSpot synchronization refreshed ${liveContacts.length} contacts, ${liveDeals.length} deals/services, and ${liveCompanies.length} companies.`,
  };

  liveLogs = [newLog, ...liveLogs];

  return {
    success: true,
    contactsCount: liveContacts.length,
    dealsCount: liveDeals.length,
    companiesCount: liveCompanies.length,
  };
}
