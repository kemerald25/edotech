"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Shield,
  Trash2,
  CheckCircle2,
  X,
} from "lucide-react";
import { AdminAccount } from "@/lib/auth";
import { useAdmin } from "../layout";

export default function AdminUsersPage() {
  const { can, roles } = useAdmin();
  const [users, setUsers] = useState<AdminAccount[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // New User Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("event_manager");
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          roleId: selectedRole,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback(data.message || `Admin user "${email}" provisioned.`);
        setIsAddModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        loadUsers();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(data.error || "Failed to provision user");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error creating user";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (!confirm(`Revoke admin access for "${userEmail}"?`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback(`Admin access revoked for "${userEmail}".`);
        loadUsers();
        setTimeout(() => setFeedback(null), 3000);
      } else {
        const data = await res.json();
        alert(data.error || "Cannot delete this user.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error deleting user";
      alert(message);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary mb-2">
            <Users className="size-3.5" />
            <span>Admin Staff Directory & Credentials</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
            Provisioned Admin Accounts
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Manage designated staff emails, login passwords, and granted role privileges.
          </p>
        </div>

        {can("users.manage") && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-secondary hover:bg-secondary/90 px-4 py-2.5 text-xs font-bold text-black transition shadow-lg shadow-secondary/10 cursor-pointer"
          >
            <Plus className="size-4" />
            <span>Provision New Admin User</span>
          </button>
        )}
      </div>

      {feedback && (
        <div className="rounded-2xl border border-green-400/30 bg-green-500/10 p-4 flex items-center gap-3 text-sm text-green-200">
          <CheckCircle2 className="size-5 text-green-400 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-black/40 text-[11px] uppercase tracking-wider text-neutral-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Admin Staff Member</th>
                <th className="px-6 py-4">Email (Login ID)</th>
                <th className="px-6 py-4">Assigned Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{user.name}</p>
                        <p className="text-[10px] text-neutral-400 font-mono">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-neutral-200">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/30">
                      <Shield className="size-3" />
                      <span>{user.roleName}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/30">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-400">
                    {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "Never"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {can("users.manage") && user.email !== "admin@edotech.community" && (
                      <button
                        onClick={() => handleDeleteUser(user.id, user.email)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                        title="Revoke Admin Access"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="rounded-3xl border border-white/10 bg-[#0E121E] w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Provision Admin Account
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Designate an authorized email and initial login password.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Osas Iyamu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                  Authorized Staff Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="osas@edotech.community"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                  Designated Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                  Assigned Platform Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-xs text-white focus:border-secondary focus:outline-none"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.permissions.length} capabilities)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-neutral-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-xs font-bold text-black shadow-lg shadow-secondary/10"
                >
                  {loading ? "Provisioning..." : "Create Staff Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
