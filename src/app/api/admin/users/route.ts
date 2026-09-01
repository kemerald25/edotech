import { NextResponse } from "next/server";
import {
  getAllAdminAccounts,
  createAdminAccount,
  updateAdminAccount,
  deleteAdminAccount,
  getAuthenticatedAdminServer,
} from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";

export async function GET() {
  try {
    const caller = await getAuthenticatedAdminServer();
    if (!caller) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const users = getAllAdminAccounts();
    return NextResponse.json({ success: true, users });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch users";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const caller = await getAuthenticatedAdminServer();
    if (!caller || !hasPermission(caller.assignedRoles, "users.manage")) {
      return NextResponse.json(
        { success: false, error: "Forbidden. Only Super Admins can provision new admin users." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, email, password, roleId } = body;

    if (!name || !email || !password || !roleId) {
      return NextResponse.json(
        {
          success: false,
          error: "Full name, email, designated initial password, and role are required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Designated password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const user = createAdminAccount({
      name,
      email,
      password,
      roleId,
    });

    return NextResponse.json({
      success: true,
      user,
      message: `Admin user for "${email}" provisioned successfully with role "${user.roleName}".`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create user";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const caller = await getAuthenticatedAdminServer();
    if (!caller || !hasPermission(caller.assignedRoles, "users.manage")) {
      return NextResponse.json(
        { success: false, error: "Forbidden. Only Super Admins can update admin users." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
    }

    const updated = updateAdminAccount(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update user";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const caller = await getAuthenticatedAdminServer();
    if (!caller || !hasPermission(caller.assignedRoles, "users.manage")) {
      return NextResponse.json(
        { success: false, error: "Forbidden. Only Super Admins can delete admin users." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
    }

    const deleted = deleteAdminAccount(id);
    return NextResponse.json({ success: deleted });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete user";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
