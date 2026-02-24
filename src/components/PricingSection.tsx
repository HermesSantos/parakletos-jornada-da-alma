import planosBussola from "@/assets/planos-bussola.webp";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Bússola Essencial",
    subtitle: "Fundamento Individual",
    price: "R$ 70",
    originalPrice: null,
    features: [
      "Manual Completo em PDF",
      "Método Estruturado",
      "Exercícios Práticos",
      "Acesso Imediato",
    ],
    cta: "Comece sua Jornada",
    highlight: false,
  },
  {
    name: "Bússola Coletiva",
    subtitle: "7 Dias de Alinhamento",
    price: "R$ 700",
    originalPrice: null,
    features: [
      "Manual Aprofundado",
      "3 Encontros ao Vivo",
      "7 Dias de Direcionamento",
      "Vagas Limitadas",
    ],
    cta: "Viva a Experiência",
    highlight: true,
  },
  {
    name: "Bússola Imersiva",
    subtitle: "Mentoria Individual",
    price: "R$ 1.400",
    originalPrice: "R$ 7.000",
    features: [
      "7 Encontros 1:1",
      "Plano Estratégico",
      "Acompanhamento Personalizado",
      "Kit Exclusivo",
    ],
    bonus: "Bônus: Encontro Presencial em BC",
    cta: "Edição Fundadora",
    highlight: false,
  },
];

const PricingSection = () => {
  return (
    <section id="planos" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            Escolha seu nível de{" "}
            <span className="text-gradient-gold italic">transformação</span>
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto">
            Três jornadas. Um mesmo propósito. Transformação com estrutura, profundidade e propósito.
          </p>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="flex justify-center mb-16">
          <img
            src={planosBussola}
            alt="Planos Bússola da Alma - Essencial, Coletiva e Imersiva"
            className="rounded-2xl shadow-2xl shadow-gold/10 max-w-sm md:max-w-md w-full h-auto"
            loading="lazy"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/5 ${
                plan.highlight
                  ? "border-gold/50 bg-gold/5 shadow-lg shadow-gold/10"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground tracking-wider uppercase">
                  Mais Popular
                </div>
              )}

              <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                {plan.name}
              </h3>
              <p className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold mb-6">
                {plan.subtitle}
              </p>

              <div className="mb-6">
                {plan.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through mb-1">
                    De {plan.originalPrice}
                  </p>
                )}
                <p className="font-serif text-3xl font-semibold text-foreground">
                  {plan.price}
                </p>
              </div>

              <ul className="space-y-3 mb-8 text-left">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground font-sans"
                  >
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.bonus && (
                <p className="text-xs text-accent font-sans font-semibold mb-4 bg-gold/10 rounded-lg p-2">
                  🎁 {plan.bonus}
                </p>
              )}

              <a
                href="#"
                className={`inline-flex items-center justify-center w-full rounded-full px-6 py-3 text-sm font-medium tracking-wider transition-all ${
                  plan.highlight
                    ? "bg-accent text-accent-foreground hover:opacity-90"
                    : "border border-gold/40 bg-gold/10 text-foreground hover:bg-gold/20 hover:border-gold/60"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
