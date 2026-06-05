import { FormEvent } from "react";
import LoginLayout from "@/components/LoginLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

const AdminLogin = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              placeholder="admin@parakletos.com"
              className="bg-background"
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
            />
          </div>

          <Button type="submit" className="w-full rounded-full font-semibold tracking-wide bg-primary hover:bg-primary/90">
            Entrar no painel
          </Button>
        </form>
      </div>
    </LoginLayout>
  );
};

export default AdminLogin;
