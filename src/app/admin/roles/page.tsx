"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Plus,
  Check,
  Trash2,
  Edit2,
  Users,
  Lock,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import {
  Role,
  PermissionKey,
  PermissionDefinition,
  SYSTEM_PERMISSIONS,
  INITIAL_ROLES,
  AdminUser,
} from "@/lib/permissions";
import { useAdmin } from "../layout";

export default function RolesManagementPage() {
  const { can } = useAdmin();
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Role Form State
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<PermissionKey[]>([]);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Group permissions by category
  const categories = ["Events", "Blog", "HubSpot", "Members", "System"] as const;

  const loadData = async () => {
    try {
      const res = await fetch("/api/admin/roles");
      if (res.ok) {
        const data = await res.json();
        if (data.roles) setRoles(data.roles);
        if (data.users) setUsers(data.users);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingRole(null);
    setRoleName("");
    setRoleDescription("");
    setSelectedPermissions([]);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (role: Role) => {
    setEditingRole(role);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setSelectedPermissions(role.permissions);
    setIsModalOpen(true);
  };

  const togglePermission = (permId: PermissionKey) => {
    if (selectedPermissions.includes(permId)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permId));
    } else {
      setSelectedPermissions([...selectedPermissions, permId]);
    }
  };

  const handleSaveRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName) return;

    try {
      if (editingRole) {
        const res = await fetch("/api/admin/roles", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingRole.id,
            name: roleName,
            description: roleDescription,
            permissions: selectedPermissions,
          }),
        });
        if (res.ok) {
          setFeedback({ type: "success", text: `Role "${roleName}" updated successfully.` });
        }
      } else {
        const res = await fetch("/api/admin/roles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: roleName,
            description: roleDescription,
            permissions: selectedPermissions,
          }),
        });
        if (res.ok) {
          setFeedback({ type: "success", text: `Custom role "${roleName}" created successfully.` });
        }
      }

      setIsModalOpen(false);
      loadData();
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message || "Failed to save role." });
    }
  };

  const handleDeleteRole = async (roleId: string, roleName: string) => {
    if (!confirm(`Are you sure you want to delete the role "${roleName}"?`)) return;
    try {
      const res = await fetch(`/api/admin/roles?id=${roleId}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback({ type: "success", text: `Role "${roleName}" deleted.` });
        loadData();
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignUserRole = async (userId: string, roleId: string) => {
    try {
      const res = await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "assign_user",
          userId,
          roleId,
        }),
      });
      if (res.ok) {
        setFeedback({ type: "success", text: "User role updated." });
        setIsUserModalOpen(false);
        loadData();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary mb-2">
            <Shield className="size-3.5" />
            <span>Granular RBAC Engine</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
            Roles & Permissions Builder
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Define custom roles and specify exact capabilities across self-hosted events, blog authoring, HubSpot CRM, and member management.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-secondary hover:bg-secondary/90 px-4 py-2.5 text-xs font-semibold text-black transition shadow-lg shadow-secondary/10 cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Create Custom Role</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`rounded-2xl border p-4 flex items-center gap-3 text-sm ${
            feedback.type === "success"
              ? "border-green-400/30 bg-green-500/10 text-green-200"
              : "border-red-400/30 bg-red-500/10 text-red-200"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="size-5 text-green-400 shrink-0" />
          ) : (
            <AlertCircle className="size-5 text-red-400 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Roles Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {roles.map((role) => (
          <div
            key={role.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
                    <Shield className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-heading">{role.name}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">{role.description}</p>
                  </div>
                </div>

                {role.isSystem ? (
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full shrink-0">
                    System Role
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(role)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition"
                      title="Edit role"
                    >
                      <Edit2 className="size-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role.id, role.name)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                      title="Delete role"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Granted Permissions Pills */}
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Granted Capabilities ({role.permissions.length}):
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                  {role.permissions.map((perm) => (
                    <span
                      key={perm}
                      className="text-[11px] bg-black/40 border border-white/10 text-neutral-300 px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                    >
                      <Check className="size-3 text-secondary" />
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <span>Role ID: <code className="text-neutral-300">{role.id}</code></span>
              <span className="text-secondary font-medium">Ready for user assignment</span>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Users Assignment Section */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white font-heading">Admin Team & User Roles</h2>
            <p className="text-xs text-neutral-400 mt-0.5">Assign volunteer writers, event managers, and coordinators to custom roles.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-black/40 text-[11px] uppercase tracking-wider text-neutral-400 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Current Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition">
                    <td className="px-6 py-4 font-semibold text-white flex items-center gap-3">
                      <div className="size-7 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <span>{user.name}</span>
                    </td>
                    <td className="px-6 py-4 text-neutral-400">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-medium text-[11px]">
                        <Shield className="size-3" />
                        {user.roleName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-green-400" />
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsUserModalOpen(true);
                        }}
                        className="text-xs text-secondary hover:underline font-medium cursor-pointer"
                      >
                        Change Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Role Creation / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="rounded-3xl border border-white/10 bg-[#0E121E] w-full max-w-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  {editingRole ? `Edit Role: ${editingRole.name}` : "Create Custom Role"}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Select the exact permissions and capabilities granted to this role.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRole} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Role Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Volunteer Event Manager, Community Moderator"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe what members with this role are responsible for..."
                    value={roleDescription}
                    onChange={(e) => setRoleDescription(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white placeholder-neutral-500 focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              {/* Permissions Checkbox Grid */}
              <div className="space-y-4 pt-2">
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Select Role Permissions & Capabilities
                </label>

                {categories.map((cat) => {
                  const catPerms = SYSTEM_PERMISSIONS.filter((p) => p.category === cat);
                  return (
                    <div key={cat} className="space-y-2 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <p className="text-xs font-bold text-secondary uppercase tracking-wider">
                        {cat} Module
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {catPerms.map((perm) => {
                          const isChecked = selectedPermissions.includes(perm.id);
                          return (
                            <label
                              key={perm.id}
                              className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${
                                isChecked
                                  ? "border-secondary/40 bg-secondary/10 text-white"
                                  : "border-white/5 bg-white/[0.02] text-neutral-400 hover:border-white/10"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => togglePermission(perm.id)}
                                className="mt-0.5 rounded border-white/20 bg-black text-secondary focus:ring-0"
                              />
                              <div className="text-xs">
                                <p className="font-semibold text-white leading-none">{perm.name}</p>
                                <p className="text-[11px] text-neutral-400 mt-1">{perm.description}</p>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-neutral-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-xs font-bold text-black shadow-lg shadow-secondary/10"
                >
                  {editingRole ? "Save Changes" : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Role Assignment Modal */}
      {isUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="rounded-3xl border border-white/10 bg-[#0E121E] w-full max-w-md p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-heading">
                Assign Role to {selectedUser.name}
              </h3>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 text-neutral-400"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-neutral-400">Choose the role for this team member:</p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleAssignUserRole(selectedUser.id, r.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition flex items-center justify-between ${
                      selectedUser.roleId === r.id
                        ? "border-secondary bg-secondary/10 text-white"
                        : "border-white/10 bg-white/5 text-neutral-300 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{r.name}</p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{r.description}</p>
                    </div>
                    {selectedUser.roleId === r.id && <Check className="size-4 text-secondary" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
