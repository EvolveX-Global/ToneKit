import { createContext, useContext, useState, useEffect } from 'react';

interface ProContextValue {
  isPro: boolean;
  plan: string;
  setPlan: (plan: string) => void;
}

const ProContext = createContext<ProContextValue>({
  isPro: false,
  plan: 'free',
  setPlan: () => {},
});

export function ProProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState('free');

  useEffect(() => {
    const saved = localStorage.getItem('plan');
    if (saved) {
      setPlan(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('plan', plan);
  }, [plan]);

  return (
    <ProContext.Provider value={{ isPro: plan === 'pro', plan, setPlan }}>
      {children}
    </ProContext.Provider>
  );
}

export function usePro() {
  return useContext(ProContext);
}
