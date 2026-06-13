import type { JourneyContent } from "@/lib/cms-types";
import { defaultLandingContent } from "@/lib/cms-defaults";

type WomanJourneySectionProps = {
  content?: JourneyContent;
};

const WomanJourneySection = ({ content = defaultLandingContent.journeys.woman }: WomanJourneySectionProps) => {
  const titleParts = content.title.split(content.titleHighlight);

  return (
    <section id="jornada-mulher" className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-sans font-semibold">
              {content.eyebrow}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mt-2 mb-4">
              {titleParts[0]}
              <span className="text-gradient-gold italic">{content.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed mb-8">{content.description}</p>

            <div className="space-y-3">
              {content.days.map((item) => (
                <div
                  key={item.day}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 transition-all hover:border-gold/30"
                >
                  <span className="text-lg mt-0.5">{item.emoji}</span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent font-sans font-semibold">{item.day}</p>
                    <p className="font-serif text-base font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground font-sans italic">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={content.ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground tracking-wider transition-all hover:opacity-90 hover:shadow-lg mt-8"
            >
              {content.ctaLabel}
            </a>
          </div>

          <div className="lg:sticky lg:top-24">
            <img
              src={content.imageUrl}
              alt="Detalhes da Jornada da Mulher"
              className="w-full rounded-2xl shadow-2xl shadow-gold/10 object-cover aspect-[2/3]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomanJourneySection;
