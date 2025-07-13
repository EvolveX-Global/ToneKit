'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface Analytics {
  usageCount: number;
  usageLimit: number | null;
  usageHistory: number[];
  revenue: number;
}

interface ProContextValue {
  isPro: boolean;
  plan: string;
  analytics: Analytics;
  setPlan: (plan: string) => void;
  trackUsage: () => void;
}

const ProContext = createContext<ProContextValue>({
  isPro: false,
  plan: 'free',
  analytics: {
    usageCount: 0,
    usageLimit: 5,
    usageHistory: [],
    revenue: 0
  },
  setPlan: () => {},
  trackUsage: () => {}
});

export function ProProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState('free');
  const [analytics, setAnalytics] = useState({
    usageCount: 0,
    usageLimit: plan === 'pro' ? null : 5,
    usageHistory: [],
    revenue: 0
  });

  const trackUsage = () => {
    setAnalytics(prev => {
      const newCount = prev.usageCount + 1;
      const newHistory = [...prev.usageHistory, Date.now()].slice(-30);
      
      return {
        ...prev,
        usageCount: newCount,
        usageHistory: newHistory
      };
    });
  };

  // Load from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('plan');
    const savedAnalytics = localStorage.getItem('analytics');
    
    if (savedPlan) setPlan(savedPlan);
    if (savedAnalytics) setAnalytics(JSON.parse(savedAnalytics));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('plan', plan);
    localStorage.setItem('analytics', JSON.stringify(analytics));
    
    // Update usage limit based on plan
    setAnalytics(prev => ({
      ...prev,
      usageLimit: plan === 'pro' ? null : 5
    }));
  }, [plan, analytics]);

  return (
    <ProContext.Provider value={{ 
      isPro: plan === 'pro', 
      plan, 
      analytics,
      setPlan,
      trackUsage
    }}>
      {children}
    </ProContext.Provider>
  );
}

export const usePro = () => useContext(ProContext);