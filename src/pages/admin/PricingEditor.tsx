import SectionEditor from "@/components/admin/SectionEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const PricingEditor = () => (
  <SectionEditor sectionKey="pricing" title="Planos" description="Preços, Pix e dados bancários.">
    {(content, setContent) => (
      <>
        <div className="space-y-2">
          <Label>Nota de rodapé</Label>
          <Textarea value={content.footerNote} onChange={(e) => setContent({ ...content, footerNote: e.target.value })} />
        </div>

        <h3 className="font-serif text-lg">Dados bancários</h3>
        {content.bankInfo.map((item, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-2">
            <Input
              value={item.label}
              placeholder="Label"
              onChange={(e) => {
                const bankInfo = [...content.bankInfo];
                bankInfo[index] = { ...bankInfo[index], label: e.target.value };
                setContent({ ...content, bankInfo });
              }}
            />
            <Input
              value={item.value}
              placeholder="Valor"
              onChange={(e) => {
                const bankInfo = [...content.bankInfo];
                bankInfo[index] = { ...bankInfo[index], value: e.target.value };
                setContent({ ...content, bankInfo });
              }}
            />
          </div>
        ))}

        {content.plans.map((plan, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <h4 className="font-serif text-lg">{plan.name}</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <Input
                value={plan.name}
                placeholder="Nome"
                onChange={(e) => {
                  const plans = [...content.plans];
                  plans[index] = { ...plans[index], name: e.target.value };
                  setContent({ ...content, plans });
                }}
              />
              <Input
                value={plan.price}
                placeholder="Preço"
                onChange={(e) => {
                  const plans = [...content.plans];
                  plans[index] = { ...plans[index], price: e.target.value };
                  setContent({ ...content, plans });
                }}
              />
            </div>
            <Input
              value={plan.subtitle}
              placeholder="Subtítulo"
              onChange={(e) => {
                const plans = [...content.plans];
                plans[index] = { ...plans[index], subtitle: e.target.value };
                setContent({ ...content, plans });
              }}
            />
            <Input
              value={plan.qrCodeUrl}
              placeholder="URL do QR Code"
              onChange={(e) => {
                const plans = [...content.plans];
                plans[index] = { ...plans[index], qrCodeUrl: e.target.value };
                setContent({ ...content, plans });
              }}
            />
            <Textarea
              value={plan.features.join("\n")}
              placeholder="Features (uma por linha)"
              onChange={(e) => {
                const plans = [...content.plans];
                plans[index] = { ...plans[index], features: e.target.value.split("\n").filter(Boolean) };
                setContent({ ...content, plans });
              }}
            />
            <div className="flex items-center gap-2">
              <Switch
                checked={plan.highlight}
                onCheckedChange={(checked) => {
                  const plans = [...content.plans];
                  plans[index] = { ...plans[index], highlight: checked };
                  setContent({ ...content, plans });
                }}
              />
              <Label>Plano em destaque</Label>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" disabled>
          Planos fixos (3)
        </Button>
      </>
    )}
  </SectionEditor>
);

export default PricingEditor;
