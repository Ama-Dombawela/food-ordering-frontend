import { useState } from "react";
import type { FormEvent } from "react";
import { Button, Input, Card } from "../ui";

interface SignInFormProps {
  onSubmit: (data: { email: string; password: string }) => void | Promise<void>;
  loading?: boolean;
  error?: string;
}

type SignInFormSubmitEvent = FormEvent<HTMLFormElement>;

// Central sign-in form used by the public authentication page.
export default function SignInForm({ onSubmit, loading = false, error }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Submit the current credentials without exposing the form state to the parent.
  const handleSubmit = async (event: SignInFormSubmitEvent) => {
    event.preventDefault();
    await onSubmit({ email, password });
  };

  return (
    <Card>
      {/* Credentials are collected locally and validated by the parent flow. */}
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Input label="Email" type="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} />
        {/* Surface submission failures in place without clearing the entered values. */}
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        <Button type="submit" loading={loading} fullWidth>
          Sign In
        </Button>
      </form>
    </Card>
  );
}
