import { useEffect, useState, type ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export type DashboardNavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
};

export type DashboardNavGroup = {
  label: string;
  icon: LucideIcon;
  items: DashboardNavItem[];
};

export type DashboardNavEntry = DashboardNavItem | DashboardNavGroup;

type DashboardSidebarProps = {
  title: ReactNode;
  userEmail?: string | null;
  userName?: string | null;
  navItems: DashboardNavEntry[];
  activeVariant?: "primary" | "accent";
  footer?: ReactNode;
};

const activeClasses = {
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
} as const;

const isNavGroup = (entry: DashboardNavEntry): entry is DashboardNavGroup =>
  "items" in entry;

const linkClassName = (
  isActive: boolean,
  activeVariant: keyof typeof activeClasses,
  indented = false,
) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
    indented ? "pl-9" : ""
  } ${
    isActive
      ? activeClasses[activeVariant]
      : "text-muted-foreground hover:bg-muted hover:text-foreground"
  }`;

const NavItemLink = ({
  item,
  activeVariant,
  indented = false,
}: {
  item: DashboardNavItem;
  activeVariant: keyof typeof activeClasses;
  indented?: boolean;
}) => {
  const { to, label, icon: Icon, end } = item;
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => linkClassName(isActive, activeVariant, indented)}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </NavLink>
  );
};

const NavGroup = ({
  group,
  activeVariant,
}: {
  group: DashboardNavGroup;
  activeVariant: keyof typeof activeClasses;
}) => {
  const { pathname } = useLocation();
  const hasActiveChild = group.items.some(
    (item) => pathname === item.to || (!item.end && pathname.startsWith(`${item.to}/`)),
  );
  const [open, setOpen] = useState(hasActiveChild);
  const { label, icon: Icon, items } = group;

  useEffect(() => {
    if (hasActiveChild) setOpen(true);
  }, [hasActiveChild]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
          hasActiveChild
            ? "text-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">{label}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 pt-1">
        {items.map((item) => (
          <NavItemLink
            key={item.to}
            item={item}
            activeVariant={activeVariant}
            indented
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

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
        {navItems.map((entry) =>
          isNavGroup(entry) ? (
            <NavGroup key={entry.label} group={entry} activeVariant={activeVariant} />
          ) : (
            <NavItemLink key={entry.to} item={entry} activeVariant={activeVariant} />
          ),
        )}
      </nav>

      {footer ? (
        <div className="shrink-0 space-y-2 border-t border-border p-4">{footer}</div>
      ) : null}
    </aside>
  );
};

export default DashboardSidebar;
