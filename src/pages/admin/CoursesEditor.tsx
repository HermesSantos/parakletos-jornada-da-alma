import SectionEditor from "@/components/admin/SectionEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const CoursesEditor = () => (
  <SectionEditor sectionKey="courses" title="Cards de jornadas" description="Três cards da seção de escolha.">
    {(content, setContent) => (
      <>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Destaque do título</Label>
            <Input
              value={content.titleHighlight}
              onChange={(e) => setContent({ ...content, titleHighlight: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Subtítulo</Label>
          <Textarea value={content.subtitle} onChange={(e) => setContent({ ...content, subtitle: e.target.value })} />
        </div>
        {content.courses.map((course, index) => (
          <div key={course.id} className="border rounded-lg p-4 space-y-3">
            <h3 className="font-serif text-lg">{course.title}</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={course.title}
                  onChange={(e) => {
                    const courses = [...content.courses];
                    courses[index] = { ...courses[index], title: e.target.value };
                    setContent({ ...content, courses });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtítulo</Label>
                <Input
                  value={course.subtitle}
                  onChange={(e) => {
                    const courses = [...content.courses];
                    courses[index] = { ...courses[index], subtitle: e.target.value };
                    setContent({ ...content, courses });
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={course.description}
                onChange={(e) => {
                  const courses = [...content.courses];
                  courses[index] = { ...courses[index], description: e.target.value };
                  setContent({ ...content, courses });
                }}
              />
            </div>
            <ImageUploadField
              label="Imagem"
              value={course.imageUrl}
              section="courses"
              onChange={(url) => {
                const courses = [...content.courses];
                courses[index] = { ...courses[index], imageUrl: url };
                setContent({ ...content, courses });
              }}
            />
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={course.highlight}
                  onCheckedChange={(checked) => {
                    const courses = [...content.courses];
                    courses[index] = { ...courses[index], highlight: checked };
                    setContent({ ...content, courses });
                  }}
                />
                <Label>Destaque</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={course.disabled}
                  onCheckedChange={(checked) => {
                    const courses = [...content.courses];
                    courses[index] = { ...courses[index], disabled: checked };
                    setContent({ ...content, courses });
                  }}
                />
                <Label>Em breve</Label>
              </div>
            </div>
          </div>
        ))}
      </>
    )}
  </SectionEditor>
);

export default CoursesEditor;
