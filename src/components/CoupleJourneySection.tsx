import jornadaDoCasal from "@/assets/jornada_do_casal.jpeg";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const pillars = ["Aliança", "Propósito", "Governo Espiritual"];

const CoupleJourneySection = () => {
  return (
    <section id="jornada-casal" className="py-16 md:py-20 bg-card relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          <div className="relative">
            <Badge
              variant="secondary"
              className="mb-4 rounded-full border border-gold/30 bg-gold/10 text-accent font-sans text-xs uppercase tracking-[0.2em] px-4 py-1"
            >
              Em breve
            </Badge>

            <span className="text-xs uppercase tracking-[0.3em] text-accent font-sans font-semibold">
              Bússola da Alma
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mt-2 mb-2">
              Alinhamento do{" "}
              <span className="text-gradient-gold italic">Casal</span>
            </h2>
            <p className="font-serif text-lg md:text-xl text-muted-foreground italic mb-6">
              Quando dois se alinham ao Céu, o destino muda.
            </p>
            <p className="text-muted-foreground font-sans leading-relaxed mb-6">
              Uma jornada pensada para casais que desejam restaurar a aliança,
              alinhar propósitos e exercer governo espiritual juntos — construindo
              um caminho de transformação a dois.
            </p>

            <p className="font-sans text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-8">
              {pillars.join(" ✦ ")}
            </p>

            <div className="rounded-xl border border-dashed border-gold/30 bg-gold/5 p-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-serif text-lg font-semibold text-foreground mb-1">
                    Esta jornada ainda acontecerá
                  </p>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    Estamos preparando o conteúdo do Alinhamento do Casal. Em breve
                    você poderá iniciar essa trilha de transformação a dois.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-8 py-3.5 text-sm font-semibold text-muted-foreground tracking-wider mt-8 cursor-not-allowed opacity-60"
            >
              Indisponível no momento
            </button>
          </div>

          <div className="lg:sticky lg:top-24 relative">
            <div className="absolute inset-0 z-10 rounded-2xl bg-background/40 backdrop-blur-[1px]" />
            <img
              src={jornadaDoCasal}
              alt="Bússola da Alma - Alinhamento do Casal: quando dois se alinham ao Céu, o destino muda"
              className="w-full rounded-2xl shadow-2xl shadow-gold/10 object-cover aspect-[2/3] opacity-80 saturate-75"
              loading="lazy"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <span className="rounded-full border border-gold/40 bg-background/90 px-6 py-2 font-sans text-sm font-semibold uppercase tracking-[0.25em] text-accent shadow-lg">
                Em breve
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleJourneySection;
