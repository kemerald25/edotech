import { NextResponse } from "next/server";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getAllRegistrations,
} from "@/lib/data-store";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const withRegistrations = searchParams.get("withRegistrations") === "true";

    const events = getAllEvents();
    if (withRegistrations) {
      const registrations = getAllRegistrations();
      return NextResponse.json({ success: true, events, registrations });
    }

    return NextResponse.json({ success: true, events });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch events";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      category,
      date,
      locationType,
      venueName,
      address,
      virtualLink,
      bannerUrl,
      capacity,
      status,
      featured,
    } = body;

    if (!title || !date) {
      return NextResponse.json(
        { success: false, error: "Title and date are required" },
        { status: 400 }
      );
    }

    const event = createEvent({
      title,
      description: description || "",
      category: category || "Product Studio",
      date,
      locationType: locationType || "hybrid",
      venueName: venueName || "Edo Innovation Hub",
      address: address || "Benin City, Edo State",
      virtualLink: virtualLink || "",
      bannerUrl: bannerUrl || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
      capacity: capacity ? Number(capacity) : 150,
      status: status || "published",
      featured: !!featured,
    });

    return NextResponse.json({ success: true, event });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create event";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Event ID is required" }, { status: 400 });
    }

    const event = updateEvent(id, updates);
    if (!event) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, event });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update event";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Event ID is required" }, { status: 400 });
    }

    const deleted = deleteEvent(id);
    return NextResponse.json({ success: deleted });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete event";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
