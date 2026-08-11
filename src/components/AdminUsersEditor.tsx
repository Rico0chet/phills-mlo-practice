import { useEffect, useState } from "react";
import { Loader2, Plus, ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import {
  listUsers,
  createUser,
  deleteUser,
  setAdminRole,
  type AdminUser,
} from "@/lib/users.functions";

function fmt(date: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function AdminUsersEditor() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [makeAdmin, setMakeAdmin] = useState(false);
  const [creating, setCreating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      setUsers(await listUsers());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError(null);
    setNotice(null);
    try {
      await createUser({
        data: {
          email: email.trim(),
          password: password.trim() || undefined,
          makeAdmin,
        },
      });
      setNotice(`Created ${email.trim()}.`);
      setEmail("");
      setPassword("");
      setMakeAdmin(false);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create user");
    } finally {
      setCreating(false);
    }
  }

  async function toggleAdmin(user: AdminUser) {
    setBusy(user.id);
    setError(null);
    try {
      await setAdminRole({ data: { userId: user.id, isAdmin: !user.isAdmin } });
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update role");
    } finally {
      setBusy(null);
    }
  }

  async function remove(user: AdminUser) {
    setBusy(user.id);
    setError(null);
    try {
      await deleteUser({ data: { userId: user.id } });
      setConfirmDelete(null);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete user");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreate} className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-lg font-semibold text-foreground">Add a user</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Creates a confirmed account immediately. Leave the password blank to let them use the
          "forgot password" flow to set one.
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1 text-sm">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="person@example.com"
              className="w-64 rounded-md border border-border bg-background px-3 py-1.5"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Temporary password (optional)
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              placeholder="min 8 characters"
              className="w-56 rounded-md border border-border bg-background px-3 py-1.5"
            />
          </label>
          <label className="flex items-center gap-2 pb-2 text-sm">
            <input
              type="checkbox"
              checked={makeAdmin}
              onChange={(e) => setMakeAdmin(e.target.checked)}
            />
            Make admin
          </label>
          <button
            type="submit"
            disabled={creating}
            className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add user
          </button>
        </div>
      </form>

      {notice ? (
        <p className="rounded-md border border-border bg-accent px-3 py-2 text-sm">{notice}</p>
      ) : null}
      {error ? (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-lg font-semibold text-foreground">Users ({users.length})</h2>
          <button
            onClick={() => void refresh()}
            className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="px-4 py-6 text-sm text-muted-foreground">Loading users…</p>
        ) : users.length === 0 ? (
          <p className="px-4 py-6 text-sm text-muted-foreground">No users yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {users.map((u) => (
              <li key={u.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">
                    {u.email}
                    {u.isAdmin ? (
                      <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                        Admin
                      </span>
                    ) : null}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Joined {fmt(u.createdAt)} · Last sign-in {fmt(u.lastSignInAt)}
                    {u.confirmed ? "" : " · unconfirmed"}
                  </p>
                </div>

                {confirmDelete === u.id ? (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Delete this user?</span>
                    <button
                      onClick={() => void remove(u)}
                      disabled={busy === u.id}
                      className="rounded-md bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground disabled:opacity-60"
                    >
                      Yes, delete
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => void toggleAdmin(u)}
                      disabled={busy === u.id}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent disabled:opacity-60"
                    >
                      {u.isAdmin ? (
                        <>
                          <ShieldOff className="h-4 w-4" /> Revoke admin
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="h-4 w-4" /> Make admin
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(u.id)}
                      disabled={busy === u.id}
                      className="inline-flex items-center gap-1 rounded-md border border-destructive/40 px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-60"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
