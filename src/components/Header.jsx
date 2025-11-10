import Link from 'next/link';

export default function Header() {
  return (
    <header className="glass-card sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <span className="text-primary">Quick</span>
          <span className="text-secondary">Rent</span>
        </Link>
<div className="hidden md:flex gap-8">


</div>
      </nav>
    </header>
  );
}