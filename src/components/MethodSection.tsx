import type { MethodContent } from "@/lib/cms-types";
import { defaultLandingContent } from "@/lib/cms-defaults";
import { getIcon } from "@/lib/icon-map";

type MethodSectionProps = {
  content?: MethodContent;
};

const MethodSection = ({ content = defaultLandingContent.method }: MethodSectionProps) => {
  const titleParts = content.title.split(content.titleHighlight);

  return (
    <section id="metodo" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.35em] text-accent font-sans font-semibold">
                {content.eyebrow}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mt-3 mb-6">
                {titleParts[0]}
                <span className="text-gradient-gold italic">{content.titleHighlight}</span>
              </h2>
              <p className="text-muted-foreground font-sans leading-relaxed mb-6">{content.description}</p>

              <div className="mb-6">
                <p className="font-serif text-2xl md:text-3xl font-light text-foreground mb-3">
                  {content.processLabel}
                </p>
                <p className="font-sans text-sm md:text-base uppercase tracking-[0.2em] text-accent font-semibold">
                  {content.processSteps.join(" · ")}
                </p>
              </div>

              <div className="inline-block rounded-xl border border-gold/40 bg-gold/10 px-6 py-4 shadow-lg shadow-gold/5">
                <p className="font-serif text-xl md:text-2xl font-semibold text-foreground tracking-wide">
                  {content.callout}
                </p>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <img
                src={content.imageUrl}
                alt="Método Parakletos"
                className="w-full rounded-2xl shadow-2xl shadow-gold/10 object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="font-sans text-sm uppercase tracking-[0.25em] text-muted-foreground">
              {content.pillarsLabel}
            </p>
            <div className="w-16 h-px bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.pillars.map((pillar) => {
              const Icon = getIcon(pillar.icon);
              return (
                <div
                  key={pillar.title}
                  className="group relative rounded-2xl border border-border bg-card p-6 text-center transition-all duration-500 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-accent font-sans font-semibold mb-3 block">
                    {pillar.numeral}
                  </span>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 border border-gold/30 mb-4">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{pillar.title}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent font-sans font-semibold mb-3">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{pillar.description}</p>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold transition-all duration-500 group-hover:w-3/4 rounded-full" />
                </div>
              );
            })}
          </div>

          <p className="text-center font-serif text-lg text-muted-foreground mt-10 tracking-wide">
            {content.footerText.split("Parakletos")[0]}
            <span className="text-gradient-gold">Parakletos</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
