import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">QuickRent</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Home
          </Link>
          <Link href="/browse" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Browse Items
          </Link>
          <Link href="/categories" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Categories
          </Link>
          <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            How It Works
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/list-item" className="bg-white text-blue-600 border-2 border-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-sm">
            List Your Item
          </Link>
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm">
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
}