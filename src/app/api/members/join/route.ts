import { NextResponse } from "next/server";
import { registerMembership } from "@/lib/data-store";
import { submitHubSpotForm } from "@/lib/hubspot";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      discipline,
      hubLocation,
      portfolioUrl,
      interests,
    } = body;

    if (!fullName || !email || !discipline) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: fullName, email, or discipline" },
        { status: 400 }
      );
    }

    // 1. Record membership in local data store / DB
    const member = registerMembership({
      fullName,
      email,
      phone: phone || "",
      discipline,
      hubLocation: hubLocation || "Benin City Hub",
      portfolioUrl: portfolioUrl || "",
      interests: interests || [],
      status: "active",
    });

    // 2. Sync to HubSpot Portal (27244747) Form (5c746a65-8833-4de3-beec-03dce910dacf)
    await submitHubSpotForm({
      email,
      firstname: fullName.split(" ")[0] || fullName,
      lastname: fullName.split(" ").slice(1).join(" ") || "",
      phone: phone || "",
      jobtitle: discipline,
      message: `Joined Edo Tech Guild. Hub: ${hubLocation || "Benin City Hub"}. Interests: ${(interests || []).join(", ")}. Portfolio: ${portfolioUrl || "N/A"}`,
    });

    return NextResponse.json({
      success: true,
      member,
      message: "Membership application recorded and synced to HubSpot successfully.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
