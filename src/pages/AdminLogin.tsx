import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginLayout from "@/components/LoginLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { login } from "@/lib/api";
import { setAuthSession } from "@/lib/auth";
import { Shield } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { token, user } = await login(email, password);

      if (!user.is_admin) {
        toast.error("Acesso restrito a administradores.");
        return;
      }

      setAuthSession(token, user, "admin");
      toast.success(`Bem-vindo, ${user.name}!`);
      navigate("/admin");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Não foi possível entrar no painel.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginLayout>
      <div className="w-full max-w-md rounded-2xl border border-forest/30 bg-card p-8 shadow-xl shadow-forest/5">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-serif text-3xl font-light text-foreground mb-2">
            Painel <span className="text-gradient-gold italic">Admin</span>
          </h1>
          <p className="text-sm text-muted-foreground font-sans">
            Acesso restrito à equipe Parakletos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="admin-email" className="font-sans text-sm">
              E-mail
            </Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="admin@email.com"
              className="bg-background"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-password" className="font-sans text-sm">
              Senha
            </Label>
            <Input
              id="admin-password"
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
            className="w-full rounded-full font-semibold tracking-wide bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar no painel"}
          </Button>
        </form>
      </div>
    </LoginLayout>
  );
};

export default AdminLogin;
