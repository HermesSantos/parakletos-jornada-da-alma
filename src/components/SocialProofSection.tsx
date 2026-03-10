import socialProofImage from "@/assets/parakletos_prova_1.jpeg";
import { Compass, HeartHandshake, Sparkles } from "lucide-react";

const proofPoints = [
  {
    icon: Compass,
    title: "Mais clareza",
    description: "Direção para decisões que antes pareciam confusas.",
  },
  {
    icon: HeartHandshake,
    title: "Cura com raiz",
    description: "Princípios que tocam a história e reorganizam o caminho.",
  },
  {
    icon: Sparkles,
    title: "Transformação prática",
    description: "A experiência sai do conteúdo e alcança a vida real.",
  },
];

const SocialProofSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gold/10 to-transparent" />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,420px)]">
          <div>
            <h2 className="mb-5 font-serif text-4xl font-light text-foreground md:text-5xl">
              Quando a jornada encontra a{" "}
              <span className="text-gradient-gold italic">vida real</span>
            </h2>
            <p className="max-w-xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
              Esse tipo de resposta mostra o que a Jornada da Alma produz na
              prática: mais consciência, retorno aos princípios e direção para
              seguir com intencionalidade.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {proofPoints.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm"
                >
                  <Icon className="mb-3 h-5 w-5 text-accent" />
                  <h3 className="mb-1 font-serif text-xl text-foreground">
                    {title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[360px]">
            <div className="absolute inset-0 translate-y-6 rounded-[2rem] bg-gold/15 blur-3xl" />
            <div className="relative rounded-[2rem] border border-gold/20 bg-card/90 p-3 shadow-2xl shadow-gold/10 backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-between px-2">
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
                  Depoimento real
                </span>
                <span className="font-sans text-xs text-muted-foreground">
                  Feedback de aluna
                </span>
              </div>

              <img
                src={socialProofImage}
                alt="Depoimento no WhatsApp sobre a Jornada da Alma e a Bússola da Alma"
                className="w-full rounded-[1.5rem] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
