"use client";

import { useEffect, useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  FileText,
  Users,
  Shield,
  Database,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Role, INITIAL_ROLES, hasPermission, PermissionKey } from "@/lib/permissions";

interface AdminContextType {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  can: (permission: PermissionKey) => boolean;
}

const AdminContext = createContext<AdminContextType>({
  currentRole: INITIAL_ROLES[0],
  setCurrentRole: () => {},
  can: () => true,
});

export const useAdmin = () => useContext(AdminContext);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentRole, setCurrentRole] = useState<Role>(INITIAL_ROLES[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Helper to check permission
  const can = (permission: PermissionKey) => {
    return hasPermission(currentRole, permission);
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: Sparkles,
      visible: true,
    },
    {
      label: "Events & RSVPs",
      href: "/admin/events",
      icon: Calendar,
      visible: can("events.create") || can("events.edit") || can("events.view_attendees"),
      badge: "Hosting",
    },
    {
      label: "HubSpot CRM",
      href: "/admin/hubspot",
      icon: Database,
      visible: can("hubspot.view_crm") || can("hubspot.trigger_sync"),
      badge: "Synced",
    },
    {
      label: "Blog & Publications",
      href: "/admin/blog",
      icon: FileText,
      visible: can("blog.create") || can("blog.edit"),
      badge: "Writers",
    },
    {
      label: "Members & Leads",
      href: "/admin/members",
      icon: Users,
      visible: can("members.view") || can("members.manage"),
    },
    {
      label: "Roles & Permissions",
      href: "/admin/roles",
      icon: Shield,
      visible: can("roles.manage") || can("users.manage"),
      badge: "Super Admin",
    },
  ];

  return (
    <AdminContext.Provider value={{ currentRole, setCurrentRole, can }}>
      <div className="min-h-screen bg-[#07090E] text-white flex flex-col md:flex-row">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-secondary flex items-center justify-center font-bold text-black text-sm">
              ETC
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">Edo Tech Admin</p>
              <p className="text-[11px] text-secondary mt-0.5">{currentRole.name}</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300"
          >
            {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0B0E17]/95 border-r border-white/10 p-6 flex flex-col justify-between backdrop-blur-xl transition-transform duration-300 md:translate-x-0 md:static ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="space-y-6">
            {/* Brand Logo */}
            <div className="flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-3 group">
                <div className="size-10 rounded-2xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-glow">
                  <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center font-bold text-secondary text-sm">
                    ETC
                  </div>
                </div>
                <div>
                  <h1 className="font-heading font-bold text-base text-white tracking-wide">
                    Edo Tech Guild
                  </h1>
                  <p className="text-[11px] text-neutral-400">Admin Ecosystem</p>
                </div>
              </Link>
            </div>

            {/* Active Role Selector Tool */}
            <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs text-secondary font-medium">
                <span className="flex items-center gap-1.5">
                  <Shield className="size-3.5" />
                  Active Role
                </span>
                <span className="text-[10px] uppercase tracking-wider bg-secondary/20 px-2 py-0.5 rounded-full">
                  RBAC Mode
                </span>
              </div>
              <select
                value={currentRole.id}
                onChange={(e) => {
                  const selected = INITIAL_ROLES.find((r) => r.id === e.target.value);
                  if (selected) setCurrentRole(selected);
                }}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-secondary transition cursor-pointer"
              >
                {INITIAL_ROLES.map((r) => (
                  <option key={r.id} value={r.id} className="bg-[#0B0E17] text-white">
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5 pt-2">
              {navItems
                .filter((item) => item.visible)
                .map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition group ${
                        isActive
                          ? "bg-secondary text-black font-semibold shadow-md"
                          : "text-neutral-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`size-4.5 ${isActive ? "text-black" : "text-neutral-400 group-hover:text-secondary"}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isActive
                              ? "bg-black/20 text-black font-bold"
                              : "bg-white/10 text-neutral-400"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
            </nav>
          </div>

          {/* Footer Back to Site */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-xs text-neutral-400 hover:text-secondary transition px-3 py-2 rounded-xl hover:bg-white/5"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </AdminContext.Provider>
  );
}
