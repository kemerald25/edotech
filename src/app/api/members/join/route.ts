import { NextResponse } from "next/server";
import { registerMembership } from "@/lib/data-store";
import { submitHubSpotForm } from "@/lib/hubspot";
import { supabaseUpsert } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      firstName,
      lastName,
      email,
      phone,
      bio,
      location,
      birthday,
      gender,
      hobbies,
      discipline,
      fieldInTech,
      jobTitle,
      companyName,
      companyWebsite,
      companyAddress,
      isFounder,
      persona,
      avatarUrl,
      expectations,
      interests,
    } = body;

    const resolvedName = fullName || `${firstName || ""} ${lastName || ""}`.trim();

    if (!resolvedName || !email || !fieldInTech) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: Name, Email, or Field in Tech" },
        { status: 400 }
      );
    }

    // 1. Record membership in local data store
    const member = registerMembership({
      fullName: resolvedName,
      email,
      phone: phone || "",
      discipline: fieldInTech || discipline || "Technology",
      hubLocation: location || "Benin City, Edo State",
      portfolioUrl: companyWebsite || "",
      interests: interests || [fieldInTech, persona].filter(Boolean),
      status: "active",
    });

    // 2. Persist directly to Supabase Database `memberships` table
    await supabaseUpsert("memberships", [{
      id: member.id,
      full_name: resolvedName,
      email,
      phone: phone || "",
      discipline: fieldInTech || discipline,
      hub_location: location || "Benin City",
      interests: [
        fieldInTech,
        persona,
        gender,
        isFounder ? "Founder/Co-founder" : "",
        hobbies ? `Hobbies: ${hobbies}` : "",
      ].filter(Boolean),
      portfolio_url: companyWebsite || "",
      status: "active",
      hubspot_synced: true,
      created_at: new Date().toISOString(),
    }], "id");

    // 3. Sync to HubSpot Portal (27244747)
    await submitHubSpotForm({
      email,
      firstname: firstName || resolvedName.split(" ")[0] || resolvedName,
      lastname: lastName || resolvedName.split(" ").slice(1).join(" ") || "",
      phone: phone || "",
      jobtitle: jobTitle || fieldInTech || "Community Member",
      message: `Bio: ${bio || "N/A"} | Location: ${location || "Benin City"} | Persona: ${persona || "Member"} | Company: ${companyName || "N/A"} | Founder: ${isFounder ? "Yes" : "No"} | Birthday: ${birthday || "N/A"} | Expectations: ${expectations || "N/A"}`,
    });

    return NextResponse.json({
      success: true,
      member,
      message: "Membership application recorded and synced successfully.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
