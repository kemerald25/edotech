import { NextResponse } from "next/server";
import {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
  getAllAdminUsers,
  assignUserRole,
} from "@/lib/data-store";
import { SYSTEM_PERMISSIONS } from "@/lib/permissions";

export async function GET() {
  const roles = getAllRoles();
  const users = getAllAdminUsers();
  return NextResponse.json({
    success: true,
    roles,
    permissions: SYSTEM_PERMISSIONS,
    users,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "assign_user") {
      const { userId, roleId } = body;
      const updatedUser = assignUserRole(userId, roleId);
      if (!updatedUser) {
        return NextResponse.json({ success: false, error: "User or Role not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, user: updatedUser });
    }

    const { name, description, permissions } = body;
    if (!name || !permissions) {
      return NextResponse.json(
        { success: false, error: "Name and permissions are required to create a role" },
        { status: 400 },
      );
    }

    const newRole = createRole({ name, description: description || "", permissions });
    return NextResponse.json({ success: true, role: newRole });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, description, permissions } = body;
    const updated = updateRole(id, { name, description, permissions });
    if (!updated) {
      return NextResponse.json({ success: false, error: "Role not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, role: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Role ID required" }, { status: 400 });
    }
    const ok = deleteRole(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Cannot delete system role" }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: "Role deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
