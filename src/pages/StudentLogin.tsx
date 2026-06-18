import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginLayout from "@/components/LoginLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { login } from "@/lib/api";
import { setAuthSession } from "@/lib/auth";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { token, user } = await login(email, password);

      if (user.is_admin) {
        toast.error("Use o painel admin para acessar como administrador.");
        return;
      }

      setAuthSession(token, user, "student");
      toast.success(`Bem-vindo, ${user.name}!`);
      navigate("/aluno");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Não foi possível entrar na área do aluno.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginLayout>
      <div className="w-full max-w-md rounded-2xl border border-gold/30 bg-card p-8 shadow-xl shadow-gold/5">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-light text-foreground mb-2">
            Área do <span className="text-gradient-gold italic">Aluno</span>
          </h1>
          <p className="text-sm text-muted-foreground font-sans">
            Acesse sua jornada de transformação
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="student-email" className="font-sans text-sm">
              E-mail
            </Label>
            <Input
              id="student-email"
              type="email"
              placeholder="seu@email.com"
              className="bg-background"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="student-password" className="font-sans text-sm">
              Senha
            </Label>
            <Input
              id="student-password"
              type="password"
              placeholder="••••••••"
              className="bg-background"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-full font-semibold tracking-wide"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground font-sans">
          Ainda não tem acesso?{" "}
          <a href="/#planos" className="text-accent hover:underline">
            Conheça os planos
          </a>
        </p>
      </div>
    </LoginLayout>
  );
};

export default StudentLogin;
