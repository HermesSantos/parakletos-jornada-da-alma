const steps = [
  {
    emoji: "🌬️",
    title: "Bússola da Alma",
    subtitle: "Consciência",
    description: "Desperte quem você nasceu para ser.",
  },
  {
    emoji: "🌊",
    title: "Águas Profundas",
    subtitle: "Cura",
    description: "Cure sua história e restaure sua alma.",
  },
  {
    emoji: "🔥",
    title: "Avivamento da Alma",
    subtitle: "Libertação",
    description: "Levante-se na sua verdadeira identidade.",
  },
  {
    emoji: "🌍",
    title: "Solo Sagrado",
    subtitle: "Governo",
    description: "Construa uma vida com propósito e direção.",
  },
];

const JourneySection = () => {
  return (
    <section id="jornada" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-2xl mb-4 block">🌿</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            A Arquitetura da{" "}
            <span className="text-gradient-gold italic">Jornada</span>
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative rounded-2xl border border-border bg-card p-8 text-center transition-all duration-500 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <span className="text-4xl mb-4 block">{step.emoji}</span>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                {step.title}
              </h3>
              <p className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold mb-4">
                {step.subtitle}
              </p>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                {step.description}
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold transition-all duration-500 group-hover:w-3/4 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
