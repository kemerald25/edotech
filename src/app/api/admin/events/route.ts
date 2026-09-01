import { NextResponse } from "next/server";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventRegistrations,
} from "@/lib/data-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");
  const withRegistrations = searchParams.get("withRegistrations") === "true";

  const events = getAllEvents();
  const registrations = withRegistrations ? getEventRegistrations(eventId || undefined) : [];

  return NextResponse.json({
    success: true,
    events,
    registrations,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, category, date, endDate, locationType, venueName, address, virtualLink, bannerUrl, capacity, status, featured } = body;

    if (!title || !description || !date) {
      return NextResponse.json(
        { success: false, error: "Title, description, and date are required" },
        { status: 400 },
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newEvent = createEvent({
      title,
      slug: slug || `event-${Date.now()}`,
      description,
      category: category || "Community",
      date,
      endDate,
      locationType: locationType || "hybrid",
      venueName: venueName || "Edo Innovation Hub",
      address: address || "Benin City, Edo State",
      virtualLink,
      bannerUrl: bannerUrl || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
      capacity: capacity || 150,
      status: status || "published",
      featured: Boolean(featured),
    });

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: "Event ID required" }, { status: 400 });
    }
    const updated = updateEvent(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, event: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Event ID required" }, { status: 400 });
    }
    const ok = deleteEvent(id);
    return NextResponse.json({ success: ok });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
