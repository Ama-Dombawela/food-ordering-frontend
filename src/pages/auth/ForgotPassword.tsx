import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Input } from "../../components/ui";
import Footer from "../../components/common/Footer";

// Public forgot-password screen that validates the email before showing success feedback.
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setLoading(true);
    try {
      setMessage("If the account exists, a reset link has been prepared.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-teal-100">
      <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-md items-center px-4 py-10">
        <Card className="w-full space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Forgot Password</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Send a reset link</h1>
            <p className="mt-2 text-sm text-teal-200/80">Enter your email and we&apos;ll help you recover access.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} error={error} />
            {message ? <p className="text-sm text-teal-300">{message}</p> : null}
            <Button type="submit" loading={loading} fullWidth>
              Send Reset Link
            </Button>
          </form>
          <div className="flex items-center justify-between text-sm text-teal-200/80">
            <Link to="/signin" className="hover:text-white">Back to Sign In</Link>
            <Link to="/reset-password" className="hover:text-white">Reset Password</Link>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
