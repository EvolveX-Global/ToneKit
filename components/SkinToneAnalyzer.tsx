import { useState, useEffect } from "react";
import UploadImage from "./UploadImage";

interface RGB {
  r: number;
  g: number;
  b: number;
}

function rgbToHex({ r, g, b }: RGB) {
  return (
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function rgbToHsl({ r, g, b }: RGB) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function getPalette(img: HTMLImageElement, count = 5): RGB[] {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const data = ctx.getImageData(0, 0, img.width, img.height).data;
  const buckets: Record<string, number> = {};
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 125) continue;
    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;
    const key = `${r}_${g}_${b}`;
    buckets[key] = (buckets[key] || 0) + 1;
  }
  return Object.entries(buckets)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([k]) => {
      const [r, g, b] = k.split("_").map(Number);
      return { r, g, b };
    });
}

function suggestions(color: RGB): string[] {
  const { h } = rgbToHsl(color);
  if (h < 50) return ["#005f73", "#e9d8a6", "#94d2bd"];
  if (h < 90) return ["#8338ec", "#ff006e", "#3a86ff"];
  if (h < 150) return ["#ffbc42", "#d81159", "#8F2D56"];
  if (h < 210) return ["#ffd166", "#ef476f", "#118ab2"];
  if (h < 270) return ["#06d6a0", "#118ab2", "#ef476f"];
  if (h < 330) return ["#ffadad", "#ffd6a5", "#caffbf"];
  return ["#52796f", "#cad2c5", "#84a98c"];
}

export default function SkinToneAnalyzer() {
  const [palette, setPalette] = useState<RGB[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [actions, setActions] = useState<string[]>([]);

  function handleImageChange(file: File, url: string) {
    setPreview(url);
    const img = new Image();
    img.onload = () => {
      const colors = getPalette(img);
      setPalette(colors);
      setActions((a) => [...a, "upload"]);
    };
    img.src = url;
  }

  function handleError(msg: string) {
    setActions((a) => [...a, `error:${msg}`]);
  }

  function removeColor(index: number) {
    setPalette((p) => {
      const copy = [...p];
      copy.splice(index, 1);
      return copy;
    });
    setActions((a) => [...a, `remove:${index}`]);
  }

  function moveColor(index: number, dir: -1 | 1) {
    setPalette((p) => {
      const copy = [...p];
      const [c] = copy.splice(index, 1);
      copy.splice(index + dir, 0, c);
      return copy;
    });
    setActions((a) => [...a, `move:${index}:${dir}`]);
  }

  function reset() {
    setPalette([]);
    setPreview(null);
    setActions((a) => [...a, "reset"]);
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <UploadImage onImageChange={handleImageChange} onError={handleError} />
      {preview && (
        <img src={preview} alt="preview" className="max-w-full h-auto" />
      )}
      {palette.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="font-bold">Extracted Colors</h3>
          <ul className="flex flex-wrap gap-2">
            {palette.map((c, idx) => (
              <li key={idx} className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded"
                  style={{ background: rgbToHex(c) }}
                />
                <span className="text-xs">{rgbToHex(c)}</span>
                <div className="flex gap-1 mt-1">
                  <button
                    onClick={() => moveColor(idx, -1)}
                    disabled={idx === 0}
                    className="px-1 text-xs border rounded"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveColor(idx, 1)}
                    disabled={idx === palette.length - 1}
                    className="px-1 text-xs border rounded"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeColor(idx)}
                    className="px-1 text-xs border rounded text-red-600"
                  >
                    ×
                  </button>
                </div>
                <div className="flex gap-1 mt-1">
                  {suggestions(c).map((s, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded"
                      style={{ background: s }}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {(preview || palette.length) && (
        <button
          className="self-start px-3 py-1 border rounded"
          onClick={reset}
        >
          Reset
        </button>
      )}
      {actions.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Actions</h3>
          <ol className="list-decimal list-inside text-xs">
            {actions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
