export type PermissionKey =
  | "events.create"
  | "events.edit"
  | "events.publish"
  | "events.delete"
  | "events.view_attendees"
  | "events.export_csv"
  | "blog.create"
  | "blog.edit"
  | "blog.publish"
  | "blog.delete"
  | "hubspot.view_crm"
  | "hubspot.trigger_sync"
  | "hubspot.manage_settings"
  | "members.view"
  | "members.manage"
  | "members.export"
  | "roles.manage"
  | "users.manage";

export interface PermissionDefinition {
  id: PermissionKey;
  name: string;
  description: string;
  category: "Events" | "Blog" | "HubSpot" | "Members" | "System";
}

export const SYSTEM_PERMISSIONS: PermissionDefinition[] = [
  {
    id: "events.create",
    name: "Create Events",
    description: "Can create new events, schedule dates, and save drafts",
    category: "Events",
  },
  {
    id: "events.edit",
    name: "Edit Events",
    description: "Can update event details, banners, and venues",
    category: "Events",
  },
  {
    id: "events.publish",
    name: "Publish Events",
    description: "Can toggle event status to public live mode",
    category: "Events",
  },
  {
    id: "events.delete",
    name: "Delete Events",
    description: "Can permanently remove events from the platform",
    category: "Events",
  },
  {
    id: "events.view_attendees",
    name: "View RSVPs & Attendees",
    description: "Can view registered attendees and contact info",
    category: "Events",
  },
  {
    id: "events.export_csv",
    name: "Export Attendee CSV",
    description: "Can download attendee spreadsheets",
    category: "Events",
  },
  {
    id: "blog.create",
    name: "Create Blog Posts",
    description: "Can author and draft new blog articles",
    category: "Blog",
  },
  {
    id: "blog.edit",
    name: "Edit Blog Posts",
    description: "Can edit existing articles and MDX content",
    category: "Blog",
  },
  {
    id: "blog.publish",
    name: "Publish Blog Posts",
    description: "Can publish articles live to the public blog",
    category: "Blog",
  },
  {
    id: "blog.delete",
    name: "Delete Blog Posts",
    description: "Can remove blog posts",
    category: "Blog",
  },
  {
    id: "hubspot.view_crm",
    name: "View HubSpot CRM Data",
    description: "Can explore synced contacts, deals, and companies",
    category: "HubSpot",
  },
  {
    id: "hubspot.trigger_sync",
    name: "Trigger HubSpot Sync",
    description: "Can run manual two-way sync with HubSpot CRM API",
    category: "HubSpot",
  },
  {
    id: "hubspot.manage_settings",
    name: "Manage HubSpot API Keys",
    description: "Can configure portal IDs and API tokens",
    category: "HubSpot",
  },
  {
    id: "members.view",
    name: "View Members",
    description: "Can view the membership directory and applications",
    category: "Members",
  },
  {
    id: "members.manage",
    name: "Manage Members",
    description: "Can approve, reject, or edit member profiles",
    category: "Members",
  },
  {
    id: "members.export",
    name: "Export Members",
    description: "Can export membership data as CSV",
    category: "Members",
  },
  {
    id: "roles.manage",
    name: "Manage Roles & Permissions",
    description: "Can create custom roles and configure capabilities",
    category: "System",
  },
  {
    id: "users.manage",
    name: "Manage Admin Users",
    description: "Can invite users and assign roles",
    category: "System",
  },
];

export interface Role {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  permissions: PermissionKey[];
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  avatarUrl?: string;
  status: "active" | "invited" | "suspended";
}

export const INITIAL_ROLES: Role[] = [
  {
    id: "super_admin",
    name: "Super Admin / Executive",
    description: "Full unrestricted access across all platform modules and system settings",
    isSystem: true,
    permissions: SYSTEM_PERMISSIONS.map((p) => p.id),
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "event_manager",
    name: "Volunteer Event Manager",
    description: "Host, schedule, manage events, and track attendee RSVPs",
    isSystem: true,
    permissions: [
      "events.create",
      "events.edit",
      "events.publish",
      "events.view_attendees",
      "events.export_csv",
      "hubspot.view_crm",
    ],
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "writer",
    name: "Volunteer Writer / Editor",
    description: "Author, edit, and manage articles and MDX publications",
    isSystem: true,
    permissions: ["blog.create", "blog.edit", "blog.publish"],
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "crm_lead",
    name: "Partnerships & CRM Lead",
    description: "Manage partner organizations, HubSpot CRM records, and deals",
    isSystem: true,
    permissions: [
      "hubspot.view_crm",
      "hubspot.trigger_sync",
      "members.view",
      "members.manage",
      "members.export",
    ],
    createdAt: "2026-01-01T00:00:00Z",
  },
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "usr-1",
    name: "Daniel Ose",
    email: "daniel@edotech.community",
    roleId: "super_admin",
    roleName: "Super Admin / Executive",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    status: "active",
  },
  {
    id: "usr-2",
    name: "Emmanuel Onotiemoria",
    email: "emmanuel@edotech.community",
    roleId: "event_manager",
    roleName: "Volunteer Event Manager",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    status: "active",
  },
  {
    id: "usr-3",
    name: "Ndukwe Amarachi",
    email: "amarachi@edotech.community",
    roleId: "writer",
    roleName: "Volunteer Writer / Editor",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    status: "active",
  },
];

export function hasPermission(
  userRole: Role | undefined,
  requiredPermission: PermissionKey,
): boolean {
  if (!userRole) return false;
  if (userRole.id === "super_admin") return true;
  return userRole.permissions.includes(requiredPermission);
}

export function hasAnyPermission(
  userRole: Role | undefined,
  requiredPermissions: PermissionKey[],
): boolean {
  if (!userRole) return false;
  if (userRole.id === "super_admin") return true;
  return requiredPermissions.some((perm) => userRole.permissions.includes(perm));
}
