import { Check } from "lucide-react";
import type { FeaturesContent } from "@/lib/cms-types";
import { defaultLandingContent } from "@/lib/cms-defaults";

type FeaturesSectionProps = {
  content?: FeaturesContent;
};

const FeaturesSection = ({ content = defaultLandingContent.features }: FeaturesSectionProps) => {
  const titleParts = content.title.split(content.titleHighlight);
  const moduleTitleParts = content.moduleTitle.split(content.moduleTitleHighlight);

  return (
    <section className="py-16 md:py-20 bg-card">
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

        <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <img
            src={content.imageUrl}
            alt="Módulo 1 - Bússola da Alma"
            className="w-full rounded-2xl shadow-2xl shadow-gold/10 object-cover order-2 md:order-1"
            loading="lazy"
          />
          <div className="order-1 md:order-2">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-sans font-semibold">
              {content.eyebrow}
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-foreground mt-2 mb-4">
              {moduleTitleParts[0]}
              <span className="text-gradient-gold italic">{content.moduleTitleHighlight}</span>
            </h3>
            <p className="text-muted-foreground font-sans leading-relaxed mb-4">{content.description}</p>
            <ul className="space-y-3 mb-6">
              {content.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
            <a
              href={content.ctaHref}
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-8 py-3.5 text-sm font-medium text-foreground tracking-wider transition-all hover:bg-gold/20 hover:border-gold/60"
            >
              {content.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
