import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type DashboardNavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
};

type DashboardSidebarProps = {
  title: ReactNode;
  userEmail?: string | null;
  userName?: string | null;
  navItems: DashboardNavItem[];
  activeVariant?: "primary" | "accent";
  footer?: ReactNode;
};

const activeClasses = {
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
} as const;

const DashboardSidebar = ({
  title,
  userEmail,
  userName,
  navItems,
  activeVariant = "primary",
  footer,
}: DashboardSidebarProps) => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden h-svh w-64 flex-col border-r border-border bg-card md:flex">
      <div className="shrink-0 border-b border-border p-6">
        <h1 className="font-serif text-xl text-foreground">{title}</h1>
        {userEmail ? (
          <p className="mt-1 text-xs text-muted-foreground">{userEmail}</p>
        ) : null}
        {userName ? (
          <p className="mt-0.5 text-sm font-medium text-foreground">{userName}</p>
        ) : null}
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto p-4">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? activeClasses[activeVariant]
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      {footer ? (
        <div className="shrink-0 space-y-2 border-t border-border p-4">{footer}</div>
      ) : null}
    </aside>
  );
};

export default DashboardSidebar;
