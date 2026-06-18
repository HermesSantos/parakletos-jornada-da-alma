import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, ExternalLink, LogOut, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { logout } from "@/lib/api";
import { clearAuthSession, getAuthUser } from "@/lib/auth";

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
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="font-serif text-xl text-foreground">
            Área do <span className="text-gradient-gold italic">Aluno</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink
            to="/aluno"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <Map className="w-4 h-4" />
            Minhas jornadas
          </NavLink>
        </nav>
        <div className="p-4 border-t border-border space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
            <a href="/">
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver site
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            <span className="font-serif text-lg">Área do Aluno</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Sair
          </Button>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
