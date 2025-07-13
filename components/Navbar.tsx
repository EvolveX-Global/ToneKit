import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full border-b mb-8 bg-white/80 backdrop-blur">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          ToneKit
        </Link>
        <div className="flex gap-4 text-sm">
          <Link href="#features" className="hover:underline">Features</Link>
          <Link href="#pricing" className="hover:underline">Pricing</Link>
          <Link href="#login" className="hover:underline">Login</Link>
        </div>
      </nav>
    </header>
  );
}
