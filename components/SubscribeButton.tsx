'use client';
import { loadStripe } from '@stripe/stripe-js';

export default function SubscribeButton() {
  const handleSubscribe = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST'
    });
    
    const { sessionId } = await response.json();
    stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <button 
      onClick={handleSubscribe}
      className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
    >
      Get Pro Access
    </button>
  );
}