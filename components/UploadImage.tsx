import { useState, useEffect } from "react";

interface UploadImageProps {
  onImageChange?: (file: File, preview: string) => void;
  onError?: (message: string) => void;
}

export default function UploadImage({
  onImageChange,
  onError,
}: UploadImageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      const msg = "Please select a valid image file";
      setError(msg);
      onError?.(msg);
      return;
    }

    try {
      if ((window as any).codex?.previewFile) {
        const url = await (window as any).codex.previewFile(file);
        setPreview(url);
        setError(null);
        onImageChange?.(file, url);
      } else if ((window as any).codex?.preview) {
        const url = await (window as any).codex.preview(file);
        setPreview(url);
        setError(null);
        onImageChange?.(file, url);
      } else {
        const url = URL.createObjectURL(file);
        setPreview(url);
        setError(null);
        onImageChange?.(file, url);
      }
    } catch {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setError(null);
      onImageChange?.(file, url);
    }
  }

  useEffect(() => {
    return () => {
      if (preview && !(window as any).codex?.previewFile && !(window as any).codex?.preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept="image/*" onChange={handleChange} />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {preview && (
        <img src={preview} alt="Selected image" className="max-w-full h-auto" />
      )}
    </div>
  );
}
