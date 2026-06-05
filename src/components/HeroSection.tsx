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
          Desenvolvimento Pessoal &amp; Libertação Interior
        </p>

        <h1 className="animate-fade-up-delay-1 font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-tight text-cream mb-8 max-w-4xl mx-auto">
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

        <p className="animate-fade-up-delay-2 text-cream/90 text-lg md:text-xl font-sans font-light max-w-3xl mx-auto mb-10 leading-relaxed text-center">
          <span className="block mb-3">
            Duas jornadas de transformação — uma para a mulher, outra para o homem.
            Escolha o caminho que Deus preparou para você.
          </span>
          <span className="block text-base md:text-lg tracking-wide opacity-90">
            • Consciência • Cura • Libertação • Governo •
          </span>
        </p>

        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
          <a
            href="#jornada-mulher"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground tracking-wider transition-all hover:opacity-90 hover:shadow-lg w-full sm:w-auto justify-center"
          >
            Jornada da Mulher
          </a>
          <a
            href="#jornada-homem"
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/15 px-8 py-3.5 text-sm font-semibold text-cream tracking-wider transition-all hover:bg-gold/25 hover:border-gold/70 backdrop-blur-sm w-full sm:w-auto justify-center"
          >
            Jornada do Homem
          </a>
        </div>

        <div className="animate-fade-up-delay-3">
          <a
            href="#planos"
            className="inline-flex items-center gap-2 text-sm font-medium text-cream/80 tracking-wider transition-all hover:text-cream underline underline-offset-4"
          >
            Ver planos e valores
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
