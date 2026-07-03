import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPaymentStatus } from "@/lib/api";

type PageState = "loading" | "pending" | "paid" | "error";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const [pageState, setPageState] = useState<PageState>("loading");

  useEffect(() => {
    if (!paymentId) {
      setPageState("error");
      return;
    }

    let cancelled = false;

    const checkStatus = async () => {
      try {
        const status = await getPaymentStatus(paymentId);

        if (cancelled) {
          return;
        }

        if (status.status === "paid") {
          setPageState("paid");
          return;
        }

        if (status.status === "failed" || status.status === "expired") {
          setPageState("error");
          return;
        }

        setPageState("pending");
      } catch {
        if (!cancelled) {
          setPageState("error");
        }
      }
    };

    checkStatus();
    const intervalId = window.setInterval(checkStatus, 4000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [paymentId]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full rounded-2xl border border-border bg-card p-8 md:p-10 text-center shadow-lg">
        {pageState === "loading" && (
          <>
            <Loader2 className="h-10 w-10 animate-spin text-accent mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Verificando pagamento...
            </h1>
            <p className="text-muted-foreground">Aguarde um momento.</p>
          </>
        )}

        {pageState === "pending" && (
          <>
            <Loader2 className="h-10 w-10 animate-spin text-accent mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Aguardando confirmação
            </h1>
            <p className="text-muted-foreground">
              Seu pagamento ainda está sendo processado. Esta página será atualizada automaticamente.
            </p>
          </>
        )}

        {pageState === "paid" && (
          <>
            <Check className="h-10 w-10 text-accent mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Pagamento confirmado!
            </h1>
            <p className="text-muted-foreground mb-6">
              Enviamos as instruções da Missão Liberte-se para o seu e-mail. Verifique sua caixa de entrada e
              spam.
            </p>
            <Button asChild className="w-full">
              <Link to="/#missao-liberte-se">Voltar ao site</Link>
            </Button>
          </>
        )}

        {pageState === "error" && (
          <>
            <XCircle className="h-10 w-10 text-destructive mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Não foi possível confirmar o pagamento
            </h1>
            <p className="text-muted-foreground mb-6">
              {paymentId
                ? "O pagamento ainda não foi confirmado ou ocorreu um erro. Se você já pagou, aguarde alguns minutos e tente novamente."
                : "Link de confirmação inválido."}
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/#missao-liberte-se">Voltar ao site</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
