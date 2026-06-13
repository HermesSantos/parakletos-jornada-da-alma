import SectionEditor from "@/components/admin/SectionEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const HeroEditor = () => (
  <SectionEditor sectionKey="hero" title="Hero" description="Seção principal da landing page.">
    {(content, setContent) => (
      <>
        <div className="space-y-2">
          <Label>Eyebrow</Label>
          <Input value={content.eyebrow} onChange={(e) => setContent({ ...content, eyebrow: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Subtexto</Label>
          <Textarea value={content.subtext} onChange={(e) => setContent({ ...content, subtext: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Bullets</Label>
          <Input value={content.bullets} onChange={(e) => setContent({ ...content, bullets: e.target.value })} />
        </div>
        {content.headline.map((line, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Headline linha {index + 1}</Label>
              <Input
                value={line.text}
                onChange={(e) => {
                  const headline = [...content.headline];
                  headline[index] = { ...headline[index], text: e.target.value };
                  setContent({ ...content, headline });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Destaque</Label>
              <Input
                value={line.highlight ?? ""}
                onChange={(e) => {
                  const headline = [...content.headline];
                  headline[index] = { ...headline[index], highlight: e.target.value };
                  setContent({ ...content, headline });
                }}
              />
            </div>
          </div>
        ))}
        {content.ctas.map((cta, index) => (
          <div key={index} className="grid md:grid-cols-3 gap-3 border rounded-lg p-4">
            <div className="space-y-2">
              <Label>CTA {index + 1} label</Label>
              <Input
                value={cta.label}
                onChange={(e) => {
                  const ctas = [...content.ctas];
                  ctas[index] = { ...ctas[index], label: e.target.value };
                  setContent({ ...content, ctas });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Link</Label>
              <Input
                value={cta.href}
                onChange={(e) => {
                  const ctas = [...content.ctas];
                  ctas[index] = { ...ctas[index], href: e.target.value };
                  setContent({ ...content, ctas });
                }}
              />
            </div>
          </div>
        ))}
        <ImageUploadField
          label="Imagem de fundo"
          value={content.backgroundImageUrl}
          section="hero"
          onChange={(url) => setContent({ ...content, backgroundImageUrl: url })}
        />
      </>
    )}
  </SectionEditor>
);

export default HeroEditor;
