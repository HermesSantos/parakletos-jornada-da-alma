const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-serif font-semibold tracking-wide text-foreground">
            Instituto <span className="text-gradient-gold">Parakletos</span>
          </span>
        </div>
        <a
          href="#metodo"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground tracking-wide transition-all hover:opacity-90 hover:shadow-lg"
        >
          Conheça o Método Parakletos
        </a>
      </div>
    </header>
  );
};

export default Header;
