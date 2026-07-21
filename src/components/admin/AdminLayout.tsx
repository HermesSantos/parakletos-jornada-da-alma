import { Outlet, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CreditCard,
  ExternalLink,
  Globe,
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
import DashboardSidebar, { type DashboardNavEntry } from "@/components/DashboardSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { logout } from "@/lib/api";
import { clearAuthSession, getAuthUser } from "@/lib/auth";

const navItems: DashboardNavEntry[] = [
  { to: "/admin", label: "Visão geral", icon: LayoutDashboard, end: true },
  {
    label: "Landing page",
    icon: Globe,
    items: [
      { to: "/admin/hero", label: "Hero", icon: Sparkles },
      { to: "/admin/header", label: "Cabeçalho", icon: Menu },
      { to: "/admin/courses", label: "Missões", icon: Map },
      { to: "/admin/method", label: "Método", icon: BookOpen },
      { to: "/admin/journeys", label: "Detalhes jornadas", icon: Star },
      { to: "/admin/features", label: "Recursos", icon: Type },
      { to: "/admin/social-proof", label: "Depoimentos", icon: Image },
      { to: "/admin/pricing", label: "Planos", icon: CreditCard },
      { to: "/admin/faq", label: "FAQ", icon: HelpCircle },
      { to: "/admin/footer", label: "Rodapé", icon: Type },
      { to: "/admin/theme", label: "Cores", icon: Palette },
    ],
  },
  {
    label: "Alunos",
    icon: GraduationCap,
    items: [
      { to: "/admin/student-content", label: "Conteúdo Alunos", icon: BookOpen },
      { to: "/admin/students", label: "Alunos", icon: GraduationCap },
    ],
  },
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
    <div className="h-svh min-h-screen overflow-hidden bg-background">
      <DashboardSidebar
        title={
          <>
            Painel <span className="text-gradient-gold italic">Admin</span>
          </>
        }
        userEmail={user?.email}
        navItems={navItems}
        activeVariant="primary"
      />

      <div className="flex h-svh min-h-0 flex-col md:pl-64">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-card/80 px-4 py-3 backdrop-blur">
          <p className="font-sans text-sm text-muted-foreground md:hidden">Painel Admin</p>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver site
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
