import { NextResponse } from "next/server";
import {
  getHubspotContacts,
  getHubspotDeals,
  getHubspotCompanies,
  getHubspotSyncLogs,
  triggerFullSync,
} from "@/lib/hubspot";

export async function GET() {
  try {
    const [contacts, deals, companies, logs] = await Promise.all([
      getHubspotContacts(),
      getHubspotDeals(),
      getHubspotCompanies(),
      getHubspotSyncLogs(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        deals,
        companies,
        logs,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch HubSpot CRM data" },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    const result = await triggerFullSync();
    const [contacts, deals, companies, logs] = await Promise.all([
      getHubspotContacts(),
      getHubspotDeals(),
      getHubspotCompanies(),
      getHubspotSyncLogs(),
    ]);

    return NextResponse.json({
      success: true,
      message: "Full synchronization with HubSpot CRM completed successfully.",
      result,
      data: {
        contacts,
        deals,
        companies,
        logs,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute HubSpot sync" },
      { status: 500 },
    );
  }
}
