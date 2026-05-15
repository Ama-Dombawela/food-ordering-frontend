import { useState, type FormEvent } from "react";
import { Button, Input, Card } from "../ui";
import type { Role } from "../../types";

interface SignUpFormProps {
  onSubmit: (data: { name: string; email: string; password: string; role: Role }) => void | Promise<void>;
  loading?: boolean;
  error?: string;
}

// Central sign-up form used by the public auth page.
export default function SignUpForm({ onSubmit, loading = false, error }: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("CUSTOMER");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({ name, email, password, role });
  };

  return (
    <Card>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Input label="Name" placeholder="Your full name" value={name} onChange={(event) => setName(event.target.value)} />
        <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input label="Password" type="password" placeholder="Create a strong password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <label className="block space-y-2">
          <span className="text-sm font-medium text-teal-200">Role</span>
          <select value={role} onChange={(event) => setRole(event.target.value as Role)} className="w-full rounded-2xl border border-teal-700 bg-teal-950/60 px-4 py-3 text-teal-50 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20">
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </label>
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        <Button type="submit" loading={loading} fullWidth>
          Create Account
        </Button>
      </form>
    </Card>
  );
}
