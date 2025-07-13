/* utils/exporters.ts */
'use client';                       // if you’re in a Next.js App Router project

import { encode } from 'ase-utils';
import { saveAs } from 'file-saver';

function hexToRgbFloat(hex: string): [number, number, number] {
  const int = parseInt(hex.slice(1), 16);
  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255,
  ];
}

export function exportASE(colors: string[], fileName = 'palette.ase') {
  const buffer = encode({
    colors: colors.map(c => ({
      name: c,
      model: 'RGB',
      color: hexToRgbFloat(c),   // ASE expects 0-1 floats
      type: 'global',
    })),
  });

  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
}
