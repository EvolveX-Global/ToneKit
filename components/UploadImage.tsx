import { useState, useEffect } from "react";

export default function UploadImage() {
  const [preview, setPreview] = useState<string | null>(null);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if ((window as any).codex?.previewFile) {
        const url = await (window as any).codex.previewFile(file);
        setPreview(url);
      } else if ((window as any).codex?.preview) {
        const url = await (window as any).codex.preview(file);
        setPreview(url);
      } else {
        const url = URL.createObjectURL(file);
        setPreview(url);
      }
    } catch {
      const url = URL.createObjectURL(file);
      setPreview(url);
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
      {preview && (
        <img src={preview} alt="Selected image" className="max-w-full h-auto" />
      )}
    </div>
  );
}
