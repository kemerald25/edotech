import { NextResponse } from "next/server";
import {
  getAllRoles,
  createCustomRole,
  deleteCustomRole,
} from "@/lib/data-store";

export async function GET() {
  try {
    const roles = getAllRoles();
    return NextResponse.json({ success: true, roles });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load roles";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, permissions } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Role name is required" },
        { status: 400 }
      );
    }

    const role = createCustomRole({
      name,
      description: description || "",
      permissions: permissions || [],
    });

    return NextResponse.json({ success: true, role });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create custom role";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Role ID is required" }, { status: 400 });
    }

    const deleted = deleteCustomRole(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Cannot delete built-in system roles or non-existent role" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete role";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
