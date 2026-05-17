import { useNavigate } from "react-router-dom";
import landingBackground from "../assets/Landing/FoodOrderingSys.jpg";

export default function Landing() {
  const navigate = useNavigate();

  const goToAuth = (target: "/signin" | "/signup") => {
    navigate(target);
  };

  return (
    <div className="min-h-dvh w-full bg-gradient-to-br from-teal-950 via-teal-900 to-teal-950 text-teal-50">
      <main className="relative mx-auto grid min-h-dvh w-full max-w-none grid-cols-1 lg:min-h-dvh lg:grid-cols-2">
        {/* Left side - Image - Fullcover */}
        <div className="group relative min-h-[45vh] overflow-hidden sm:min-h-[50vh] md:min-h-[55vh] lg:min-h-dvh">
          <img
            src={landingBackground}
            alt="Food Ordering"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        </div>

        {/* Right side - Content */}
        <div className="relative flex flex-col justify-center space-y-6 overflow-hidden bg-[radial-gradient(circle_at_22%_18%,rgba(126,34,206,0.34),transparent_42%),radial-gradient(circle_at_88%_82%,rgba(20,184,166,0.24),transparent_40%),linear-gradient(145deg,#140824_0%,#1a0f30_38%,#0a2a24_100%)] px-4 py-12 sm:px-6 lg:min-h-dvh lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.34)_100%)]"></div>
          <div className="relative z-10 flex flex-col space-y-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-700/50 bg-teal-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-teal-300 shadow-lg shadow-teal-950/40 backdrop-blur">
              Fresh meals, fast delivery
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl">
              Online Food Ordering
            </h1>

            <p className="text-base leading-7 text-teal-100/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.28)] sm:text-lg md:text-xl md:leading-8">
              Explore a curated menu, place your order in seconds, and enjoy a dining experience designed around your comfort and convenience.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => goToAuth("/signin")}
                className="inline-flex items-center justify-center rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-teal-50 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/50"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => goToAuth("/signup")}
                className="inline-flex items-center justify-center rounded-full border border-teal-700 bg-teal-950/70 px-6 py-3 text-sm font-semibold text-teal-100 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-teal-500 hover:bg-teal-900 hover:shadow-lg hover:shadow-teal-950/50"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
