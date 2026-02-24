import escolhaCaminho from "@/assets/escolha-caminho.webp";
import jornadasDetalhes from "@/assets/jornadas-detalhes.webp";

const womanDays = [
  { day: "Dia 1", title: "Despertar & Consciência Espiritual", subtitle: "A Filha Desperta", emoji: "📜" },
  { day: "Dia 2", title: "Identidade & Cura Interior", subtitle: "A Mulher Restaurada", emoji: "🔥" },
  { day: "Dia 3", title: "Cura & Libertação", subtitle: "A Mulher Livre", emoji: "🌊" },
  { day: "Dia 4", title: "Direção & Discernimento", subtitle: "A Mulher Prudente", emoji: "🧭" },
  { day: "Dia 5", title: "Relacionamentos & Alianças Conscientes", subtitle: "A Mulher de Aliança", emoji: "👑" },
  { day: "Dia 6", title: "Propósito & Alinhamento", subtitle: "A Mulher de Propósito", emoji: "👑" },
  { day: "Dia 7", title: "Governo & Decisão", subtitle: "A Mulher Posicionada", emoji: "👑" },
];

const manDays = [
  { day: "Dia 1", title: "Despertar & Consciência Espiritual", subtitle: "Sacerdote", emoji: "🔥" },
  { day: "Dia 2", title: "Identidade & Verdade", subtitle: "Guerreiro Interior", emoji: "🛡️" },
  { day: "Dia 3", title: "Domínio & Maturidade Emocional", subtitle: "Guerreiro Maduro", emoji: "🔒" },
  { day: "Dia 4", title: "Discernimento & Posicionamento", subtitle: "Guerreiro Estratégico", emoji: "🧭" },
  { day: "Dia 5", title: "Relacionamentos & Alianças Conscientes", subtitle: "Rei em Formação", emoji: "👑" },
  { day: "Dia 6", title: "Propósito & Missão", subtitle: "Rei Responsável", emoji: "👑" },
  { day: "Dia 7", title: "Governo & Decisão", subtitle: "Rei Estabelecido", emoji: "👑" },
];

const PathsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        {/* Header with image */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            Escolha o seu caminho de{" "}
            <span className="text-gradient-gold italic">transformação</span>
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto mb-8">
            Duas jornadas únicas, um mesmo propósito: restauração e governo interior.
          </p>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>

        <div className="flex justify-center mb-16">
          <img
            src={escolhaCaminho}
            alt="Escolha o seu caminho de transformação - Jornada da Mulher e Jornada do Homem"
            className="rounded-2xl shadow-2xl shadow-gold/10 max-w-sm md:max-w-md w-full h-auto"
            loading="lazy"
          />
        </div>

        {/* Two columns with day-by-day */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Women's Journey */}
          <div>
            <div className="text-center mb-8">
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                Jornada da <span className="text-gradient-gold italic">Mulher</span>
              </h3>
              <p className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold mt-2">
                Bússola da Alma
              </p>
            </div>
            <div className="space-y-3">
              {womanDays.map((item) => (
                <div
                  key={item.day + "-w"}
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
          </div>

          {/* Men's Journey */}
          <div>
            <div className="text-center mb-8">
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                Jornada do <span className="text-gradient-gold italic">Homem</span>
              </h3>
              <p className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold mt-2">
                Bússola do Homem
              </p>
            </div>
            <div className="space-y-3">
              {manDays.map((item) => (
                <div
                  key={item.day + "-m"}
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
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <img
            src={jornadasDetalhes}
            alt="Detalhes das jornadas da Mulher e do Homem - 7 dias de transformação"
            className="rounded-2xl shadow-2xl shadow-gold/10 max-w-sm md:max-w-lg w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default PathsSection;
