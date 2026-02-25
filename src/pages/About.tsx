import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeInSection from "@/components/FadeInSection";
import aboutImage from "@/assets/about.jpeg";
import missionImage from "@/assets/mission.jpeg";
import valuesImage from "@/assets/values.jpeg";
import visionImage from "@/assets/vision.jpeg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28">
        <FadeInSection>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent font-sans font-semibold mb-3">
                  Sobre nós
                </p>
                <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6">
                  Instituto <span className="text-gradient-gold italic">Parakletos</span>
                </h1>
                <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-6">
                  Somos uma instituição de formação espiritual e desenvolvimento humano
                  que conduz homens e mulheres a um processo profundo de consciência,
                  cura interior e transformação de vida, guiados pelo Espírito Santo.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-xs font-semibold text-foreground">
                    Consciência
                  </span>
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-xs font-semibold text-foreground">
                    Cura
                  </span>
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-xs font-semibold text-foreground">
                    Transformação
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/20 via-transparent to-accent/10 blur-2xl" />
                <img
                  src={aboutImage}
                  alt="Instituto Parakletos - Quem somos"
                  className="relative z-10 w-full rounded-3xl border border-gold/30 shadow-2xl shadow-gold/10"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="py-16 md:py-24 bg-card/40 border-y border-border/50">
            <div className="container mx-auto px-6">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h2 className="font-serif text-2xl text-foreground mb-3">Quem somos</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Acreditamos que toda pessoa foi chamada para uma vida plena, alinhada
                    com a sua verdadeira identidade. Nossa missão é criar espaços seguros
                    de restauração, onde o interior é curado e o propósito é despertado.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h3 className="font-serif text-2xl text-foreground mb-3">Nossa visão</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Levantar uma geração restaurada, madura e guiada pelo Espírito Santo,
                    capaz de viver com propósito e governo em todas as áreas da vida.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h3 className="font-serif text-2xl text-foreground mb-3">Nossa missão</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Conduzir homens e mulheres a um processo de consciência, cura interior
                    e transformação espiritual, formando pessoas livres, maduras e capazes
                    de governar a própria vida com direção e propósito, guiadas pelo
                    Espírito Santo.
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {[
                  { src: missionImage, alt: "Instituto Parakletos - Missão" },
                  { src: valuesImage, alt: "Instituto Parakletos - Valores" },
                  { src: visionImage, alt: "Instituto Parakletos - Visão" },
                ].map((item) => (
                  <div
                    key={item.alt}
                    className="overflow-hidden rounded-2xl border border-gold/30 bg-gold/5 shadow-lg shadow-gold/10"
                  >
                    <img src={item.src} alt={item.alt} className="w-full h-auto" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-start">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-5">
                  O Método Parakletos
                </h2>
                <p className="text-muted-foreground font-sans leading-relaxed mb-6">
                  Oferecemos uma jornada estruturada que desperta a identidade, restaura o
                  ser interior e capacita ao governo pessoal, promovendo equilíbrio e
                  propósito de vida.
                </p>
                <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Cada etapa é pensada para gerar consciência, aprofundar a cura e
                    fortalecer a liberdade interior, formando pessoas capazes de caminhar
                    com clareza, propósito e fé.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Despertar da identidade",
                  "Restauração do interior",
                  "Governo pessoal",
                  "Equilíbrio emocional e espiritual",
                  "Propósito de vida",
                  "Maturidade espiritual",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border bg-card px-5 py-4 text-sm text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="py-16 md:py-24 bg-gradient-to-b from-background to-gold/5">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
                  Valores que sustentam nossa caminhada
                </h2>
                <p className="text-muted-foreground font-sans">
                  Consciência gera cura. Cura gera libertação. Libertação gera governo.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: "Consciência",
                    text: "Clareza interior que desperta quem você nasceu para ser.",
                  },
                  {
                    title: "Cura",
                    text: "Restauração profunda da história e do coração.",
                  },
                  {
                    title: "Libertação e governo",
                    text: "Liberdade interior que fortalece o governo da própria vida.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border bg-card p-6 text-center"
                  >
                    <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
                Pronto para viver essa jornada?
              </h2>
              <p className="text-muted-foreground font-sans max-w-2xl mx-auto mb-8">
                Conheça os caminhos disponíveis e escolha o nível de transformação que
                faz sentido para sua fase atual.
              </p>
              <a
                href="/#planos"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-medium tracking-wider text-accent-foreground transition-all hover:opacity-90 hover:shadow-lg"
              >
                Ver planos
              </a>
            </div>
          </section>
        </FadeInSection>
      </main>

      <FadeInSection>
        <Footer />
      </FadeInSection>
    </div>
  );
};

export default About;
