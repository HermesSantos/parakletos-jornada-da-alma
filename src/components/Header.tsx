import { NavLink } from "@/components/NavLink";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-serif font-semibold tracking-wide text-foreground">
            Instituto <span className="text-gradient-gold">Parakletos</span>
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="flex items-center gap-3 text-sm font-medium">
            <NavLink
              to="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground"
            >
              Início
            </NavLink>
            <NavLink
              to="/sobre"
              className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-gold/20 hover:border-gold/60 md:text-sm md:px-4 md:py-1.5"
              activeClassName="bg-gold/20 border-gold/70"
            >
              Sobre nós
            </NavLink>
          </nav>
          <a
            href="/#metodo"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground tracking-wide transition-all hover:opacity-90 hover:shadow-lg"
          >
            Conheça o Método Parakletos
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
