'use client';
import SkinToneAnalyzer from '../../components/SkinToneAnalyzer';
import PremiumPalettePacks from '../../components/PremiumPalettePacks';

export default function Home() {
  return (
    <section className="max-w-5xl mx-auto flex flex-col items-center py-12">
      <h1 className="text-4xl sm:text-6xl font-bold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
        Skin Tone Analyzer
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl">
        Upload an image and instantly get a color palette with suggestions for your design projects.
      </p>
      <SkinToneAnalyzer />
      <PremiumPalettePacks />
    </section>
  );
}
