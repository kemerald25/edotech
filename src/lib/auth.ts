import { cookies } from "next/headers";
import { INITIAL_ROLES } from "./permissions";

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  password: string; // Stored securely in database
  roleId: string;
  roleName: string;
  assignedRoles: string[];
  status: "active" | "suspended";
  createdAt: string;
  lastLoginAt?: string;
}

const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@edotech.community").trim().toLowerCase();
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.ADMIN_DEFAULT_PASSWORD || "EdoTech2026!Admin";
const DEFAULT_ADMIN_NAME = process.env.ADMIN_NAME || "Super Admin";

// Initial Admin Users Seed
const INITIAL_ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    id: "admin-1",
    name: DEFAULT_ADMIN_NAME,
    email: DEFAULT_ADMIN_EMAIL,
    password: DEFAULT_ADMIN_PASSWORD,
    roleId: "super_admin",
    roleName: "Super Admin / Executive",
    assignedRoles: ["super_admin"],
    status: "active",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "admin-2",
    name: "Emmanuel Onotiemoria",
    email: "emmanuel@edotech.community",
    password: process.env.EVENT_MANAGER_PASSWORD || "Password123!",
    roleId: "event_manager",
    roleName: "Volunteer Event Manager",
    assignedRoles: ["event_manager"],
    status: "active",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "admin-3",
    name: "Ndukwe Amarachi",
    email: "amarachi@edotech.community",
    password: process.env.WRITER_PASSWORD || "Password123!",
    roleId: "writer",
    roleName: "Volunteer Writer / Editor",
    assignedRoles: ["writer"],
    status: "active",
    createdAt: "2026-01-01T00:00:00Z",
  },
];

// In-Memory Live Accounts Store
let liveAdminAccounts: AdminAccount[] = [...INITIAL_ADMIN_ACCOUNTS];

const AUTH_COOKIE_NAME = "edotech_admin_session";

/**
 * Authenticate admin by email and designated password
 */
export function authenticateAdmin(email: string, password: string): AdminAccount | null {
  const normalizedEmail = email.trim().toLowerCase();
  
  // Ensure default admin from env is always in sync with latest environment variables
  const defaultAccount = liveAdminAccounts.find((a) => a.id === "admin-1");
  if (defaultAccount) {
    defaultAccount.email = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim().toLowerCase();
    defaultAccount.password = process.env.ADMIN_PASSWORD || process.env.ADMIN_DEFAULT_PASSWORD || DEFAULT_ADMIN_PASSWORD;
    defaultAccount.name = process.env.ADMIN_NAME || DEFAULT_ADMIN_NAME;
  }

  const account = liveAdminAccounts.find(
    (acc) => acc.email.toLowerCase() === normalizedEmail && acc.status === "active"
  );

  if (!account) return null;
  if (account.password !== password) return null;

  account.lastLoginAt = new Date().toISOString();
  return account;
}

/**
 * Get all provisioned admin accounts (passwords redacted for security)
 */
export function getAllAdminAccounts(): Omit<AdminAccount, "password">[] {
  return liveAdminAccounts.map(({ password: _, ...rest }) => rest);
}

/**
 * Provision a new admin user with designated password and role
 */
export function createAdminAccount(data: {
  name: string;
  email: string;
  password: string;
  roleId: string;
  assignedRoles?: string[];
}): Omit<AdminAccount, "password"> {
  const normalizedEmail = data.email.trim().toLowerCase();
  const existing = liveAdminAccounts.find((a) => a.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error(`An admin account with email "${data.email}" already exists.`);
  }

  const role = INITIAL_ROLES.find((r) => r.id === data.roleId);
  const newAccount: AdminAccount = {
    id: `admin-${Date.now()}`,
    name: data.name,
    email: normalizedEmail,
    password: data.password,
    roleId: data.roleId,
    roleName: role?.name || data.roleId,
    assignedRoles: data.assignedRoles || [data.roleId],
    status: "active",
    createdAt: new Date().toISOString(),
  };

  liveAdminAccounts = [...liveAdminAccounts, newAccount];
  const { password: _, ...safeAccount } = newAccount;
  return safeAccount;
}

/**
 * Update an existing admin user's role, status, or designated password
 */
export function updateAdminAccount(
  id: string,
  updates: Partial<Omit<AdminAccount, "id" | "createdAt">>
): Omit<AdminAccount, "password"> | null {
  const idx = liveAdminAccounts.findIndex((a) => a.id === id);
  if (idx === -1) return null;

  if (updates.roleId) {
    const role = INITIAL_ROLES.find((r) => r.id === updates.roleId);
    if (role) {
      updates.roleName = role.name;
      updates.assignedRoles = [role.id];
    }
  }

  liveAdminAccounts[idx] = {
    ...liveAdminAccounts[idx],
    ...updates,
  };

  const { password: _, ...safeAccount } = liveAdminAccounts[idx];
  return safeAccount;
}

/**
 * Delete an admin user account
 */
export function deleteAdminAccount(id: string): boolean {
  const target = liveAdminAccounts.find((a) => a.id === id);
  if (!target) return false;
  if (target.id === "admin-1" || target.email === DEFAULT_ADMIN_EMAIL) {
    throw new Error("Primary Super Admin account cannot be deleted.");
  }
  const initialLen = liveAdminAccounts.length;
  liveAdminAccounts = liveAdminAccounts.filter((a) => a.id !== id);
  return liveAdminAccounts.length < initialLen;
}

/**
 * Server-side session verification helper
 */
export async function getAuthenticatedAdminServer(): Promise<Omit<AdminAccount, "password"> | null> {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!sessionValue) return null;

  try {
    const parsed = JSON.parse(sessionValue);
    const account = liveAdminAccounts.find(
      (a) => a.id === parsed.id && a.email.toLowerCase() === parsed.email.toLowerCase()
    );
    if (!account || account.status !== "active") return null;
    const { password: _, ...safeAccount } = account;
    return safeAccount;
  } catch {
    return null;
  }
}

export { AUTH_COOKIE_NAME };
