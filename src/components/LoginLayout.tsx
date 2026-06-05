import { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <NavLink to="/" className="text-xl font-serif font-semibold tracking-wide text-foreground sm:text-2xl">
            Inst. <span className="text-gradient-gold">Parakletos</span>
          </NavLink>
          <NavLink
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Voltar ao site
          </NavLink>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </main>
    </div>
  );
};

export default LoginLayout;
