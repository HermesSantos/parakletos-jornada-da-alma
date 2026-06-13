import SectionEditor from "@/components/admin/SectionEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const FaqEditor = () => (
  <SectionEditor sectionKey="faq" title="FAQ" description="Perguntas e respostas frequentes.">
    {(content, setContent) => (
      <>
        <div className="space-y-2">
          <Label>Subtítulo</Label>
          <Textarea value={content.subtitle} onChange={(e) => setContent({ ...content, subtitle: e.target.value })} />
        </div>
        {content.faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <Input
              value={faq.question}
              placeholder="Pergunta"
              onChange={(e) => {
                const faqs = [...content.faqs];
                faqs[index] = { ...faqs[index], question: e.target.value };
                setContent({ ...content, faqs });
              }}
            />
            <Textarea
              value={faq.answer}
              placeholder="Resposta"
              onChange={(e) => {
                const faqs = [...content.faqs];
                faqs[index] = { ...faqs[index], answer: e.target.value };
                setContent({ ...content, faqs });
              }}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setContent({
              ...content,
              faqs: [...content.faqs, { question: "Nova pergunta", answer: "Nova resposta" }],
            })
          }
        >
          Adicionar FAQ
        </Button>
      </>
    )}
  </SectionEditor>
);

export default FaqEditor;
