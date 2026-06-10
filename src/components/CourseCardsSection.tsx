import escolhaCaminho from "@/assets/escolha-caminho.webp";
import jornadaDaMulher from "@/assets/jornada_da_mulher.jpeg";
import jornadaDoHomem from "@/assets/jornada_do_homem.jpeg";
import { ArrowRight, Clock } from "lucide-react";

const courses = [
  {
    id: "jornada-mulher",
    title: "Jornada da Mulher",
    subtitle: "Bússola da Alma",
    description:
      "7 dias para despertar a filha, restaurar a mulher e posicionar-se com governo interior.",
    href: "#jornada-mulher",
    image: jornadaDaMulher,
    highlight: false,
    disabled: false,
  },
  {
    id: "jornada-homem",
    title: "Jornada do Homem",
    subtitle: "Bússola do Homem",
    description:
      "7 dias para despertar o sacerdote, fortalecer o guerreiro e estabelecer o rei interior.",
    href: "#jornada-homem",
    image: jornadaDoHomem,
    highlight: true,
    disabled: false,
  },
  {
    id: "jornada-casal",
    title: "Alinhamento do Casal",
    subtitle: "Bússola da Alma",
    description:
      "Uma jornada para casais alinharem aliança, propósito e governo espiritual a dois.",
    href: "#jornada-casal",
    image: escolhaCaminho,
    highlight: false,
    disabled: true,
  },
];

const CourseCardsSection = () => {
  return (
    <section id="jornadas" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            Escolha sua{" "}
            <span className="text-gradient-gold italic">jornada</span>
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto">
            Trilhas de desenvolvimento pessoal com um mesmo propósito: restauração e governo interior.
          </p>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {courses.map((course) => {
            const CardWrapper = course.disabled ? "div" : "a";
            const cardProps = course.disabled
              ? { className: "cursor-not-allowed" }
              : { href: course.href };

            return (
              <CardWrapper
                key={course.id}
                {...cardProps}
                className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 ${course.disabled
                  ? "border-border/60 bg-card/60 opacity-75"
                  : course.highlight
                    ? "border-gold/40 bg-gold/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/10"
                    : "border-border bg-card hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/10"
                  } ${cardProps.className ?? ""}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className={`w-full h-full object-cover object-center transition-transform duration-500 ${course.disabled ? "saturate-50 opacity-70" : "group-hover:scale-105"
                      }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  {course.disabled && (
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full border border-gold/30 bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
                      <Clock className="w-3 h-3" />
                      Em breve
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold">
                      {course.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-4 flex-1">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-accent font-sans font-semibold">
                      {course.disabled ? "Em breve" : "7 dias de transformação"}
                    </span>
                    {!course.disabled && (
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                        Conhecer
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CourseCardsSection;
