import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../hooks/useCart";

const linkBase = "rounded-full px-4 py-2 text-sm font-medium transition";

export default function Navbar() {
  const navigate = useNavigate();
  const { authUser, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const links = authUser?.role === "ADMIN"
    ? [
        { to: "/admin/foods", label: "Foods" },
        { to: "/admin/categories", label: "Categories" },
        { to: "/admin/orders", label: "Orders" },
        { to: "/admin/users", label: "Users" },
      ]
    : [
        { to: "/home", label: "Home" },
        { to: "/cart", label: `Cart${totalItems > 0 ? ` (${totalItems})` : ""}` },
        { to: "/orders", label: "Orders" },
      ];

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate("/signin");
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-teal-900/70 bg-teal-950/85 text-teal-100 shadow-lg shadow-teal-950/35 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-teal-300">Online Food Ordering</p>
          <h1 className="text-xl font-semibold text-white">Fresh, fast, and fully managed</h1>
        </div>

        <button type="button" className="rounded-full border border-teal-700 px-4 py-2 text-sm text-teal-200 lg:hidden" onClick={() => setMobileOpen((current) => !current)}>
          Menu
        </button>

        <div className={`${mobileOpen ? "flex" : "hidden"} flex-col gap-4 lg:flex lg:flex-1 lg:flex-row lg:items-center lg:justify-end`}>
          <nav className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-center lg:justify-end">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "bg-teal-500 text-teal-50" : "text-teal-200 hover:bg-teal-900 hover:text-white"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div ref={profileMenuRef} className="relative flex items-center gap-3 border-l-0 border-teal-900 pl-0 lg:border-l lg:pl-4">
            <button
              type="button"
              aria-label="Open profile details"
              onClick={() => setProfileOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-teal-700 bg-teal-900/70 text-teal-100 transition hover:border-teal-400 hover:bg-teal-800"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M4 20c1.7-3.7 4.4-5.5 8-5.5s6.3 1.8 8 5.5" strokeLinecap="round" />
              </svg>
            </button>

            {profileOpen ? (
              <div className="absolute right-0 top-14 z-50 w-72 rounded-2xl border border-teal-800 bg-teal-950/95 p-4 shadow-xl shadow-teal-950/50 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.25em] text-teal-300">Signed in as</p>
                <p className="mt-2 text-sm font-semibold text-white">{authUser?.email ?? "Unknown"}</p>
                <p className="mt-1 text-xs text-teal-300">Role: {authUser?.role ?? "CUSTOMER"}</p>

                <div className="mt-4 grid gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-teal-50 transition hover:bg-teal-400"
                  >
                    View Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-xl border border-rose-500/50 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/15"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}