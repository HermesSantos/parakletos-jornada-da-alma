import { NavLink } from "@/components/NavLink";
import ThemeToggle from "@/components/ThemeToggle";

const anchorClass =
  "text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex flex-col gap-2 px-3 py-2 sm:px-6 md:flex-row md:items-center md:justify-between md:py-4">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="text-lg font-serif font-semibold tracking-wide text-foreground sm:text-2xl">
            Inst. <span className="text-gradient-gold">Parakletos</span>
          </NavLink>
        </div>
        <div className="flex w-full items-center justify-between gap-2 md:w-auto md:gap-4">
          <nav className="hidden items-center gap-4 lg:flex">
            <a href="/#jornadas" className={anchorClass}>
              Jornadas
            </a>
            <a href="/#metodo" className={anchorClass}>
              Método
            </a>
            <a href="/#planos" className={anchorClass}>
              Planos
            </a>
            <a href="/#faq" className={anchorClass}>
              FAQ
            </a>
            <NavLink
              to="/sobre"
              className={anchorClass}
              activeClassName="text-foreground font-semibold"
            >
              Sobre nós
            </NavLink>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <NavLink
              to="/login"
              className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-gold/20 hover:border-gold/60 sm:px-4 sm:py-2 sm:text-sm"
              activeClassName="bg-gold/20 border-gold/70"
            >
              Área do Aluno
            </NavLink>
            <a
              href="/#planos"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground tracking-wide transition-all hover:opacity-90 hover:shadow-lg sm:px-6 sm:py-2.5 sm:text-sm"
            >
              Começar agora
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
