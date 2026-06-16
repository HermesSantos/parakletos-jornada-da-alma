import SectionEditor from "@/components/admin/SectionEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const MissaoLiberteEditor = () => (
  <SectionEditor
    sectionKey="missao_liberte"
    title="Missão Liberte-se"
    description="Seção de entrada com turma e benefícios."
  >
    {(content, setContent) => (
      <>
        <div className="space-y-2">
          <Label>Eyebrow</Label>
          <Input value={content.eyebrow} onChange={(e) => setContent({ ...content, eyebrow: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Título</Label>
          <Input value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Subtítulo</Label>
          <Input value={content.subtitle} onChange={(e) => setContent({ ...content, subtitle: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Descrição</Label>
          <Textarea
            value={content.description}
            onChange={(e) => setContent({ ...content, description: e.target.value })}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Label da turma</Label>
            <Input
              value={content.batchLabel}
              onChange={(e) => setContent({ ...content, batchLabel: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Data da turma</Label>
            <Input
              value={content.batchDate}
              onChange={(e) => setContent({ ...content, batchDate: e.target.value })}
            />
          </div>
        </div>
        <ImageUploadField
          label="Imagem"
          value={content.imageUrl}
          section="missao_liberte"
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
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Preço exibido</Label>
            <Input value={content.price} onChange={(e) => setContent({ ...content, price: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Preço em centavos</Label>
            <Input
              type="number"
              value={content.priceCents}
              onChange={(e) => setContent({ ...content, priceCents: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Texto do botão</Label>
            <Input value={content.ctaLabel} onChange={(e) => setContent({ ...content, ctaLabel: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Link do botão (legado)</Label>
            <Input value={content.ctaHref} onChange={(e) => setContent({ ...content, ctaHref: e.target.value })} />
          </div>
        </div>
      </>
    )}
  </SectionEditor>
);

export default MissaoLiberteEditor;
