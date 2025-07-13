'use client';
import { usePro } from '../src/context/ProContext';

const packs = [
  { name: 'Basic', colors: ['#ffadad', '#ffd6a5', '#caffbf'], pro: false },
  { name: 'UI', colors: ['#0f4c81', '#e36414', '#f7b801'], pro: true },
  { name: 'Fashion', colors: ['#e5383b', '#ba181b', '#9d0208'], pro: true },
];

export default function PremiumPalettePacks() {
  const { isPro } = usePro();
  return (
    <div className="mt-8">
      <h3 className="font-bold mb-2">Palette Packs</h3>
      <div className="flex flex-wrap gap-4">
        {packs.map((pack) => (
          <div key={pack.name} className="border p-2 rounded">
            <h4 className="font-semibold text-sm mb-1">{pack.name}</h4>
            {pack.pro && !isPro ? (
              <p className="text-xs text-gray-500">Pro required</p>
            ) : (
              <div className="flex gap-1">
                {pack.colors.map((c) => (
                  <span key={c} className="w-4 h-4 rounded" style={{ background: c }} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
