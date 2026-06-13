import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqContent } from "@/lib/cms-types";
import { defaultLandingContent } from "@/lib/cms-defaults";

type FAQSectionProps = {
  content?: FaqContent;
};

const FAQSection = ({ content = defaultLandingContent.faq }: FAQSectionProps) => {
  const titleParts = content.title.split(content.titleHighlight);

  return (
    <section id="faq" className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            {titleParts[0]}
            <span className="text-gradient-gold italic">{content.titleHighlight}</span>
            {titleParts[1] ?? ""}
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto">{content.subtitle}</p>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {content.faqs.map((faq, index) => (
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
