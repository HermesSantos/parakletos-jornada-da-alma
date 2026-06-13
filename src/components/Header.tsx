import { NavLink } from "@/components/NavLink";
import ThemeToggle from "@/components/ThemeToggle";
import type { HeaderContent } from "@/lib/cms-types";
import { defaultLandingContent } from "@/lib/cms-defaults";

const anchorClass =
  "text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm";

type HeaderProps = {
  content?: HeaderContent;
};

const Header = ({ content = defaultLandingContent.header }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex flex-col gap-2 px-3 py-2 sm:px-6 md:flex-row md:items-center md:justify-between md:py-4">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="text-lg font-serif font-semibold tracking-wide text-foreground sm:text-2xl">
            {content.brand.split("Parakletos")[0]}
            <span className="text-gradient-gold">Parakletos</span>
          </NavLink>
        </div>
        <div className="flex w-full items-center justify-between gap-2 md:w-auto md:gap-4">
          <nav className="hidden items-center gap-4 lg:flex">
            {content.nav.map((item) =>
              item.type === "route" ? (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={anchorClass}
                  activeClassName="text-foreground font-semibold"
                >
                  {item.label}
                </NavLink>
              ) : (
                <a key={item.label} href={item.href} className={anchorClass}>
                  {item.label}
                </a>
              ),
            )}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <NavLink
              to="/login"
              className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-gold/20 hover:border-gold/60 sm:px-4 sm:py-2 sm:text-sm"
              activeClassName="bg-gold/20 border-gold/70"
            >
              {content.studentAreaLabel}
            </NavLink>
            <a
              href={content.ctaHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground tracking-wide transition-all hover:opacity-90 hover:shadow-lg sm:px-6 sm:py-2.5 sm:text-sm"
            >
              {content.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
