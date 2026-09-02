import { supabaseUpsert, supabaseSelect } from "./supabase";

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

// Live In-Memory Cache
let liveContacts: HubSpotContact[] = [];
let liveDeals: HubSpotDeal[] = [];
let liveCompanies: HubSpotCompany[] = [];
const liveLogs: HubSpotSyncLog[] = [];

/**
 * Fetch all synced contacts from Supabase database or active cache
 */
export async function getHubspotContacts(): Promise<HubSpotContact[]> {
  const dbContacts = await supabaseSelect<{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    lifecycle_stage?: string;
    job_title?: string;
    company?: string;
    hub_location?: string;
    lead_source?: string;
    created_at: string;
    updated_at: string;
  }>("hubspot_contacts", "select=*&order=created_at.desc&limit=10000");

  if (dbContacts && dbContacts.length > 0) {
    liveContacts = dbContacts.map((c) => ({
      id: c.id,
      firstName: c.first_name || "",
      lastName: c.last_name || "",
      email: c.email,
      phone: c.phone || "",
      lifecycleStage: c.lifecycle_stage || "lead",
      jobTitle: c.job_title || "",
      company: c.company || "",
      hubLocation: c.hub_location || "Benin City",
      leadSource: c.lead_source || "HubSpot CRM",
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    }));
  } else if (liveContacts.length === 0 && process.env.HUBSPOT_ACCESS_TOKEN) {
    await syncHubSpotContacts();
  }

  return liveContacts;
}

/**
 * Fetch all synced deals from Supabase database or active cache
 */
export async function getHubspotDeals(): Promise<HubSpotDeal[]> {
  const dbDeals = await supabaseSelect<{
    id: string;
    deal_name: string;
    stage: string;
    amount: number;
    currency: string;
    close_date?: string;
    pipeline?: string;
    service_type?: string;
    partner_name?: string;
  }>("hubspot_deals", "select=*&limit=1000");

  if (dbDeals && dbDeals.length > 0) {
    liveDeals = dbDeals.map((d) => ({
      id: d.id,
      dealName: d.deal_name || "Agreement",
      amount: Number(d.amount) || 0,
      currency: d.currency || "USD",
      dealStage: d.stage || "pending",
      closeDate: d.close_date,
      pipeline: d.pipeline || "general",
      serviceType: d.service_type || "Service",
      partnerOrg: d.partner_name || "Partner",
    }));
  } else if (liveDeals.length === 0 && process.env.HUBSPOT_ACCESS_TOKEN) {
    await syncHubSpotDeals();
  }

  return liveDeals;
}

/**
 * Fetch all synced companies from Supabase database or active cache
 */
export async function getHubspotCompanies(): Promise<HubSpotCompany[]> {
  const dbCompanies = await supabaseSelect<{
    id: string;
    name: string;
    domain?: string;
    industry?: string;
    city?: string;
    description?: string;
  }>("hubspot_companies", "select=*&limit=1000");

  if (dbCompanies && dbCompanies.length > 0) {
    liveCompanies = dbCompanies.map((comp) => ({
      id: comp.id,
      name: comp.name,
      domain: comp.domain,
      industry: comp.industry,
      city: comp.city,
      description: comp.description,
    }));
  } else if (liveCompanies.length === 0 && process.env.HUBSPOT_ACCESS_TOKEN) {
    await syncHubSpotCompanies();
  }

  return liveCompanies;
}

/**
 * Sync all contacts from HubSpot CRM API v3 with automatic multi-page pagination,
 * and permanently save all records to Supabase.
 */
export async function syncHubSpotContacts(): Promise<HubSpotContact[]> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    return liveContacts;
  }

  const allFetchedContacts: HubSpotContact[] = [];
  let nextAfter: string | undefined = undefined;
  let hasMore = true;
  let pageCount = 0;
  const maxPages = 100; // Supports up to 10,000 contacts in batches of 100

  try {
    while (hasMore && pageCount < maxPages) {
      pageCount++;
      const cursorParam: string = nextAfter ? `&after=${nextAfter}` : "";
      const url: string = `https://api.hubapi.com/crm/v3/objects/contacts?limit=100${cursorParam}&properties=firstname,lastname,email,phone,lifecyclestage,jobtitle,company`;

      const res: Response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.warn(`HubSpot Contacts API returned ${res.status}`);
        break;
      }

      interface RawContactResult {
        id: string;
        properties: Record<string, string>;
        createdAt: string;
        updatedAt: string;
      }

      interface RawContactResponse {
        results?: RawContactResult[];
        paging?: {
          next?: {
            after?: string;
          };
        };
      }

      const data: RawContactResponse = await res.json();
      const rawResults = data.results || [];

      const pageContacts: HubSpotContact[] = rawResults.map((c: RawContactResult) => ({
        id: c.id,
        firstName: c.properties.firstname || "",
        lastName: c.properties.lastname || "",
        email: c.properties.email || `contact_${c.id}@hubspot.lead`,
        phone: c.properties.phone || "",
        lifecycleStage: c.properties.lifecyclestage || "lead",
        jobTitle: c.properties.jobtitle || "",
        company: c.properties.company || "",
        hubLocation: "Benin City",
        leadSource: "HubSpot CRM",
        createdAt: c.createdAt || new Date().toISOString(),
        updatedAt: c.updatedAt || new Date().toISOString(),
      }));

      allFetchedContacts.push(...pageContacts);

      if (data.paging?.next?.after) {
        nextAfter = data.paging.next.after;
      } else {
        hasMore = false;
      }
    }

    if (allFetchedContacts.length > 0) {
      liveContacts = allFetchedContacts;

      // Permanently save/upsert all contacts into Supabase Database
      const supabaseRecords = allFetchedContacts.map((c) => ({
        id: c.id,
        first_name: c.firstName,
        last_name: c.lastName,
        email: c.email,
        phone: c.phone || "",
        lifecycle_stage: c.lifecycleStage,
        job_title: c.jobTitle,
        company: c.company,
        hub_location: c.hubLocation,
        lead_source: c.leadSource,
        created_at: c.createdAt,
        updated_at: c.updatedAt,
        synced_at: new Date().toISOString(),
      }));

      await supabaseUpsert("hubspot_contacts", supabaseRecords, "id");
    }
  } catch (err: unknown) {
    console.warn("HubSpot Contacts pagination sync error:", err);
  }

  return liveContacts;
}

/**
 * Sync all deals from HubSpot CRM API v3 with pagination and save to Supabase
 */
export async function syncHubSpotDeals(): Promise<HubSpotDeal[]> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    return liveDeals;
  }

  const allFetchedDeals: HubSpotDeal[] = [];
  let nextAfter: string | undefined = undefined;
  let hasMore = true;

  try {
    while (hasMore) {
      const cursorParam: string = nextAfter ? `&after=${nextAfter}` : "";
      const url: string = `https://api.hubapi.com/crm/v3/objects/deals?limit=100${cursorParam}&properties=dealname,amount,dealstage,closedate,pipeline`;

      const res: Response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) break;

      interface RawDealResult {
        id: string;
        properties: Record<string, string>;
      }

      interface RawDealResponse {
        results?: RawDealResult[];
        paging?: {
          next?: {
            after?: string;
          };
        };
      }

      const data: RawDealResponse = await res.json();
      const rawResults = data.results || [];

      const pageDeals: HubSpotDeal[] = rawResults.map((d: RawDealResult) => ({
        id: d.id,
        dealName: d.properties.dealname || "Partnership Agreement",
        amount: parseFloat(d.properties.amount || "0"),
        currency: "USD",
        dealStage: d.properties.dealstage || "open",
        closeDate: d.properties.closedate,
        pipeline: d.properties.pipeline || "partnerships",
        serviceType: "Ecosystem Service / Sponsorship",
        partnerOrg: d.properties.dealname || "Partner",
      }));

      allFetchedDeals.push(...pageDeals);

      if (data.paging?.next?.after) {
        nextAfter = data.paging.next.after;
      } else {
        hasMore = false;
      }
    }

    liveDeals = allFetchedDeals;

    if (allFetchedDeals.length > 0) {
      const supabaseRecords = allFetchedDeals.map((d) => ({
        id: d.id,
        deal_name: d.dealName,
        stage: d.dealStage,
        amount: d.amount,
        currency: d.currency,
        close_date: d.closeDate || null,
        pipeline: d.pipeline,
        service_type: d.serviceType,
        partner_name: d.partnerOrg,
        synced_at: new Date().toISOString(),
      }));

      await supabaseUpsert("hubspot_deals", supabaseRecords, "id");
    }
  } catch (err) {
    console.warn("HubSpot Deals sync error:", err);
  }

  return liveDeals;
}

/**
 * Sync all companies from HubSpot CRM API v3 with pagination and save to Supabase
 */
export async function syncHubSpotCompanies(): Promise<HubSpotCompany[]> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    return liveCompanies;
  }

  const allFetchedCompanies: HubSpotCompany[] = [];
  let nextAfter: string | undefined = undefined;
  let hasMore = true;

  try {
    while (hasMore) {
      const cursorParam: string = nextAfter ? `&after=${nextAfter}` : "";
      const url: string = `https://api.hubapi.com/crm/v3/objects/companies?limit=100${cursorParam}&properties=name,domain,industry,city,description,phone`;

      const res: Response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) break;

      interface RawCompResult {
        id: string;
        properties: Record<string, string>;
      }

      interface RawCompResponse {
        results?: RawCompResult[];
        paging?: {
          next?: {
            after?: string;
          };
        };
      }

      const data: RawCompResponse = await res.json();
      const rawResults = data.results || [];

      const pageCompanies: HubSpotCompany[] = rawResults.map((c: RawCompResult) => ({
        id: c.id,
        name: c.properties.name || "Organization",
        domain: c.properties.domain,
        industry: c.properties.industry,
        city: c.properties.city,
        description: c.properties.description,
        phone: c.properties.phone,
      }));

      allFetchedCompanies.push(...pageCompanies);

      if (data.paging?.next?.after) {
        nextAfter = data.paging.next.after;
      } else {
        hasMore = false;
      }
    }

    liveCompanies = allFetchedCompanies;

    if (allFetchedCompanies.length > 0) {
      const supabaseRecords = allFetchedCompanies.map((c) => ({
        id: c.id,
        name: c.name,
        domain: c.domain || null,
        industry: c.industry || null,
        city: c.city || null,
        description: c.description || null,
        synced_at: new Date().toISOString(),
      }));

      await supabaseUpsert("hubspot_companies", supabaseRecords, "id");
    }
  } catch (err) {
    console.warn("HubSpot Companies sync error:", err);
  }

  return liveCompanies;
}

/**
 * Get all real data (contacts, deals, companies, logs) from Supabase / Live HubSpot
 */
export async function getAllHubSpotData() {
  const contacts = await getHubspotContacts();
  const deals = await getHubspotDeals();
  const companies = await getHubspotCompanies();

  return {
    contacts,
    deals,
    companies,
    logs: liveLogs,
  };
}

/**
 * Direct CRM API Contact Creation & HubSpot Form Submission
 * Directly pushes new contacts into your HubSpot CRM Contacts database instantly.
 */
export async function submitHubSpotForm(payload: {
  email: string;
  firstname: string;
  lastname?: string;
  phone?: string;
  jobtitle?: string;
  city?: string;
  company?: string;
  website?: string;
  message?: string;
}) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  let hubspotContactId: string = `hs-${Date.now()}`;
  let directCrmSuccess = false;

  // 1. Direct CRM API Contact Upsert via Private Access Token
  if (token) {
    try {
      const contactProperties: Record<string, string> = {
        email: payload.email.trim().toLowerCase(),
        firstname: payload.firstname.trim(),
      };
      if (payload.lastname) contactProperties.lastname = payload.lastname.trim();
      if (payload.phone) contactProperties.phone = payload.phone.trim();
      if (payload.jobtitle) contactProperties.jobtitle = payload.jobtitle.trim();
      if (payload.city) contactProperties.city = payload.city.trim();
      if (payload.company) contactProperties.company = payload.company.trim();
      if (payload.website) contactProperties.website = payload.website.trim();
      contactProperties.lifecyclestage = "lead";

      const crmRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties: contactProperties }),
      });

      if (crmRes.ok) {
        const crmData = await crmRes.json();
        if (crmData.id) {
          hubspotContactId = crmData.id;
          directCrmSuccess = true;
        }
      } else if (crmRes.status === 409) {
        // Contact already exists in HubSpot: update existing record
        const updateRes = await fetch(
          `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(payload.email.trim().toLowerCase())}?idProperty=email`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ properties: contactProperties }),
          }
        );
        if (updateRes.ok) {
          const updateData = await updateRes.json();
          if (updateData.id) {
            hubspotContactId = updateData.id;
            directCrmSuccess = true;
          }
        } else {
          const errText = await updateRes.text();
          console.warn("HubSpot CRM Contact PATCH error:", updateRes.status, errText);
        }
      } else {
        const errText = await crmRes.text();
        console.warn("HubSpot CRM Contact POST error:", crmRes.status, errText);

        // Fallback retry with minimal core fields
        const retryRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            properties: {
              email: payload.email.trim().toLowerCase(),
              firstname: payload.firstname.trim(),
              lastname: payload.lastname || "",
            },
          }),
        });
        if (retryRes.ok) {
          const retryData = await retryRes.json();
          if (retryData.id) {
            hubspotContactId = retryData.id;
            directCrmSuccess = true;
          }
        }
      }

      // Add a timeline Note with full membership onboarding answers if message provided
      if (payload.message && directCrmSuccess && hubspotContactId && !hubspotContactId.startsWith("hs-")) {
        try {
          await fetch("https://api.hubapi.com/crm/v3/objects/notes", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              properties: {
                hs_timestamp: new Date().toISOString(),
                hs_note_body: `<h3>Edo Tech Community Application Details</h3><p>${payload.message.replace(/\n/g, "<br/>")}</p>`,
              },
              associations: [
                {
                  to: { id: hubspotContactId },
                  types: [
                    {
                      associationCategory: "HUBSPOT_DEFINED",
                      associationTypeId: 202, // Note to Contact
                    },
                  ],
                },
              ],
            }),
          });
        } catch (noteErr) {
          console.warn("HubSpot Note association warning:", noteErr);
        }
      }
    } catch (crmErr) {
      console.warn("HubSpot Direct CRM API contact creation warning:", crmErr);
    }
  }

  // 2. Also submit to HubSpot Form integration endpoints
  const portalId = HUBSPOT_PORTAL_ID;
  const formId = HUBSPOT_FORM_ID;
  const region = HUBSPOT_REGION || "eu1";
  const formEndpoints = [
    `https://api-${region}.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
  ];

  const fields = [
    { name: "email", value: payload.email },
    { name: "firstname", value: payload.firstname },
    { name: "lastname", value: payload.lastname || "" },
  ];
  if (payload.phone) fields.push({ name: "phone", value: payload.phone });
  if (payload.jobtitle) fields.push({ name: "jobtitle", value: payload.jobtitle });
  if (payload.company) fields.push({ name: "company", value: payload.company });
  if (payload.city) fields.push({ name: "city", value: payload.city });
  if (payload.message) fields.push({ name: "message", value: payload.message });

  for (const endpoint of formEndpoints) {
    try {
      const formRes = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          context: {
            pageUri: "https://www.edotech.com.ng/join",
            pageName: "Edo Tech Community Join",
          },
        }),
      });
      if (formRes.ok) break;
    } catch (formErr) {
      console.warn(`HubSpot Form API fallback warning (${endpoint}):`, formErr);
    }
  }

  // 3. Save to Supabase hubspot_contacts table
  const newContact: HubSpotContact = {
    id: hubspotContactId,
    firstName: payload.firstname,
    lastName: payload.lastname || "",
    email: payload.email,
    phone: payload.phone || "",
    lifecycleStage: "lead",
    jobTitle: payload.jobtitle || "Community Member",
    company: payload.company || "Edo Tech Member",
    hubLocation: payload.city || "Benin City",
    leadSource: "Website Join Form",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  liveContacts = [newContact, ...liveContacts];

  await supabaseUpsert("hubspot_contacts", [{
    id: newContact.id,
    first_name: newContact.firstName,
    last_name: newContact.lastName,
    email: newContact.email,
    phone: newContact.phone,
    lifecycle_stage: newContact.lifecycleStage,
    job_title: newContact.jobTitle,
    company: newContact.company,
    hub_location: newContact.hubLocation,
    lead_source: newContact.leadSource,
    created_at: newContact.createdAt,
    updated_at: newContact.updatedAt,
    synced_at: new Date().toISOString(),
  }], "id");

  return { success: true, contactId: hubspotContactId, directCrmSuccess };
}

// Aliases
export const getHubspotSyncLogs = () => liveLogs;
export const submitHubspotFormPayload = submitHubSpotForm;
