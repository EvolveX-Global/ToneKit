const FASHION_RULES = {
    WARM: ['#E67E22', '#D35400', '#F1C40F', '#16A085', '#27AE60'],
    COOL: ['#3498DB', '#2980B9', '#8E44AD', '#2C3E50', '#1ABC9C'],
    NEUTRAL: ['#95A5A6', '#7F8C8D', '#BDC3C7', '#34495E', '#2C3E50']
  };
  
  export function getClothingRecommendations(dominantLab: number[]) {
    const [L, a, b] = dominantLab;
    const undertone = (a > 0) ? 'WARM' : (a < -2) ? 'COOL' : 'NEUTRAL';
    
    return {
      undertone,
      colors: FASHION_RULES[undertone],
      fabrics: undertone === 'WARM' 
        ? ['Linen', 'Cotton', 'Seersucker'] 
        : ['Silk', 'Satin', 'Wool'],
      accessories: undertone === 'COOL' 
        ? ['Silver jewelry', 'Pearls'] 
        : ['Gold jewelry', 'Wooden accessories']
    };
  }