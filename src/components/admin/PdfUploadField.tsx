import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadStudentPdf } from "@/lib/api";
import { toast } from "@/components/ui/sonner";

type PdfUploadFieldProps = {
  label: string;
  value: string;
  journey?: string;
  onChange: (path: string) => void;
  disabled?: boolean;
};

const PdfUploadField = ({ label, value, journey, onChange, disabled }: PdfUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    try {
      const result = await uploadStudentPdf(file, journey);
      onChange(result.path);
      toast.success("PDF enviado com sucesso.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha no upload.");
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value && <p className="text-xs text-muted-foreground font-mono break-all">{value}</p>}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="student/jornada-mulher/..."
          disabled={disabled}
        />
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              void handleUpload(file);
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          Upload PDF
        </Button>
      </div>
    </div>
  );
};

export default PdfUploadField;
