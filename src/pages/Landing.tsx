import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-transparent text-teal-100">
      <main className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Online Food Ordering</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Fresh food, faster ordering, and clean customer management.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-teal-200/80">
              Explore the menu, manage your cart, and track orders in a polished teal interface.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/signin"
                className="rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-teal-50 transition hover:bg-teal-400"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-teal-700 px-6 py-3 text-sm font-semibold text-teal-100 transition hover:border-teal-400 hover:text-white"
              >
                Create Account
              </Link>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
