import SectionEditor from "@/components/admin/SectionEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const JourneyDaysEditor = ({
  days,
  onChange,
}: {
  days: { day: string; title: string; subtitle: string; emoji: string }[];
  onChange: (days: { day: string; title: string; subtitle: string; emoji: string }[]) => void;
}) => (
  <div className="space-y-3">
    {days.map((day, index) => (
      <div key={index} className="grid md:grid-cols-4 gap-2 border rounded-lg p-3">
        <Input
          value={day.day}
          placeholder="Dia"
          onChange={(e) => {
            const next = [...days];
            next[index] = { ...next[index], day: e.target.value };
            onChange(next);
          }}
        />
        <Input
          value={day.emoji}
          placeholder="Emoji"
          onChange={(e) => {
            const next = [...days];
            next[index] = { ...next[index], emoji: e.target.value };
            onChange(next);
          }}
        />
        <Input
          value={day.title}
          placeholder="Título"
          onChange={(e) => {
            const next = [...days];
            next[index] = { ...next[index], title: e.target.value };
            onChange(next);
          }}
        />
        <Input
          value={day.subtitle}
          placeholder="Subtítulo"
          onChange={(e) => {
            const next = [...days];
            next[index] = { ...next[index], subtitle: e.target.value };
            onChange(next);
          }}
        />
      </div>
    ))}
  </div>
);

const JourneysEditor = () => (
  <SectionEditor sectionKey="journeys" title="Detalhes das jornadas" description="Conteúdo das três jornadas.">
    {(content, setContent) => (
      <Tabs defaultValue="woman">
        <TabsList>
          <TabsTrigger value="woman">Mulher</TabsTrigger>
          <TabsTrigger value="man">Homem</TabsTrigger>
          <TabsTrigger value="couple">Casal</TabsTrigger>
        </TabsList>

        <TabsContent value="woman" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea
              value={content.woman.description}
              onChange={(e) => setContent({ ...content, woman: { ...content.woman, description: e.target.value } })}
            />
          </div>
          <ImageUploadField
            label="Imagem"
            value={content.woman.imageUrl}
            section="journeys"
            onChange={(url) => setContent({ ...content, woman: { ...content.woman, imageUrl: url } })}
          />
          <JourneyDaysEditor
            days={content.woman.days}
            onChange={(days) => setContent({ ...content, woman: { ...content.woman, days } })}
          />
        </TabsContent>

        <TabsContent value="man" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea
              value={content.man.description}
              onChange={(e) => setContent({ ...content, man: { ...content.man, description: e.target.value } })}
            />
          </div>
          <ImageUploadField
            label="Imagem"
            value={content.man.imageUrl}
            section="journeys"
            onChange={(url) => setContent({ ...content, man: { ...content.man, imageUrl: url } })}
          />
          <JourneyDaysEditor
            days={content.man.days}
            onChange={(days) => setContent({ ...content, man: { ...content.man, days } })}
          />
        </TabsContent>

        <TabsContent value="couple" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Tagline</Label>
            <Input
              value={content.couple.tagline}
              onChange={(e) => setContent({ ...content, couple: { ...content.couple, tagline: e.target.value } })}
            />
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea
              value={content.couple.description}
              onChange={(e) => setContent({ ...content, couple: { ...content.couple, description: e.target.value } })}
            />
          </div>
          <ImageUploadField
            label="Imagem"
            value={content.couple.imageUrl}
            section="journeys"
            onChange={(url) => setContent({ ...content, couple: { ...content.couple, imageUrl: url } })}
          />
        </TabsContent>
      </Tabs>
    )}
  </SectionEditor>
);

export default JourneysEditor;
