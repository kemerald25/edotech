import { NextResponse } from "next/server";
import {
  syncHubSpotContacts,
  syncHubSpotDeals,
  syncHubSpotCompanies,
  getAllHubSpotData,
} from "@/lib/hubspot";

export async function GET() {
  try {
    const data = await getAllHubSpotData();
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load CRM data";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { entityType = "all" } = body;

    let contactsCount = 0;
    let dealsCount = 0;
    let companiesCount = 0;

    if (entityType === "all" || entityType === "contacts") {
      const contacts = await syncHubSpotContacts();
      contactsCount = contacts.length;
    }

    if (entityType === "all" || entityType === "deals") {
      const deals = await syncHubSpotDeals();
      dealsCount = deals.length;
    }

    if (entityType === "all" || entityType === "companies") {
      const companies = await syncHubSpotCompanies();
      companiesCount = companies.length;
    }

    return NextResponse.json({
      success: true,
      message: "HubSpot sync completed successfully",
      summary: {
        contactsCount,
        dealsCount,
        companiesCount,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Sync error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
