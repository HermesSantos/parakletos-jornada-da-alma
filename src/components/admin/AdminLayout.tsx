import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CreditCard,
  ExternalLink,
  GraduationCap,
  HelpCircle,
  Image,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  Palette,
  Sparkles,
  Star,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { logout } from "@/lib/api";
import { clearAuthSession, getAuthUser } from "@/lib/auth";

const navItems = [
  { to: "/admin", label: "Visão geral", icon: LayoutDashboard, end: true },
  { to: "/admin/hero", label: "Hero", icon: Sparkles },
  { to: "/admin/header", label: "Cabeçalho", icon: Menu },
  { to: "/admin/courses", label: "Jornadas", icon: Map },
  { to: "/admin/method", label: "Método", icon: BookOpen },
  { to: "/admin/journeys", label: "Detalhes jornadas", icon: Star },
  { to: "/admin/features", label: "Recursos", icon: Type },
  { to: "/admin/social-proof", label: "Depoimentos", icon: Image },
  { to: "/admin/pricing", label: "Planos", icon: CreditCard },
  { to: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { to: "/admin/footer", label: "Rodapé", icon: Type },
  { to: "/admin/theme", label: "Cores", icon: Palette },
  { to: "/admin/student-content", label: "Conteúdo Alunos", icon: BookOpen },
  { to: "/admin/students", label: "Alunos", icon: GraduationCap },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = getAuthUser("admin");

  const handleLogout = async () => {
    try {
      await logout("admin");
    } catch {
      // ignore logout API errors
    } finally {
      clearAuthSession("admin");
      navigate("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="font-serif text-xl text-foreground">
            Painel <span className="text-gradient-gold italic">Admin</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-border bg-card/80 backdrop-blur px-4 py-3 flex items-center justify-between gap-3">
          <p className="font-sans text-sm text-muted-foreground md:hidden">Painel Admin</p>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver site
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
