import jornadaDaMulher from "@/assets/jornada_da_mulher.jpeg";

const womanDays = [
  { day: "Dia 1", title: "Despertar & Consciência Espiritual", subtitle: "A Filha Desperta", emoji: "📜" },
  { day: "Dia 2", title: "Identidade & Cura Interior", subtitle: "A Mulher Restaurada", emoji: "🔥" },
  { day: "Dia 3", title: "Cura & Libertação", subtitle: "A Mulher Livre", emoji: "🌊" },
  { day: "Dia 4", title: "Direção & Discernimento", subtitle: "A Mulher Prudente", emoji: "🧭" },
  { day: "Dia 5", title: "Relacionamentos & Alianças Conscientes", subtitle: "A Mulher de Aliança", emoji: "👑" },
  { day: "Dia 6", title: "Propósito & Alinhamento", subtitle: "A Mulher de Propósito", emoji: "✨" },
  { day: "Dia 7", title: "Governo & Decisão", subtitle: "A Mulher Posicionada", emoji: "👑" },
];

const WomanJourneySection = () => {
  return (
    <section id="jornada-mulher" className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-sans font-semibold">
              Bússola da Alma
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mt-2 mb-4">
              Jornada da{" "}
              <span className="text-gradient-gold italic">Mulher</span>
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed mb-8">
              Uma trilha de 7 dias desenhada para a mulher que deseja despertar sua identidade,
              curar feridas profundas e assumir o governo da própria vida com propósito.
            </p>

            <div className="space-y-3">
              {womanDays.map((item) => (
                <div
                  key={item.day}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 transition-all hover:border-gold/30"
                >
                  <span className="text-lg mt-0.5">{item.emoji}</span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-sans font-semibold">
                      {item.day}
                    </p>
                    <p className="font-serif text-base font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground font-sans italic">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#planos"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground tracking-wider transition-all hover:opacity-90 hover:shadow-lg mt-8"
            >
              Escolher este caminho
            </a>
          </div>

          <div className="lg:sticky lg:top-24">
            <img
              src={jornadaDaMulher}
              alt="Detalhes da Jornada da Mulher - 7 dias de transformação"
              className="w-full rounded-2xl shadow-2xl shadow-gold/10 object-cover aspect-[2/3]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomanJourneySection;
