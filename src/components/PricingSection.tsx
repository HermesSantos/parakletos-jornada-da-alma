import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PricingContent } from "@/lib/cms-types";
import { defaultLandingContent } from "@/lib/cms-defaults";

type PricingSectionProps = {
  content?: PricingContent;
};

const PricingSection = ({ content = defaultLandingContent.pricing }: PricingSectionProps) => {
  const titleParts = content.title.split(content.titleHighlight);

  return (
    <section id="planos" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            {titleParts[0]}
            <span className="text-gradient-gold italic">{content.titleHighlight}</span>
            {titleParts[1] ?? ""}
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto">{content.subtitle}</p>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {content.plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/5 ${
                plan.highlight ? "border-gold/50 bg-gold/5 shadow-lg shadow-gold/10" : "border-border bg-card"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground tracking-wider uppercase">
                  Mais Popular
                </div>
              )}

              <h3 className="font-serif text-xl font-semibold text-foreground mb-1">{plan.name}</h3>
              <p className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold mb-6">
                {plan.subtitle}
              </p>

              <div className="mb-6">
                {plan.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through mb-1">De {plan.originalPrice}</p>
                )}
                <p className="font-serif text-3xl font-semibold text-foreground">{plan.price}</p>
              </div>

              <ul className="space-y-3 mb-8 text-left">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
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

              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className={`inline-flex items-center justify-center w-full rounded-full px-6 py-3 text-sm font-medium tracking-wider transition-all ${
                      plan.highlight
                        ? "bg-accent text-accent-foreground hover:opacity-90"
                        : "border border-gold/40 bg-gold/10 text-foreground hover:bg-gold/20 hover:border-gold/60"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-5xl w-[95vw] p-8 md:p-10">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-3xl font-semibold text-foreground">
                      Finalizar pagamento - {plan.name}
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground">
                      Escaneie o QR Code Pix ou use os dados abaixo para realizar o pagamento de {plan.price}.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start">
                    <div className="rounded-2xl border border-gold/30 bg-gold/5 p-4">
                      <img
                        src={plan.qrCodeUrl}
                        alt="QR Code Pix para pagamento"
                        className="w-full h-auto rounded-xl"
                        loading="lazy"
                      />
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6">
                      <h4 className="font-serif text-2xl text-foreground mb-5">Dados para pagamento</h4>
                      <ul className="space-y-3">
                        {content.bankInfo.map((item) => (
                          <li key={item.label} className="text-base text-muted-foreground font-sans">
                            <span className="font-semibold text-foreground">{item.label}:</span> {item.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground font-sans mt-10 max-w-2xl mx-auto">
          {content.footerNote}
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
