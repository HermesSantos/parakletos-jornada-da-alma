import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadMedia } from "@/lib/api";
import { toast } from "@/components/ui/sonner";

type ImageUploadFieldProps = {
  label: string;
  value: string;
  section?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
};

const ImageUploadField = ({
  label,
  value,
  section,
  onChange,
  disabled,
}: ImageUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    try {
      const result = await uploadMedia(file, section);
      onChange(result.url);
      toast.success("Imagem enviada com sucesso.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha no upload.");
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value && (
        <img src={value} alt={label} className="w-full max-w-xs rounded-lg border border-border object-cover" />
      )}
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              void handleUpload(file);
            }
          }}
        />
        <Button type="button" variant="outline" disabled={disabled} onClick={() => inputRef.current?.click()}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadField;
