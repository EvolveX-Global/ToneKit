'use client';
import { usePro } from '../../context/ProContext';

export default function DashboardPage() {
  const { plan, setPlan } = usePro();
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Current plan: <strong>{plan}</strong></p>
      <div className="flex gap-2">
        {plan !== 'pro' && (
          <button className="px-3 py-1 border rounded" onClick={() => setPlan('pro')}>
            Upgrade to Pro
          </button>
        )}
        {plan !== 'free' && (
          <button className="px-3 py-1 border rounded" onClick={() => setPlan('free')}>
            Cancel Pro
          </button>
        )}
      </div>
    </div>
  );
}
