import moduloBussola from "@/assets/modulo-bussola.webp";

const ModuleSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="flex justify-center">
            <img
              src={moduloBussola}
              alt="Módulo 1 - Bússola da Alma"
              className="rounded-2xl shadow-2xl shadow-gold/10 max-w-xs md:max-w-sm w-full h-auto"
              loading="lazy"
            />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-sans font-semibold">
              Módulo 1
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mt-2 mb-4">
              Bússola da{" "}
              <span className="text-gradient-gold italic">Alma</span>
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed mb-6">
              Uma jornada de 7 dias para despertar quem você nasceu para ser.
              O método que guia você ao governo interior, combinando consciência
              espiritual, identidade, cura e propósito.
            </p>
            <p className="text-muted-foreground font-sans leading-relaxed mb-8">
              Através de exercícios práticos diários, você será conduzido(a) por
              um caminho de autoconhecimento profundo — da consciência espiritual
              até o governo pleno da sua própria vida.
            </p>
            <a
              href="#planos"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-8 py-3.5 text-sm font-medium text-foreground tracking-wider transition-all hover:bg-gold/20 hover:border-gold/60"
            >
              Ver Planos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleSection;
