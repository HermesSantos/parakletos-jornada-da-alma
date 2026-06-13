import SectionEditor from "@/components/admin/SectionEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HeaderEditor = () => (
  <SectionEditor sectionKey="header" title="Cabeçalho" description="Marca, navegação e botões do topo.">
    {(content, setContent) => (
      <>
        <div className="space-y-2">
          <Label>Marca</Label>
          <Input value={content.brand} onChange={(e) => setContent({ ...content, brand: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Botão área do aluno</Label>
          <Input
            value={content.studentAreaLabel}
            onChange={(e) => setContent({ ...content, studentAreaLabel: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>CTA principal</Label>
          <Input value={content.ctaLabel} onChange={(e) => setContent({ ...content, ctaLabel: e.target.value })} />
        </div>
        {content.nav.map((item, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-3 border rounded-lg p-4">
            <div className="space-y-2">
              <Label>Nav {index + 1}</Label>
              <Input
                value={item.label}
                onChange={(e) => {
                  const nav = [...content.nav];
                  nav[index] = { ...nav[index], label: e.target.value };
                  setContent({ ...content, nav });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Link</Label>
              <Input
                value={item.href}
                onChange={(e) => {
                  const nav = [...content.nav];
                  nav[index] = { ...nav[index], href: e.target.value };
                  setContent({ ...content, nav });
                }}
              />
            </div>
          </div>
        ))}
      </>
    )}
  </SectionEditor>
);

export default HeaderEditor;
