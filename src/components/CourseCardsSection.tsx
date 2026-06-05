import escolhaCaminho from "@/assets/escolha-caminho.webp";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    id: "jornada-mulher",
    title: "Jornada da Mulher",
    subtitle: "Bússola da Alma",
    description:
      "7 dias para despertar a filha, restaurar a mulher e posicionar-se com governo interior.",
    href: "#jornada-mulher",
    highlight: false,
  },
  {
    id: "jornada-homem",
    title: "Jornada do Homem",
    subtitle: "Bússola do Homem",
    description:
      "7 dias para despertar o sacerdote, fortalecer o guerreiro e estabelecer o rei interior.",
    href: "#jornada-homem",
    highlight: true,
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
            Duas trilhas únicas de desenvolvimento pessoal, um mesmo propósito: restauração e governo interior.
          </p>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {courses.map((course) => (
            <a
              key={course.id}
              href={course.href}
              className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/10 ${
                course.highlight
                  ? "border-gold/40 bg-gold/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={escolhaCaminho}
                  alt={course.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
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
                    7 dias de transformação
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                    Conhecer
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCardsSection;
