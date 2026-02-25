import guiaJornada from "@/assets/guia_oficial.jpeg";

const GuideSection = () => {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            Guia Oficial da{" "}
            <span className="text-gradient-gold italic">Jornada</span>
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto">
            7 semanas para despertar, curar, avivar sua essência e governar a sua própria vida.
          </p>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="flex justify-center">
          <img
            src={guiaJornada}
            alt="Guia Oficial da Jornada - Método Parakletos: Bússola da Alma, Águas Profundas, Avivamento da Alma e Solo Sagrado"
            className="rounded-2xl shadow-2xl shadow-gold/10 max-w-sm md:max-w-md w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default GuideSection;
