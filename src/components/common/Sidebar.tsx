import { NavLink } from "react-router-dom";

interface SidebarProps {
  links: Array<{ to: string; label: string }>;
}

// Responsive sidebar shell for admin-oriented navigation.
export default function Sidebar({ links }: SidebarProps) {
  return (
    <aside className="w-full rounded-3xl border border-teal-900/70 bg-teal-950/60 p-4 backdrop-blur lg:w-72">
      <nav className="grid gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-teal-500 text-teal-50" : "text-teal-200 hover:bg-teal-900/70 hover:text-white"}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}