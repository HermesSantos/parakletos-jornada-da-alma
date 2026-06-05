import guiaJornada from "@/assets/guia_oficial.jpeg";
import moduloBussola from "@/assets/modulo_1.jpeg";
import { Check } from "lucide-react";

const guideBenefits = [
  "7 semanas de conteúdo estruturado",
  "Exercícios práticos diários",
  "Método Parakletos completo",
  "Material em PDF para download",
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            O que você vai{" "}
            <span className="text-gradient-gold italic">receber</span>
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto">
            Material completo e método estruturado para sua transformação interior.
          </p>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="max-w-6xl mx-auto space-y-16 md:space-y-20">
          {/* Guia Oficial */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-sans font-semibold">
                Material exclusivo
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-foreground mt-2 mb-4">
                Guia Oficial da{" "}
                <span className="text-gradient-gold italic">Jornada</span>
              </h3>
              <p className="text-muted-foreground font-sans leading-relaxed mb-6">
                7 semanas para despertar, curar, avivar sua essência e governar a sua própria vida.
                Um manual completo que conduz você por cada etapa do método Parakletos.
              </p>
              <ul className="space-y-3">
                {guideBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <img
              src={guiaJornada}
              alt="Guia Oficial da Jornada - Método Parakletos"
              className="w-full rounded-2xl shadow-2xl shadow-gold/10 object-cover"
              loading="lazy"
            />
          </div>

          {/* Módulo 1 */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <img
              src={moduloBussola}
              alt="Módulo 1 - Bússola da Alma"
              className="w-full rounded-2xl shadow-2xl shadow-gold/10 object-cover order-2 md:order-1"
              loading="lazy"
            />
            <div className="order-1 md:order-2">
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-sans font-semibold">
                Módulo 1
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-foreground mt-2 mb-4">
                Bússola da{" "}
                <span className="text-gradient-gold italic">Alma</span>
              </h3>
              <p className="text-muted-foreground font-sans leading-relaxed mb-4">
                Uma jornada de 7 dias para despertar quem você nasceu para ser.
                O método que guia você ao governo interior, combinando consciência
                espiritual, identidade, cura e propósito.
              </p>
              <p className="text-muted-foreground font-sans leading-relaxed mb-6">
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
      </div>
    </section>
  );
};

export default FeaturesSection;
