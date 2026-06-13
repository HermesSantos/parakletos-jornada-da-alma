import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { SocialProofContent } from "@/lib/cms-types";
import { defaultLandingContent } from "@/lib/cms-defaults";
import { getIcon } from "@/lib/icon-map";

type SocialProofSectionProps = {
  content?: SocialProofContent;
};

const SocialProofSection = ({ content = defaultLandingContent.social_proof }: SocialProofSectionProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const titleParts = content.title.split(content.titleHighlight);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateCurrentSlide = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    updateCurrentSlide();
    carouselApi.on("select", updateCurrentSlide);
    carouselApi.on("reInit", updateCurrentSlide);

    return () => {
      carouselApi.off("select", updateCurrentSlide);
      carouselApi.off("reInit", updateCurrentSlide);
    };
  }, [carouselApi]);

  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-20">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gold/10 to-transparent" />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,420px)]">
          <div>
            <h2 className="mb-5 font-serif text-4xl font-light text-foreground md:text-5xl">
              {titleParts[0]}
              <span className="text-gradient-gold italic">{content.titleHighlight}</span>
            </h2>
            <p className="max-w-xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
              {content.subtitle}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {content.points.map((point) => {
                const Icon = getIcon(point.icon);
                return (
                  <div
                    key={point.title}
                    className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm"
                  >
                    <Icon className="mb-3 h-5 w-5 text-accent" />
                    <h3 className="mb-1 font-serif text-xl text-foreground">{point.title}</h3>
                    <p className="font-sans text-sm leading-relaxed text-muted-foreground">{point.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="absolute inset-0 translate-y-6 rounded-[2rem] bg-gold/15 blur-3xl" />
            <Carousel setApi={setCarouselApi} opts={{ align: "start", loop: true }} className="relative px-10 sm:px-12">
              <CarouselContent className="ml-0">
                {content.testimonials.map((image) => (
                  <CarouselItem key={image.imageUrl} className="pl-0">
                    <div className="rounded-[2rem] border border-gold/20 bg-card/90 p-3 shadow-2xl shadow-gold/10 backdrop-blur-sm">
                      <div className="mb-3 flex items-center justify-between px-2">
                        <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
                          Depoimento real
                        </span>
                      </div>

                      <div className="aspect-[9/16] max-h-[520px] overflow-hidden rounded-[1.5rem]">
                        <img
                          src={image.imageUrl}
                          alt={image.alt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="left-0 top-1/2 z-20 h-12 w-12 -translate-y-1/2 border-gold/30 bg-background text-accent shadow-lg shadow-black/15 hover:bg-gold/10 disabled:opacity-30" />
              <CarouselNext className="right-0 top-1/2 z-20 h-12 w-12 -translate-y-1/2 border-gold/30 bg-background text-accent shadow-lg shadow-black/15 hover:bg-gold/10 disabled:opacity-30" />
            </Carousel>

            <div className="mt-5 flex items-center justify-center gap-2">
              {content.testimonials.map((image, index) => (
                <button
                  key={image.imageUrl}
                  type="button"
                  aria-label={`Ir para depoimento ${index + 1}`}
                  aria-pressed={currentSlide === index}
                  onClick={() => carouselApi?.scrollTo(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentSlide === index ? "w-8 bg-accent" : "w-2.5 bg-gold/30 hover:bg-gold/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
