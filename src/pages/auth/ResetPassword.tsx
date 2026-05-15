import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      setMessage("If this email exists, a password reset instruction will be sent.");
      setTimeout(() => navigate("/signin"), 1500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent px-4 py-10 text-teal-100">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-teal-800/70 bg-teal-950/70 p-8 shadow-2xl shadow-teal-950/40 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Reset Password</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Forgot your password?</h1>
          <p className="mt-2 text-sm leading-6 text-teal-200/80">
            Enter your email and we&apos;ll guide you to reset your password.
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="mb-2 block text-sm font-medium text-teal-200" htmlFor="reset-email">
                Email
              </label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-teal-700 bg-teal-950/60 px-4 py-3 text-teal-50 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                placeholder="you@example.com"
              />
            </div>

            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            {message ? <p className="text-sm text-teal-300">{message}</p> : null}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-teal-500 px-4 py-3 font-semibold text-teal-50 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <Link className="text-teal-200 hover:text-white" to="/signin">
              Back to Sign In
            </Link>
            <Link className="text-teal-200 hover:text-white" to="/signup">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
