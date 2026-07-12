import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { changePassword } from "@/lib/api";
import { getAuthUser } from "@/lib/auth";

const StudentAccountPage = () => {
  const user = getAuthUser("student");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutation({
    mutationFn: () => changePassword(currentPassword, newPassword),
    onSuccess: () => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Senha alterada com sucesso.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("A confirmação da senha não confere.");
      return;
    }

    mutation.mutate();
  };

  return (
    <div className="max-w-lg">
      <h1 className="font-serif text-3xl text-foreground mb-2">
        Minha <span className="text-gradient-gold italic">Conta</span>
      </h1>
      <p className="text-muted-foreground font-sans text-sm mb-8">
        Gerencie suas informações de acesso.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Alterar senha</CardTitle>
          <CardDescription>
            {user?.email ? `Conta: ${user.email}` : "Informe sua senha atual e escolha uma nova."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha atual</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova senha</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar nova senha</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Salvando..." : "Alterar senha"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAccountPage;
