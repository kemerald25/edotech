import { NextResponse } from "next/server";
import { createMembership } from "@/lib/data-store";
import { submitHubspotFormPayload } from "@/lib/hubspot";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, discipline, hubLocation, portfolioUrl, interests } = body;

    if (!fullName || !email || !discipline) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: fullName, email, discipline" },
        { status: 400 },
      );
    }

    // 1. Record membership in dynamic database store
    const membership = createMembership({
      fullName,
      email,
      phone,
      discipline,
      hubLocation: hubLocation || "Benin City Hub",
      portfolioUrl,
      interests: interests || [],
    });

    // 2. Sync member profile to HubSpot CRM API
    const nameParts = fullName.trim().split(" ");
    const firstname = nameParts[0] || fullName;
    const lastname = nameParts.slice(1).join(" ");

    await submitHubspotFormPayload({
      firstname,
      lastname,
      email,
      phone,
      discipline,
      interest: `Membership Application · Hub: ${hubLocation || "Benin City"} · Portfolio: ${portfolioUrl || "N/A"}`,
    });

    return NextResponse.json({
      success: true,
      membership,
      message: "Membership submitted successfully! Welcome to Edo Tech Community.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process membership application" },
      { status: 500 },
    );
  }
}
