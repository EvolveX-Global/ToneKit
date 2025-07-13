import convert from 'color-convert';
import { deltaE } from 'color-delta-e';

export function getDominantColors(
  imageData: ImageData,
  count = 5,
  threshold = 8               // tweak if you want stricter grouping
) {
  const buckets: Record<string, number> = {};

  for (let i = 0; i < imageData.data.length; i += 4) {
    const [r, g, b, alpha] = imageData.data.slice(i, i + 4);

    if (alpha < 125) continue;              // ignore transparent pixels

    const [L, A, B] = convert.rgb.lab(r, g, b);         // → sRGB ► Lab
    const lab: [number, number, number] = [
      Math.round(L),
      Math.round(A),
      Math.round(B),
    ];

    // try to merge into an existing bucket
    const existingKey = Object.keys(buckets).find(k => {
      const kLab = k.split(',').map(Number) as [number, number, number];
      return deltaE(lab, kLab, 'lab') < threshold;
    });

    const key = existingKey ?? lab.join(',');
    buckets[key] = (buckets[key] ?? 0) + 1;
  }

  return Object.entries(buckets)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)                       // top N by frequency
    .map(([k]) => k.split(',').map(Number) as [number, number, number]);
}
