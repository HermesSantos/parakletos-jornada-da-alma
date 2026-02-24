import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="animate-fade-up text-sm uppercase tracking-[0.35em] text-gold-light mb-8 font-sans font-medium">
          Cura &amp; Libertação Interior
        </p>

        <h1 className="animate-fade-up-delay-1 font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-tight text-cream mb-12 max-w-4xl mx-auto">
          Consciência gera{" "}
          <span className="text-gradient-gold font-medium italic">cura</span>.
          <br />
          Cura gera{" "}
          <span className="text-gradient-gold font-medium italic">
            libertação
          </span>
          .
          <br />
          Libertação gera{" "}
          <span className="text-gradient-gold font-medium italic">
            governo
          </span>
          .
        </h1>

        <p className="animate-fade-up-delay-2 text-cream/90 text-lg md:text-xl font-sans font-light max-w-2xl mx-auto mb-10">
          Um caminho de restauração para homens e mulheres que buscam
          transformação profunda.
        </p>

        <div className="animate-fade-up-delay-3">
          <a
            href="#jornada"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-8 py-3.5 text-sm font-medium text-cream tracking-wider transition-all hover:bg-gold/20 hover:border-gold/60 backdrop-blur-sm"
          >
            Descubra a Jornada
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/50" />
      </div>
    </section>
  );
};

export default HeroSection;
