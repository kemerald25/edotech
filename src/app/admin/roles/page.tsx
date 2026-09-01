"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Plus,
  CheckCircle2,
  Trash2,
  X,
} from "lucide-react";
import {
  ALL_PERMISSIONS,
  PermissionId,
  SYSTEM_PERMISSIONS_CATALOG,
} from "@/lib/permissions";
import { Role, getAllRoles } from "@/lib/data-store";

export default function RolesAdminPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<PermissionId[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadRoles = async () => {
    try {
      const res = await fetch("/api/admin/roles");
      if (res.ok) {
        const data = await res.json();
        setRoles(data.roles || getAllRoles());
      }
    } catch {
      setRoles(getAllRoles());
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const togglePermission = (permId: PermissionId) => {
    if (selectedPermissions.includes(permId)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permId));
    } else {
      setSelectedPermissions([...selectedPermissions, permId]);
    }
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName) return;

    try {
      const res = await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: roleName,
          description: roleDescription,
          permissions: selectedPermissions,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback(`Role "${roleName}" created successfully with ${selectedPermissions.length} permissions.`);
        setIsCreateModalOpen(false);
        setRoleName("");
        setRoleDescription("");
        setSelectedPermissions([]);
        loadRoles();
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error creating role";
      setFeedback(message);
    }
  };

  const handleDeleteRole = async (roleId: string, roleTitle: string) => {
    if (!confirm(`Are you sure you want to delete the role "${roleTitle}"?`)) return;

    try {
      const res = await fetch(`/api/admin/roles?id=${roleId}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback(`Role "${roleTitle}" deleted.`);
        loadRoles();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error deleting role";
      setFeedback(message);
    }
  };

  const permissionCategories = [
    { title: "Events & RSVPs", prefix: "events." },
    { title: "Blog & Publications", prefix: "blog." },
    { title: "HubSpot CRM & Leads", prefix: "hubspot." },
    { title: "Members Directory", prefix: "members." },
    { title: "System & Roles Governance", prefix: "roles." },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary mb-2">
            <Shield className="size-3.5" />
            <span>Role-Based Access Control Engine (RBAC)</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
            Roles & Granular Permissions Builder
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Create customized roles for volunteer event managers, editorial writers, CRM specialists, and grant leads.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedPermissions(["events.create", "events.view_attendees"]);
            setIsCreateModalOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-secondary hover:bg-secondary/90 px-4 py-2.5 text-xs font-bold text-black transition shadow-lg shadow-secondary/10 cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Create Custom Role</span>
        </button>
      </div>

      {feedback && (
        <div className="rounded-2xl border border-green-400/30 bg-green-500/10 p-4 flex items-center gap-3 text-sm text-green-200">
          <CheckCircle2 className="size-5 text-green-400 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Roles Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {roles.map((role) => (
          <div
            key={role.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 space-y-6 flex flex-col justify-between relative overflow-hidden transition hover:border-white/20"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white font-heading">{role.name}</h3>
                    {role.isSystem ? (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-secondary bg-secondary/10 border border-secondary/30 px-2.5 py-0.5 rounded-full">
                        System Built-in
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
                        Custom Role
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{role.description}</p>
                </div>

                {!role.isSystem && (
                  <button
                    onClick={() => handleDeleteRole(role.id, role.name)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                    title="Delete custom role"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>

              {/* Granted Capabilities List */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                  Granted Capabilities ({role.permissions.length})
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {role.permissions.map((perm) => (
                    <span
                      key={perm}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-neutral-300 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="size-3 text-secondary" />
                      <span>{perm}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Custom Role Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="rounded-3xl border border-white/10 bg-[#0E121E] w-full max-w-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Create Custom Community Role
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Define a tailored set of permissions for volunteer leads and specialists.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Role Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Volunteer Event Manager, Editorial Writer, CRM Specialist"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Description & Key Scope
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Manages scheduling of physical and virtual sprints in Benin Hub and tracks RSVPs."
                    value={roleDescription}
                    onChange={(e) => setRoleDescription(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-xs text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              {/* Permission Checkbox Matrix */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white font-heading">
                      Select Key Capabilities & Access
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Check all operations this custom role is permitted to perform.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-secondary font-mono">
                    {selectedPermissions.length} / {ALL_PERMISSIONS.length} selected
                  </span>
                </div>

                <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                  {permissionCategories.map((cat) => {
                    const catPermissions = SYSTEM_PERMISSIONS_CATALOG.filter((p) =>
                      p.id.startsWith(cat.prefix) || (cat.prefix === "roles." && p.id.startsWith("users."))
                    );

                    return (
                      <div key={cat.title} className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
                        <p className="text-xs font-bold text-secondary uppercase tracking-wider">
                          {cat.title}
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {catPermissions.map((p) => {
                            const isChecked = selectedPermissions.includes(p.id);
                            return (
                              <label
                                key={p.id}
                                className={`flex items-start gap-2.5 p-2 rounded-xl border transition cursor-pointer text-xs ${
                                  isChecked
                                    ? "border-secondary/50 bg-secondary/10 text-white"
                                    : "border-white/5 bg-white/[0.02] text-neutral-400 hover:border-white/20"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => togglePermission(p.id)}
                                  className="mt-0.5 rounded border-white/20 bg-black text-secondary focus:ring-0"
                                />
                                <div>
                                  <p className="font-semibold text-white">{p.name}</p>
                                  <p className="text-[10px] text-neutral-400">{p.description}</p>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-neutral-300 hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-xs font-bold text-black shadow-lg shadow-secondary/10 transition"
                >
                  Save & Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
