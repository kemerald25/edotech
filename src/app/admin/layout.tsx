"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Shield,
  Calendar,
  FileText,
  Database,
  Users,
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  UserCheck,
} from "lucide-react";
import { PermissionId, Role, hasPermission } from "@/lib/permissions";
import { getAllRoles } from "@/lib/data-store";

interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  assignedRoles: string[];
  status: string;
}

interface AdminContextType {
  currentUser: AuthenticatedUser;
  roles: Role[];
  can: (permission: PermissionId) => boolean;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminLayout");
  return context;
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [roles] = useState<Role[]>(() => getAllRoles());
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(true);

  // If on login page, render child directly without sidebar/guard
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setCurrentUser(data.user);
          } else {
            router.push("/admin/login");
          }
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [pathname, isLoginPage, router]);

  const can = (permission: PermissionId) => {
    if (!currentUser) return false;
    return hasPermission(currentUser.assignedRoles, permission);
  };

  const logout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
      router.push("/admin/login");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090E] flex items-center justify-center text-neutral-400 text-xs">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-secondary animate-ping" />
          <span>Verifying admin session...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

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
      label: "Staff & Users",
      href: "/admin/users",
      icon: UserCheck,
      show: can("users.manage"),
      badge: "Auth",
    },
    {
      label: "Members Guild",
      href: "/admin/members",
      icon: Users,
      show: can("members.view"),
    },
  ];

  return (
    <AdminContext.Provider value={{ currentUser, roles, can, logout }}>
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
                  <p className="text-[11px] text-neutral-400">Authenticated Portal</p>
                </div>
              </div>
            </div>

            {/* Authenticated User Role Badge */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                Logged In Role
              </p>
              <p className="text-xs font-bold text-secondary">
                {currentUser.roleName}
              </p>
              <p className="text-[11px] text-neutral-400 truncate">{currentUser.email}</p>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5 pt-1">
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

          {/* User Profile & Sign Out Footer */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-8 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary text-xs shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-neutral-400 truncate">{currentUser.email}</p>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="size-4" />
              </button>
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
