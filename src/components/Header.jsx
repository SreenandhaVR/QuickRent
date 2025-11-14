'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  if (pathname !== '/') {
    return null;
  }

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-screen max-w-7xl">
      <div className="flex items-center justify-between px-8">
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold text-white">
            <span className="text-cyan-400">Q</span>uickRent
          </Link>
        </div>
        
        <nav className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4">
          <ul className="flex items-center gap-8">
            {[
              { name: 'Home', href: '/' },
              { name: 'Browse Items', href: '/browse' },
              { name: 'Rent Out', href: '/rent-out' },
              { name: 'Near Me', href: '/near-me' }
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-white font-semibold hover:text-cyan-400 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            href="/post-rental"
            className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-green-500 transition-colors duration-200"
          >
            Post a Rental
          </Link>
          <Link
            href="/login"
            className="px-6 py-2 border border-cyan-400 text-white font-semibold rounded-lg hover:bg-cyan-400/10 transition-colors duration-200"
          >
            Login / Register
          </Link>
        </div>
      </div>
    </div>
  );
}