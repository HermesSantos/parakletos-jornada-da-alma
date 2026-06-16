import { useEffect, useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { createMissaoLibertePayment, getPaymentStatus, simulateMissaoLibertePayment } from "@/lib/api";
import { ApiRequestError } from "@/lib/api";
import type { MissaoLiberteContent } from "@/lib/cms-types";

type MissaoLibertePaymentModalProps = {
  content: MissaoLiberteContent;
};

type Step = "email" | "pix" | "success";

const formatAmount = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const MissaoLibertePaymentModal = ({ content }: MissaoLibertePaymentModalProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [brCode, setBrCode] = useState<string | null>(null);
  const [brCodeBase64, setBrCodeBase64] = useState<string | null>(null);
  const [amountCents, setAmountCents] = useState(content.priceCents);
  const [isSimulating, setIsSimulating] = useState(false);
  const showDevSimulate = import.meta.env.DEV;

  const resetModal = () => {
    setStep("email");
    setEmail("");
    setPaymentId(null);
    setBrCode(null);
    setBrCodeBase64(null);
    setAmountCents(content.priceCents);
    setIsSubmitting(false);
    setIsSimulating(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetModal();
    }
  };

  const handleSubmitEmail = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Informe seu e-mail para continuar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createMissaoLibertePayment(email.trim());

      setPaymentId(response.paymentId);
      setBrCode(response.brCode);
      setBrCodeBase64(response.brCodeBase64);
      setAmountCents(response.amount);
      setStep("pix");
    } catch (error) {
      const message =
        error instanceof ApiRequestError ? error.message : "Não foi possível gerar o PIX. Tente novamente.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyPix = async () => {
    if (!brCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(brCode);
      toast.success("Código Pix copiado.");
    } catch {
      toast.error("Não foi possível copiar o código Pix.");
    }
  };

  const handleSimulatePayment = async () => {
    if (!paymentId) {
      return;
    }

    setIsSimulating(true);

    try {
      const status = await simulateMissaoLibertePayment(paymentId);

      if (status.status === "paid") {
        setStep("success");
        toast.success("Pagamento simulado com sucesso.");
      }
    } catch (error) {
      const message =
        error instanceof ApiRequestError ? error.message : "Não foi possível simular o pagamento.";
      toast.error(message);
    } finally {
      setIsSimulating(false);
    }
  };

  useEffect(() => {
    if (!open || step !== "pix" || !paymentId) {
      return;
    }

    let cancelled = false;

    const pollStatus = async () => {
      try {
        const status = await getPaymentStatus(paymentId);

        if (cancelled) {
          return;
        }

        if (status.status === "paid") {
          setStep("success");
        }
      } catch {
        // Ignora erros temporários de rede durante o polling.
      }
    };

    pollStatus();
    const intervalId = window.setInterval(pollStatus, 4000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [open, step, paymentId]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground tracking-wider transition-all hover:opacity-90 hover:shadow-lg w-full sm:w-auto"
        >
          {content.ctaLabel}
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl w-[95vw] p-8 md:p-10">
        {step === "email" && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-3xl font-semibold text-foreground">
                {content.title}
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Informe seu e-mail para gerar o PIX de {content.price}. Após a confirmação do pagamento, você
                receberá as instruções por e-mail.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitEmail} className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label htmlFor="missao-liberte-email">Seu e-mail</Label>
                <Input
                  id="missao-liberte-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando PIX...
                  </>
                ) : (
                  `Gerar PIX de ${content.price}`
                )}
              </Button>
            </form>
          </>
        )}

        {step === "pix" && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-3xl font-semibold text-foreground">
                Pague com Pix
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Escaneie o QR Code ou copie o código abaixo. Valor: {formatAmount(amountCents)}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {brCodeBase64 && (
                <div className="rounded-2xl border border-gold/30 bg-gold/5 p-4 max-w-xs mx-auto">
                  <img src={brCodeBase64} alt="QR Code Pix" className="w-full h-auto rounded-xl" />
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-accent" />
                Aguardando confirmação do pagamento...
              </div>

              {brCode && (
                <Button type="button" variant="outline" className="w-full" onClick={handleCopyPix}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar código Pix
                </Button>
              )}

              {showDevSimulate && (
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={handleSimulatePayment}
                  disabled={isSimulating}
                >
                  {isSimulating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Simulando pagamento...
                    </>
                  ) : (
                    "Simular pagamento (dev)"
                  )}
                </Button>
              )}
            </div>
          </>
        )}

        {step === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-3xl font-semibold text-foreground flex items-center gap-2">
                <Check className="h-7 w-7 text-accent" />
                Pagamento confirmado!
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Enviamos as instruções da Missão Liberte-se para <strong>{email}</strong>. Verifique sua caixa
                de entrada e spam.
              </DialogDescription>
            </DialogHeader>

            <Button type="button" className="w-full mt-4" onClick={() => handleOpenChange(false)}>
              Fechar
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MissaoLibertePaymentModal;
