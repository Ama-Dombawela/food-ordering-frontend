import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Spinner from "../../components/common/Spinner";
import ConfirmModal from "../../components/common/ConfirmModal";
import { Button, Card, Input, Badge } from "../../components/ui";
import { useAuth } from "../../hooks/useAuth";
import { deleteUser, getUserById, updateUser } from "../../services/userService";
import type { UserDTO } from "../../types";

// User profile page with editable name and email fields.
export default function UserProfile() {
  const navigate = useNavigate();
  const { userId, logout } = useAuth();
  const [user, setUser] = useState<UserDTO | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [terminating, setTerminating] = useState(false);
  const [terminateConfirmOpen, setTerminateConfirmOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!userId) {
        setError("Unable to resolve your user id.");
        setLoading(false);
        return;
      }

      try {
        const loadedUser = await getUserById(userId);
        setUser(loadedUser);
        setName(loadedUser.name);
        setEmail(loadedUser.email);
      } catch {
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [userId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !userId) {
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const updated = await updateUser(userId, { name, email });
      setUser(updated);
      toast.success("Profile saved successfully.");
    } catch {
      toast.error("Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleTerminate = async () => {
    if (!userId) {
      return;
    }

    setTerminating(true);

    try {
      await deleteUser(userId);
      logout();
      navigate("/signup", { replace: true });
      toast.success("Account terminated.");
    } catch {
      toast.error("Unable to terminate account.");
    } finally {
      setTerminating(false);
      setTerminateConfirmOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-teal-300">Profile</p>
            <h2 className="mt-2 text-4xl font-semibold text-white">My profile</h2>
          </div>
        </div>

        {loading ? <Spinner /> : null}
        {error ? <p className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">{error}</p> : null}
        {message ? <p className="mb-4 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-200">{message}</p> : null}

        {!loading && user ? (
          <Card className="space-y-8 border-teal-800 bg-black/50 p-12">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-white">{user.name}</h2>
                <p className="text-teal-200/80">{user.email}</p>
              </div>
              <div className="ml-auto flex shrink-0 justify-end pl-10">
                <Badge variant="blue">{user.role}</Badge>
              </div>
            </div>

            <form className="grid gap-4 pt-2" onSubmit={handleSubmit}>
              <Input label="Name" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} />
              <Input label="Email" placeholder="Your email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Button type="submit" variant="secondary" loading={saving} className="rounded-xl px-4 py-2">
                  Save
                </Button>
                <Button type="button" variant="danger" loading={terminating} disabled={terminating || saving} onClick={() => setTerminateConfirmOpen(true)} className="rounded-xl px-4 py-2">
                  Terminate
                </Button>
              </div>
            </form>
          </Card>
        ) : null}
        <ConfirmModal
          open={terminateConfirmOpen}
          title="Terminate Account"
          message="Terminate your account? This action cannot be undone."
          confirmText="Terminate"
          loading={terminating}
          onConfirm={() => void handleTerminate()}
          onCancel={() => setTerminateConfirmOpen(false)}
        />
      </main>
      <Footer />
    </div>
  );
}
