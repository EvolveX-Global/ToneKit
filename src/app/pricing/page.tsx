'use client';
import { usePro } from '../../context/ProContext';

export default function PricingPage() {
  const { plan, setPlan } = usePro();
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">Pricing</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h2 className="font-bold mb-2">Free</h2>
          <p className="mb-2">Basic palette extraction and JSON export.</p>
          {plan === 'free' ? (
            <span className="text-green-600 font-bold">Current plan</span>
          ) : (
            <button className="px-3 py-1 border rounded" onClick={() => setPlan('free')}>
              Downgrade
            </button>
          )}
        </div>
        <div className="border p-4 rounded">
          <h2 className="font-bold mb-2">Pro</h2>
          <p className="mb-2">PNG/PDF export and premium palette packs.</p>
          {plan === 'pro' ? (
            <span className="text-green-600 font-bold">Current plan</span>
          ) : (
            <button className="px-3 py-1 border rounded" onClick={() => setPlan('pro')}>
              Upgrade
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
