import { useState, type FormEvent } from "react";
import { Button, Input, Card } from "../ui";

interface SignUpFormProps {
  onSubmit: (data: { name: string; email: string; password: string }) => void | Promise<void>;
  loading?: boolean;
  error?: string;
}

// Central sign-up form used by the public authentication page.
export default function SignUpForm({ onSubmit, loading = false, error }: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Submit the registration payload while keeping the component state internal.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({ name, email, password });
  };

  return (
    <Card>
      {/* Registration data is collected locally and passed upward on submit. */}
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Input label="Name" placeholder="Enter your full name" value={name} onChange={(event) => setName(event.target.value)} />
        <Input label="Email" type="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} />
        {/* Display registration errors without discarding the entered details. */}
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        <Button type="submit" loading={loading} fullWidth>
          Create Account
        </Button>
      </form>
    </Card>
  );
}