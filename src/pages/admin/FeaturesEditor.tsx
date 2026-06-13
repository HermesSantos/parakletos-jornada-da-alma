import SectionEditor from "@/components/admin/SectionEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const FeaturesEditor = () => (
  <SectionEditor sectionKey="features" title="Recursos" description="Módulo e benefícios.">
    {(content, setContent) => (
      <>
        <div className="space-y-2">
          <Label>Descrição do módulo</Label>
          <Textarea value={content.description} onChange={(e) => setContent({ ...content, description: e.target.value })} />
        </div>
        <ImageUploadField
          label="Imagem"
          value={content.imageUrl}
          section="features"
          onChange={(url) => setContent({ ...content, imageUrl: url })}
        />
        {content.benefits.map((benefit, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={benefit}
              onChange={(e) => {
                const benefits = [...content.benefits];
                benefits[index] = e.target.value;
                setContent({ ...content, benefits });
              }}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => setContent({ ...content, benefits: [...content.benefits, "Novo benefício"] })}
        >
          Adicionar benefício
        </Button>
      </>
    )}
  </SectionEditor>
);

export default FeaturesEditor;
