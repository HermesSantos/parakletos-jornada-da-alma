import { Outlet, useNavigate } from "react-router-dom";
import { BookOpen, ExternalLink, LogOut, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { logout } from "@/lib/api";
import { clearAuthSession, getAuthUser } from "@/lib/auth";

const navItems = [
  { to: "/aluno", label: "Minhas jornadas", icon: Map, end: true },
];

const StudentLayout = () => {
  const navigate = useNavigate();
  const user = getAuthUser("student");

  const handleLogout = async () => {
    try {
      await logout("student");
    } catch {
      // ignore logout API errors
    } finally {
      clearAuthSession("student");
      navigate("/login");
    }
  };

  return (
    <div className="h-svh min-h-screen overflow-hidden bg-background">
      <DashboardSidebar
        title={
          <>
            Área do <span className="text-gradient-gold italic">Aluno</span>
          </>
        }
        userEmail={user?.email}
        navItems={navItems}
        activeVariant="accent"
        footer={
          <>
            <div className="flex justify-center pb-1">
              <ThemeToggle />
            </div>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <a href="/">
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver site
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </>
        }
      />

      <div className="flex h-svh min-h-0 flex-col md:pl-64">
        <header className="flex shrink-0 items-center justify-between border-b border-border p-4 md:hidden">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            <span className="font-serif text-lg">Área do Aluno</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
