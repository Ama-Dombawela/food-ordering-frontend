import { useState, type FormEvent } from "react";
import { Button, Input, Card } from "../ui";

interface SignInFormProps {
  onSubmit: (data: { email: string; password: string }) => void | Promise<void>;
  loading?: boolean;
  error?: string;
}

// Central sign-in form used by the public auth page.
export default function SignInForm({ onSubmit, loading = false, error }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({ email, password });
  };

  return (
    <Card>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} />
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        <Button type="submit" loading={loading} fullWidth>
          Sign In
        </Button>
      </form>
    </Card>
  );
}
