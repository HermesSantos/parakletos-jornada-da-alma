import jornadaDoHomem from "@/assets/jornada_do_homem.jpeg";

const manDays = [
  { day: "Dia 1", title: "Despertar & Consciência Espiritual", subtitle: "Sacerdote", emoji: "🔥" },
  { day: "Dia 2", title: "Identidade & Verdade", subtitle: "Guerreiro Interior", emoji: "🛡️" },
  { day: "Dia 3", title: "Domínio & Maturidade Emocional", subtitle: "Guerreiro Maduro", emoji: "🔒" },
  { day: "Dia 4", title: "Discernimento & Posicionamento", subtitle: "Guerreiro Estratégico", emoji: "🧭" },
  { day: "Dia 5", title: "Relacionamentos & Alianças Conscientes", subtitle: "Rei em Formação", emoji: "👑" },
  { day: "Dia 6", title: "Propósito & Missão", subtitle: "Rei Responsável", emoji: "✨" },
  { day: "Dia 7", title: "Governo & Decisão", subtitle: "Rei Estabelecido", emoji: "👑" },
];

const ManJourneySection = () => {
  return (
    <section id="jornada-homem" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          <div className="lg:sticky lg:top-24 order-2 lg:order-1">
            <img
              src={jornadaDoHomem}
              alt="Detalhes da Jornada do Homem - 7 dias de transformação"
              className="w-full rounded-2xl shadow-2xl shadow-gold/10 object-cover aspect-[2/3]"
              loading="lazy"
            />
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-sans font-semibold">
              Bússola do Homem
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mt-2 mb-4">
              Jornada do{" "}
              <span className="text-gradient-gold italic">Homem</span>
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed mb-8">
              Uma trilha de 7 dias para o homem que busca despertar o sacerdote interior,
              fortalecer o guerreiro e estabelecer o rei com responsabilidade e propósito.
            </p>

            <div className="space-y-3">
              {manDays.map((item) => (
                <div
                  key={item.day}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-gold/30"
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
        </div>
      </div>
    </section>
  );
};

export default ManJourneySection;
