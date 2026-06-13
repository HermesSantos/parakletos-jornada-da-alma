import SectionEditor from "@/components/admin/SectionEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FooterEditor = () => (
  <SectionEditor sectionKey="footer" title="Rodapé" description="Contato, horários e redes sociais.">
    {(content, setContent) => (
      <>
        <div className="space-y-2">
          <Label>Endereço</Label>
          <Input value={content.address} onChange={(e) => setContent({ ...content, address: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>E-mail</Label>
          <Input value={content.email} onChange={(e) => setContent({ ...content, email: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Instagram</Label>
          <Input value={content.instagram} onChange={(e) => setContent({ ...content, instagram: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>URL Instagram</Label>
          <Input
            value={content.instagramUrl}
            onChange={(e) => setContent({ ...content, instagramUrl: e.target.value })}
          />
        </div>
        {content.hours.map((hour, index) => (
          <div key={index} className="space-y-2">
            <Label>Horário linha {index + 1}</Label>
            <Input
              value={hour}
              onChange={(e) => {
                const hours = [...content.hours];
                hours[index] = e.target.value;
                setContent({ ...content, hours });
              }}
            />
          </div>
        ))}
        <div className="space-y-2">
          <Label>Copyright</Label>
          <Input value={content.copyright} onChange={(e) => setContent({ ...content, copyright: e.target.value })} />
        </div>
      </>
    )}
  </SectionEditor>
);

export default FooterEditor;
