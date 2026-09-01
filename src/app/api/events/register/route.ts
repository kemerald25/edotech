import { NextResponse } from "next/server";
import { registerForEvent } from "@/lib/data-store";
import { submitHubspotFormPayload } from "@/lib/hubspot";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, name, email, phone, role, attendanceMode } = body;

    if (!eventId || !name || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: eventId, name, email" },
        { status: 400 },
      );
    }

    // 1. Record registration in local database
    const registration = registerForEvent({
      eventId,
      name,
      email,
      phone,
      role: role || "Attendee",
      attendanceMode: attendanceMode || "in-person",
    });

    // 2. Sync lead to HubSpot Forms API in background
    const nameParts = name.trim().split(" ");
    const firstname = nameParts[0] || name;
    const lastname = nameParts.slice(1).join(" ");

    await submitHubspotFormPayload({
      firstname,
      lastname,
      email,
      phone,
      discipline: role,
      interest: `Event RSVP: ${registration.eventTitle} (${attendanceMode})`,
    });

    return NextResponse.json({
      success: true,
      registration,
      message: "RSVP confirmed! Your registration has been synced.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to register for event" },
      { status: 500 },
    );
  }
}
