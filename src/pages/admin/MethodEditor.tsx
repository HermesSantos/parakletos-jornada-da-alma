import SectionEditor from "@/components/admin/SectionEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const MethodEditor = () => (
  <SectionEditor sectionKey="method" title="Método" description="Conteúdo do método Parakletos.">
    {(content, setContent) => (
      <>
        <div className="space-y-2">
          <Label>Eyebrow</Label>
          <Input value={content.eyebrow} onChange={(e) => setContent({ ...content, eyebrow: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Descrição</Label>
          <Textarea value={content.description} onChange={(e) => setContent({ ...content, description: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Callout</Label>
          <Input value={content.callout} onChange={(e) => setContent({ ...content, callout: e.target.value })} />
        </div>
        <ImageUploadField
          label="Imagem"
          value={content.imageUrl}
          section="method"
          onChange={(url) => setContent({ ...content, imageUrl: url })}
        />
        {content.pillars.map((pillar, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Pilar {index + 1} título</Label>
                <Input
                  value={pillar.title}
                  onChange={(e) => {
                    const pillars = [...content.pillars];
                    pillars[index] = { ...pillars[index], title: e.target.value };
                    setContent({ ...content, pillars });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtítulo</Label>
                <Input
                  value={pillar.subtitle}
                  onChange={(e) => {
                    const pillars = [...content.pillars];
                    pillars[index] = { ...pillars[index], subtitle: e.target.value };
                    setContent({ ...content, pillars });
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={pillar.description}
                onChange={(e) => {
                  const pillars = [...content.pillars];
                  pillars[index] = { ...pillars[index], description: e.target.value };
                  setContent({ ...content, pillars });
                }}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setContent({
              ...content,
              processSteps: [...content.processSteps, "Novo passo"],
            })
          }
        >
          Adicionar passo
        </Button>
        {content.processSteps.map((step, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={step}
              onChange={(e) => {
                const processSteps = [...content.processSteps];
                processSteps[index] = e.target.value;
                setContent({ ...content, processSteps });
              }}
            />
          </div>
        ))}
      </>
    )}
  </SectionEditor>
);

export default MethodEditor;
