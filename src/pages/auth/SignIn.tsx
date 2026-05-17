import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

type FieldErrors = {
  email: string;
  password: string;
};

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({ email: "", password: "" });
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    const nextErrors: FieldErrors = { email: "", password: "" };

    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    }

    if (nextErrors.email || nextErrors.password) {
      setErrors(nextErrors);
      return;
    }

    setErrors({ email: "", password: "" });
    setIsLoading(true);

    try {
      const authUser = await loginUser(email, password);
      login(authUser.token, authUser);
      navigate(authUser.role === "ADMIN" ? "/admin/foods" : "/menu");
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setSubmitError(apiError.response?.data?.message ?? "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-teal-800/70 bg-black/80 p-8 shadow-2xl shadow-black/60 backdrop-blur">
        <p className="text-center text-xs uppercase tracking-[0.32em] text-teal-300">Welcome Back</p>
        <h1 className="mb-6 mt-3 text-center text-3xl font-bold text-teal-50">Sign In</h1>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
            {errors.password ? <p className="mt-1 text-sm text-rose-300">{errors.password}</p> : null}
          </div>

          {submitError ? <p className="text-sm text-rose-300">{submitError}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-teal-500 px-4 py-3 font-semibold text-teal-50 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-teal-200/80">
          Don&apos;t have an account?{" "}
          <Link className="font-medium text-teal-300 hover:text-teal-200" to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}