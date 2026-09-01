import { NextResponse } from "next/server";
import { registerForEvent, getEventById } from "@/lib/data-store";
import { submitHubSpotForm } from "@/lib/hubspot";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, name, email, phone, role, attendanceMode } = body;

    if (!eventId || !name || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: eventId, name, or email" },
        { status: 400 }
      );
    }

    const event = getEventById(eventId);
    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }

    // 1. Record registration in local database store
    const registration = registerForEvent({
      eventId,
      name,
      email,
      phone,
      role: role || "Developer / Engineer",
      attendanceMode: attendanceMode || "in-person",
    });

    // 2. Sync lead to HubSpot Form API endpoint
    await submitHubSpotForm({
      email,
      firstname: name.split(" ")[0] || name,
      lastname: name.split(" ").slice(1).join(" ") || "",
      phone: phone || "",
      jobtitle: role || "Developer / Engineer",
      message: `Registered for event: ${event.title} (${attendanceMode || "in-person"})`,
    });

    return NextResponse.json({
      success: true,
      registration,
      eventTitle: event.title,
      message: `Successfully registered for ${event.title}`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
