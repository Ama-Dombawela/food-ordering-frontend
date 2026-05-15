import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import type { Role } from "../../types";

type FieldErrors = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("CUSTOMER");
  const [errors, setErrors] = useState<FieldErrors>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    const nextErrors: FieldErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters long.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirm password is required.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (nextErrors.name || nextErrors.email || nextErrors.password || nextErrors.confirmPassword) {
      setErrors(nextErrors);
      return;
    }

    setErrors({ name: "", email: "", password: "", confirmPassword: "" });
    setIsLoading(true);

    try {
      await registerUser(name.trim(), email, password, role);
      navigate("/signin");
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setSubmitError(apiError.response?.data?.message ?? "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-teal-800/70 bg-teal-950/70 p-8 shadow-2xl shadow-teal-950/45 backdrop-blur">
        <p className="text-center text-xs uppercase tracking-[0.32em] text-teal-300">Join The App</p>
        <h1 className="mb-6 mt-3 text-center text-3xl font-bold text-teal-50">Create Account</h1>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="mb-1 block text-sm font-medium text-teal-200" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-teal-700 bg-teal-950/60 px-4 py-3 text-teal-50 outline-none transition placeholder:text-teal-300/60 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              placeholder="Your name"
            />
            {errors.name ? <p className="mt-1 text-sm text-rose-300">{errors.name}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-teal-200" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-teal-700 bg-teal-950/60 px-4 py-3 text-teal-50 outline-none transition placeholder:text-teal-300/60 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              placeholder="you@example.com"
            />
            {errors.email ? <p className="mt-1 text-sm text-rose-300">{errors.email}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-teal-200" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-teal-700 bg-teal-950/60 px-4 py-3 text-teal-50 outline-none transition placeholder:text-teal-300/60 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              placeholder="Minimum 6 characters"
            />
            {errors.password ? <p className="mt-1 text-sm text-rose-300">{errors.password}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-teal-200" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-xl border border-teal-700 bg-teal-950/60 px-4 py-3 text-teal-50 outline-none transition placeholder:text-teal-300/60 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword ? (
              <p className="mt-1 text-sm text-rose-300">{errors.confirmPassword}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-teal-200" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value as Role)}
              className="w-full rounded-xl border border-teal-700 bg-teal-950/60 px-4 py-3 text-teal-50 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
            >
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {submitError ? <p className="text-sm text-rose-300">{submitError}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-teal-500 px-4 py-3 font-semibold text-teal-50 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-teal-200/80">
          Already have an account?{" "}
          <Link className="font-medium text-teal-300 hover:text-teal-200 hover:underline" to="/signin">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
