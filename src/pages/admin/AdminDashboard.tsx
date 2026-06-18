import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  { to: "/admin/hero", title: "Hero", description: "Título principal, textos e imagem de fundo." },
  { to: "/admin/missao-liberte", title: "Missão Liberte-se", description: "Seção Comece por aqui e turma 07/07." },
  { to: "/admin/header", title: "Cabeçalho", description: "Marca, navegação e botões." },
  { to: "/admin/courses", title: "Cards de missões", description: "Cards de todas as missões na landing." },
  { to: "/admin/method", title: "Método", description: "Pilares e conteúdo do método Parakletos." },
  { to: "/admin/journeys", title: "Detalhes das jornadas", description: "Dias da mulher, homem e casal." },
  { to: "/admin/features", title: "Recursos", description: "Módulo e benefícios." },
  { to: "/admin/social-proof", title: "Depoimentos", description: "Provas sociais e imagens." },
  { to: "/admin/pricing", title: "Planos", description: "Preços, Pix e dados bancários." },
  { to: "/admin/faq", title: "FAQ", description: "Perguntas e respostas." },
  { to: "/admin/footer", title: "Rodapé", description: "Contato, horários e redes." },
  { to: "/admin/theme", title: "Cores", description: "Paleta light e dark." },
  { to: "/admin/student-content", title: "Conteúdo Alunos", description: "Vídeos e PDFs das jornadas." },
  { to: "/admin/students", title: "Alunos", description: "Contas e matrículas." },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-light text-foreground">Visão geral</h2>
        <p className="text-muted-foreground mt-2">
          Edite os conteúdos da landing page. As alterações aparecem no site após salvar.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link key={section.to} to={section.to}>
            <Card className="h-full transition-colors hover:border-gold/40 hover:bg-muted/30">
              <CardHeader>
                <CardTitle className="font-serif text-xl">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-sm text-accent font-medium">Editar seção →</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
