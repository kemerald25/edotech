"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Calendar,
  FileText,
  Database,
  Users,
  LayoutDashboard,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { PermissionId, RoleId, hasPermission } from "@/lib/permissions";
import { getAllRoles, getAdminUser, AdminUser, Role } from "@/lib/data-store";

interface AdminContextType {
  currentUser: AdminUser;
  roles: Role[];
  switchRole: (roleId: RoleId) => void;
  can: (permission: PermissionId) => boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminLayout");
  return context;
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [roles, setRoles] = useState<Role[]>(() => getAllRoles());
  const [currentUser, setCurrentUser] = useState<AdminUser>(() => getAdminUser("user-1")!);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const can = (permission: PermissionId) => {
    return hasPermission(currentUser.assignedRoles, permission);
  };

  const switchRole = (roleId: RoleId) => {
    setCurrentUser((prev) => ({
      ...prev,
      assignedRoles: [roleId],
    }));
    setRoleMenuOpen(false);
  };

  const navItems = [
    {
      label: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      show: true,
    },
    {
      label: "Events & RSVPs",
      href: "/admin/events",
      icon: Calendar,
      show: can("events.create") || can("events.edit") || can("events.view_attendees"),
      badge: "Native",
    },
    {
      label: "Writer Studio",
      href: "/admin/blog",
      icon: FileText,
      show: can("blog.create") || can("blog.edit"),
      badge: "MDX",
    },
    {
      label: "HubSpot CRM",
      href: "/admin/hubspot",
      icon: Database,
      show: can("hubspot.view_crm"),
      badge: "Live API",
    },
    {
      label: "Roles & Permissions",
      href: "/admin/roles",
      icon: Shield,
      show: can("roles.manage"),
      badge: "RBAC",
    },
    {
      label: "Members Guild",
      href: "/admin/members",
      icon: Users,
      show: can("members.view"),
    },
  ];

  return (
    <AdminContext.Provider value={{ currentUser, roles, switchRole, can }}>
      <div className="flex min-h-screen bg-[#07090E] text-white">
        {/* Sidebar */}
        <aside className="w-72 border-r border-white/10 bg-[#0B0E17] flex flex-col justify-between p-6 shrink-0">
          <div className="space-y-8">
            {/* Logo & Portal Badge */}
            <div className="space-y-2">
              <Link href="/" className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition">
                <span>← Back to Public Website</span>
              </Link>
              <div className="flex items-center gap-3 pt-2">
                <div className="size-10 rounded-2xl bg-secondary/15 border border-secondary/40 flex items-center justify-center text-secondary">
                  <ShieldCheck className="size-6" />
                </div>
                <div>
                  <h2 className="font-heading text-base font-bold text-white leading-tight">
                    Edo Tech Admin
                  </h2>
                  <p className="text-[11px] text-neutral-400">Ecosystem Engine</p>
                </div>
              </div>
            </div>

            {/* Current Active Role Switcher */}
            <div className="relative">
              <p className="text-[10px] uppercase font-semibold tracking-wider text-neutral-400 mb-2">
                Simulate / Active Role
              </p>
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/40 transition text-left"
              >
                <div>
                  <p className="text-xs font-bold text-secondary">
                    {roles.find((r) => r.id === currentUser.assignedRoles[0])?.name || currentUser.assignedRoles[0]}
                  </p>
                  <p className="text-[10px] text-neutral-400">Click to switch testing role</p>
                </div>
                <span className="text-xs text-neutral-400">▼</span>
              </button>

              {roleMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl bg-[#0E121E] border border-white/10 p-2 shadow-2xl space-y-1">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => switchRole(r.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                        currentUser.assignedRoles.includes(r.id)
                          ? "bg-secondary text-black font-bold"
                          : "text-neutral-300 hover:bg-white/5"
                      }`}
                    >
                      <span>{r.name}</span>
                      {currentUser.assignedRoles.includes(r.id) && (
                        <CheckCircle2 className="size-3.5" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5 pt-2">
              <p className="text-[10px] uppercase font-semibold tracking-wider text-neutral-400 mb-2 px-3">
                Modules & Studios
              </p>
              {navItems.filter((i) => i.show).map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition ${
                      isActive
                        ? "bg-secondary text-black font-bold shadow-lg shadow-secondary/15"
                        : "text-neutral-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="size-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        isActive ? "bg-black/20 text-black" : "bg-white/10 text-secondary"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User profile footer */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-3">
            <div className="size-9 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary text-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-neutral-400 truncate">{currentUser.email}</p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <main className="flex-1 p-8 sm:p-12 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
}
