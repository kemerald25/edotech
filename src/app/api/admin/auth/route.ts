import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  authenticateAdmin,
  getAuthenticatedAdminServer,
  AUTH_COOKIE_NAME,
} from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthenticatedAdminServer();
    if (!user) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }
    return NextResponse.json({ success: true, user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Authentication error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const account = authenticateAdmin(email, password);
    if (!account) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or designated password. Only provisioned admin emails can access this route.",
        },
        { status: 401 }
      );
    }

    const { password: _, ...safeUser } = account;

    // Set secure HTTP-only session cookie
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, JSON.stringify(safeUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days session
    });

    return NextResponse.json({
      success: true,
      user: safeUser,
      message: `Welcome back, ${safeUser.name}!`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Logout failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
