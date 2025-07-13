export default function PremiumFeatures() {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Premium Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🎨"
              title="AI Palette Generator"
              description="Create custom palettes with AI based on your descriptions"
            />
            
            <FeatureCard 
              icon="👗"
              title="Personalized Recommendations"
              description="Get clothing, fabric, and accessory suggestions tailored to your skin tone"
            />
            
            <FeatureCard 
              icon="📊"
              title="Advanced Analytics"
              description="Track your usage patterns and get business insights"
            />
          </div>
        </div>
      </section>
    );
  }
  
  function FeatureCard({ icon, title, description }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }