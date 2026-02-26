import { NavLink } from "@/components/NavLink";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex flex-col gap-2 px-3 py-2 sm:px-6 md:flex-row md:items-center md:justify-between md:py-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-serif font-semibold tracking-wide text-foreground sm:text-2xl">
            Inst. <span className="text-gradient-gold">Parakletos</span>
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-2 md:w-auto md:gap-6">
          <nav className="flex flex-wrap items-center gap-2 text-[11px] font-medium sm:text-sm md:gap-3">
            <NavLink
              to="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground"
            >
              Início
            </NavLink>
            <NavLink
              to="/sobre"
              className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-semibold text-foreground transition-colors hover:bg-gold/20 hover:border-gold/60 sm:text-sm sm:px-4 sm:py-1.5"
              activeClassName="bg-gold/20 border-gold/70"
            >
              Sobre nós
            </NavLink>
          </nav>
          <a
            href="/#metodo"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground tracking-wide transition-all hover:opacity-90 hover:shadow-lg sm:px-6 sm:py-2.5 sm:text-sm"
          >
            <span className="sm:hidden">Saber mais</span>
            <span className="hidden sm:inline">Conheça o Método Parakletos</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
