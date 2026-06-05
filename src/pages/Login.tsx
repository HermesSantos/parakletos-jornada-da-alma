import { FormEvent } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <NavLink to="/" className="text-xl font-serif font-semibold tracking-wide text-foreground sm:text-2xl">
            Inst. <span className="text-gradient-gold">Parakletos</span>
          </NavLink>
          <NavLink
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Voltar ao site
          </NavLink>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
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
              <Label htmlFor="email" className="font-sans text-sm">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-sans text-sm">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-background"
              />
            </div>

            <Button type="submit" className="w-full rounded-full font-semibold tracking-wide">
              Entrar
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground font-sans">
            Ainda não tem acesso?{" "}
            <a href="/#planos" className="text-accent hover:underline">
              Conheça os planos
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
