import SectionEditor from "@/components/admin/SectionEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SocialProofEditor = () => (
  <SectionEditor sectionKey="social_proof" title="Depoimentos" description="Provas sociais e imagens.">
    {(content, setContent) => (
      <>
        <div className="space-y-2">
          <Label>Subtítulo</Label>
          <Textarea value={content.subtitle} onChange={(e) => setContent({ ...content, subtitle: e.target.value })} />
        </div>
        {content.points.map((point, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <Input
              value={point.title}
              placeholder="Título"
              onChange={(e) => {
                const points = [...content.points];
                points[index] = { ...points[index], title: e.target.value };
                setContent({ ...content, points });
              }}
            />
            <Textarea
              value={point.description}
              placeholder="Descrição"
              onChange={(e) => {
                const points = [...content.points];
                points[index] = { ...points[index], description: e.target.value };
                setContent({ ...content, points });
              }}
            />
          </div>
        ))}
        {content.testimonials.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <Label>Depoimento {index + 1}</Label>
            <Input
              value={item.alt}
              placeholder="Texto alternativo"
              onChange={(e) => {
                const testimonials = [...content.testimonials];
                testimonials[index] = { ...testimonials[index], alt: e.target.value };
                setContent({ ...content, testimonials });
              }}
            />
            <ImageUploadField
              label="Imagem"
              value={item.imageUrl}
              section="social_proof"
              onChange={(url) => {
                const testimonials = [...content.testimonials];
                testimonials[index] = { ...testimonials[index], imageUrl: url };
                setContent({ ...content, testimonials });
              }}
            />
          </div>
        ))}
      </>
    )}
  </SectionEditor>
);

export default SocialProofEditor;
