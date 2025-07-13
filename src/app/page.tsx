'use client';
import SkinToneAnalyzer from '../../components/SkinToneAnalyzer';

export default function Home() {
  return (
    <main className="flex flex-col items-center p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-4">Skin Tone Analyzer</h1>
      <SkinToneAnalyzer />
    </main>
  );
}
