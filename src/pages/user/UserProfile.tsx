import { useEffect, useState, type FormEvent } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Spinner from "../../components/common/Spinner";
import { Button, Card, Input, Badge } from "../../components/ui";
import { useAuth } from "../../hooks/useAuth";
import { getUserById, updateUser } from "../../services/userService";
import type { UserDTO } from "../../types";

// User profile page with editable name and email fields.
export default function UserProfile() {
  const { userId } = useAuth();
  const [user, setUser] = useState<UserDTO | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
      setMessage("Profile saved successfully.");
    } catch {
      setError("Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-teal-100">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Profile</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">My profile</h1>
        </div>

        {loading ? <Spinner /> : null}
        {error ? <p className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">{error}</p> : null}
        {message ? <p className="mb-4 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-200">{message}</p> : null}

        {!loading && user ? (
          <Card className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">{user.name}</h2>
                <p className="text-teal-200/80">{user.email}</p>
              </div>
              <Badge variant="blue">{user.role}</Badge>
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <Input label="Name" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} />
              <Input label="Email" placeholder="Your email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <Button type="submit" loading={saving}>
                Save
              </Button>
            </form>
          </Card>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
