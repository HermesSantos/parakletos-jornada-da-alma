import { Check } from "lucide-react";
import MissaoLibertePaymentModal from "@/components/MissaoLibertePaymentModal";
import type { MissaoLiberteContent } from "@/lib/cms-types";
import { defaultLandingContent } from "@/lib/cms-defaults";

type MissaoLiberteSectionProps = {
  content?: MissaoLiberteContent;
};

const MissaoLiberteSection = ({
  content = defaultLandingContent.missao_liberte,
}: MissaoLiberteSectionProps) => {
  return (
    <section id="missao-liberte-se" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <img
            src={content.imageUrl}
            alt="Missão Liberte-se — 21 dias para voltar a viver"
            className="w-full rounded-2xl shadow-2xl shadow-gold/10 object-cover order-2 md:order-1"
            loading="lazy"
          />

          <div className="order-1 md:order-2">
            <span className="text-xs uppercase tracking-[0.35em] text-accent font-sans font-semibold">
              {content.eyebrow}
            </span>

            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mt-3 mb-3">
              {content.title}
            </h2>

            <p className="font-serif text-xl md:text-2xl text-gradient-gold italic mb-6">
              {content.subtitle}
            </p>

            <p className="text-muted-foreground font-sans leading-relaxed mb-8">
              {content.description}
            </p>

            <div className="inline-flex flex-col rounded-xl border border-gold/40 bg-gold/10 px-6 py-4 mb-8 shadow-lg shadow-gold/5">
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-sans font-semibold">
                {content.batchLabel}
              </span>
              <span className="font-serif text-2xl md:text-3xl font-semibold text-foreground mt-1 tracking-wide">
                {content.batchDate}
              </span>
            </div>

            <ul className="space-y-3 mb-8">
              {content.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>

            <MissaoLibertePaymentModal content={content} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissaoLiberteSection;
