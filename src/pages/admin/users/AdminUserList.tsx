import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import Spinner from "../../../components/common/Spinner";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { Badge, Button, Card } from "../../../components/ui";
import { deleteUser, getAllUsers } from "../../../services/userService";
import type { UserDTO } from "../../../types";

// Admin user management table.
export default function AdminUserList() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<UserDTO | null>(null);

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      setUsers(await getAllUsers());
    } catch {
      setError("Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void load();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteUser(deleteTarget.id);
      toast.success("User deleted.");
      await load();
    } catch {
      toast.error("Unable to delete user.");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Admin Users</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">Manage users</h1>
        </div>

        {loading ? <Spinner /> : null}
        {error ? <p className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-4 text-rose-200">{error}</p> : null}

        {!loading && !error ? (
          <Card className="overflow-x-auto p-0">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-teal-800 text-teal-200">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-teal-900/70">
                    <td className="px-4 py-3 text-white">{user.name}</td>
                    <td className="px-4 py-3 text-teal-200/80">{user.email}</td>
                    <td className="px-4 py-3"><Badge variant="blue">{user.role}</Badge></td>
                    <td className="px-4 py-3"><Button type="button" variant="danger" onClick={() => setDeleteTarget(user)}>Delete</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : null}

        <ConfirmModal
          open={deleteTarget !== null}
          title="Delete User"
          message={`Delete ${deleteTarget?.name ?? "this user"}? This action cannot be undone.`}
          confirmText="Delete"
          loading={false}
          onConfirm={() => void handleDelete()}
          onCancel={() => setDeleteTarget(null)}
        />
      </main>
      <Footer />
    </div>
  );
}
