import { useEffect, useState } from "react";
import socialProofImage1 from "@/assets/parakletos_prova_1.jpeg";
import socialProofImage2 from "@/assets/parakletos_prova_2.jpeg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Compass, HeartHandshake, Sparkles } from "lucide-react";

const proofPoints = [
  {
    icon: Compass,
    title: "Mais clareza",
    description: "Direção para decisões que antes pareciam confusas.",
  },
  {
    icon: HeartHandshake,
    title: "Cura com raiz",
    description: "Princípios que tocam a história e reorganizam o caminho.",
  },
  {
    icon: Sparkles,
    title: "Transformação prática",
    description: "A experiência sai do conteúdo e alcança a vida real.",
  },
];

const socialProofImages = [
  {
    src: socialProofImage1,
    alt: "Depoimento no WhatsApp sobre a Jornada da Alma e a Bússola da Alma",
  },
  {
    src: socialProofImage2,
    alt: "Segundo depoimento no WhatsApp sobre a experiência com a Jornada da Alma",
  },
];

const SocialProofSection = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gold/10 to-transparent" />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,420px)]">
          <div>
            <h2 className="mb-5 font-serif text-4xl font-light text-foreground md:text-5xl">
              Quando a jornada encontra a{" "}
              <span className="text-gradient-gold italic">vida real</span>
            </h2>
            <p className="max-w-xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
              Esse tipo de resposta mostra o que a Jornada da Alma produz na
              prática: mais consciência, retorno aos princípios e direção para
              seguir com intencionalidade.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {proofPoints.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm"
                >
                  <Icon className="mb-3 h-5 w-5 text-accent" />
                  <h3 className="mb-1 font-serif text-xl text-foreground">
                    {title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="absolute inset-0 translate-y-6 rounded-[2rem] bg-gold/15 blur-3xl" />
            <Carousel
              setApi={setCarouselApi}
              opts={{ align: "start", loop: true }}
              className="relative px-10 sm:px-12"
            >
              <CarouselContent className="ml-0">
                {socialProofImages.map(({ src, alt }) => (
                  <CarouselItem key={src} className="pl-0">
                    <div className="rounded-[2rem] border border-gold/20 bg-card/90 p-3 shadow-2xl shadow-gold/10 backdrop-blur-sm">
                      <div className="mb-3 flex items-center justify-between px-2">
                        <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
                          Depoimento real
                        </span>
                      </div>

                      <img
                        src={src}
                        alt={alt}
                        className="w-full rounded-[1.5rem] object-cover"
                        loading="lazy"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="left-0 top-1/2 z-20 h-12 w-12 -translate-y-1/2 border-gold/30 bg-background text-accent shadow-lg shadow-black/15 hover:bg-gold/10 disabled:opacity-30" />
              <CarouselNext className="right-0 top-1/2 z-20 h-12 w-12 -translate-y-1/2 border-gold/30 bg-background text-accent shadow-lg shadow-black/15 hover:bg-gold/10 disabled:opacity-30" />
            </Carousel>

            <div className="mt-5 flex items-center justify-center gap-2">
              {socialProofImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  aria-label={`Ir para depoimento ${index + 1}`}
                  aria-pressed={currentSlide === index}
                  onClick={() => carouselApi?.scrollTo(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentSlide === index
                      ? "w-8 bg-accent"
                      : "w-2.5 bg-gold/30 hover:bg-gold/50"
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
