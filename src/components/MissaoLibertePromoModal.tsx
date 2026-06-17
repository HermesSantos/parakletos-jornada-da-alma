import { useState } from "react";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MissaoLiberteContent } from "@/lib/cms-types";

type MissaoLibertePromoModalProps = {
  content: MissaoLiberteContent;
};

const MissaoLibertePromoModal = ({ content }: MissaoLibertePromoModalProps) => {
  const [open, setOpen] = useState(true);

  const handleCta = () => {
    setOpen(false);

    window.requestAnimationFrame(() => {
      const target = document.querySelector(content.ctaHref);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl w-[95vw] p-0 overflow-hidden gap-0">
        <div className="grid md:grid-cols-2">
          <div className="relative h-48 md:h-auto md:min-h-[420px]">
            <img
              src={content.imageUrl}
              alt="Missão Liberte-se — 21 dias para voltar a viver"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-background/10" />
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <DialogHeader className="text-left space-y-2">
              <span className="text-xs uppercase tracking-[0.35em] text-accent font-sans font-semibold">
                {content.eyebrow}
              </span>
              <DialogTitle className="font-serif text-3xl md:text-4xl font-light text-foreground leading-tight">
                {content.title}
              </DialogTitle>
              <DialogDescription className="font-serif text-lg md:text-xl text-gradient-gold italic">
                {content.subtitle}
              </DialogDescription>
            </DialogHeader>

            <p className="text-sm text-muted-foreground font-sans leading-relaxed mt-4 mb-5">
              {content.description}
            </p>

            <div className="inline-flex flex-col rounded-xl border border-gold/40 bg-gold/10 px-5 py-3 mb-5 w-fit">
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-sans font-semibold">
                {content.batchLabel}
              </span>
              <span className="font-serif text-xl md:text-2xl font-semibold text-foreground mt-0.5 tracking-wide">
                {content.batchDate}
              </span>
            </div>

            <ul className="space-y-2 mb-6 flex-1">
              {content.benefits.slice(0, 4).map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleCta}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground tracking-wider transition-all hover:opacity-90 hover:shadow-lg"
              >
                {content.ctaLabel}
              </button>
              <p className="text-center text-sm text-muted-foreground font-sans">
                Apenas <span className="font-semibold text-accent">R$ 1</span> por dia
                <span className="text-muted-foreground/70"> · {content.price} no total</span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MissaoLibertePromoModal;
