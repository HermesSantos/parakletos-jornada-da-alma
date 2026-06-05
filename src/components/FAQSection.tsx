import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona a jornada de 7 dias?",
    answer:
      "Cada jornada é estruturada em 7 dias com temas específicos — do despertar espiritual ao governo interior. Você recebe o material em PDF com exercícios práticos diários e pode seguir no seu ritmo, com acompanhamento conforme o plano escolhido.",
  },
  {
    question: "Qual a diferença entre a Jornada da Mulher e a Jornada do Homem?",
    answer:
      "Ambas seguem o mesmo método Parakletos (Consciência, Cura, Libertação e Governo), mas com linguagem, arquétipos e exercícios adaptados à experiência feminina ou masculina. A Jornada da Mulher trabalha arquétipos como a Filha, a Mulher e a Mulher Posicionada. A Jornada do Homem trabalha o Sacerdote, o Guerreiro e o Rei.",
  },
  {
    question: "Posso fazer as duas jornadas?",
    answer:
      "Sim. Cada jornada é independente e pode ser adquirida separadamente. Muitos alunos escolhem começar por uma e, após concluir, iniciam a outra para aprofundar ainda mais sua transformação.",
  },
  {
    question: "Como recebo o material após o pagamento?",
    answer:
      "Após a confirmação do pagamento via Pix, nossa equipe entrará em contato por e-mail com as instruções de acesso ao material. O acesso é imediato para pagamentos confirmados.",
  },
  {
    question: "Quais são as formas de pagamento?",
    answer:
      "Aceitamos pagamento via Pix. Ao clicar em qualquer plano, você verá o QR Code e os dados bancários para realizar o pagamento de forma rápida e segura.",
  },
  {
    question: "Existe garantia?",
    answer:
      "Sim. Você tem 7 dias após a compra para solicitar reembolso caso não fique satisfeito. Basta entrar em contato pelo e-mail parakletosconsultoriaeinovacao@gmail.com.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            Perguntas{" "}
            <span className="text-gradient-gold italic">frequentes</span>
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto">
            Tire suas dúvidas antes de iniciar sua jornada de transformação.
          </p>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-serif text-lg text-left text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
