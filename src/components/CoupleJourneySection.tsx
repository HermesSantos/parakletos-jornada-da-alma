import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CoupleJourneyContent } from "@/lib/cms-types";
import { defaultLandingContent } from "@/lib/cms-defaults";

type CoupleJourneySectionProps = {
  content?: CoupleJourneyContent;
};

const CoupleJourneySection = ({ content = defaultLandingContent.journeys.couple }: CoupleJourneySectionProps) => {
  const titleParts = content.title.split(content.titleHighlight);

  return (
    <section id="jornada-casal" className="py-16 md:py-20 bg-card relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          <div className="relative">
            {content.comingSoon && (
              <Badge
                variant="secondary"
                className="mb-4 rounded-full border border-gold/30 bg-gold/10 text-accent font-sans text-xs uppercase tracking-[0.2em] px-4 py-1"
              >
                Em breve
              </Badge>
            )}

            <span className="text-xs uppercase tracking-[0.3em] text-accent font-sans font-semibold">
              {content.eyebrow}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mt-2 mb-2">
              {titleParts[0]}
              <span className="text-gradient-gold italic">{content.titleHighlight}</span>
            </h2>
            <p className="font-serif text-lg md:text-xl text-muted-foreground italic mb-6">{content.tagline}</p>
            <p className="text-muted-foreground font-sans leading-relaxed mb-6">{content.description}</p>

            <p className="font-sans text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-8">
              {content.pillars.join(" ✦ ")}
            </p>

            <div className="rounded-xl border border-dashed border-gold/30 bg-gold/5 p-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-serif text-lg font-semibold text-foreground mb-1">{content.comingSoonTitle}</p>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    {content.comingSoonDescription}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-8 py-3.5 text-sm font-semibold text-muted-foreground tracking-wider mt-8 cursor-not-allowed opacity-60"
            >
              {content.ctaLabel}
            </button>
          </div>

          <div className="lg:sticky lg:top-24 relative">
            <div className="absolute inset-0 z-10 rounded-2xl bg-background/40 backdrop-blur-[1px]" />
            <img
              src={content.imageUrl}
              alt="Alinhamento do Casal"
              className="w-full rounded-2xl shadow-2xl shadow-gold/10 object-cover aspect-[2/3] opacity-80 saturate-75"
              loading="lazy"
            />
            {content.comingSoon && (
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <span className="rounded-full border border-gold/40 bg-background/90 px-6 py-2 font-sans text-sm font-semibold uppercase tracking-[0.25em] text-accent shadow-lg">
                  Em breve
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleJourneySection;
