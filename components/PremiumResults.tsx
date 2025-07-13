'use client';

import { usePro } from "../src/context/ProContext";
import { getClothingRecommendations } from "../src/utils/fashionUtils";

export default function PremiumResults({ dominantColor }) {
  const { isPro } = usePro();
  const recommendations = getClothingRecommendations(dominantColor);

  if (!isPro) return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <p className="text-yellow-800">
        Unlock personalized clothing recommendations with Pro subscription
      </p>
    </div>
  );

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="font-bold mb-3">Personalized Recommendations</h3>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Best Colors</h4>
          <div className="flex flex-wrap gap-1">
            {recommendations.colors.map(color => (
              <div 
                key={color}
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Fabrics</h4>
          <ul className="list-disc pl-5">
            {recommendations.fabrics.map(fabric => (
              <li key={fabric}>{fabric}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Accessories</h4>
          <ul className="list-disc pl-5">
            {recommendations.accessories.map(accessory => (
              <li key={accessory}>{accessory}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}