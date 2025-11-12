import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t-4 border-gradient-to-r from-cyan-400 to-green-400">
      <div className="h-1 bg-gradient-to-r from-cyan-400 to-green-400"></div>
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link href="/browse" className="text-gray-300 hover:text-cyan-400 transition-colors">Browse Items</Link></li>
              <li><Link href="/rent-out" className="text-gray-300 hover:text-cyan-400 transition-colors">Rent Out</Link></li>
              <li><Link href="/near-me" className="text-gray-300 hover:text-cyan-400 transition-colors">Near Me</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-300 hover:text-cyan-400 transition-colors">Help Center</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-cyan-400 transition-colors">FAQ</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Facebook</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Twitter</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Instagram</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">LinkedIn</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">support@quickrent.com</li>
              <li className="text-gray-300">+1 (555) 123-4567</li>
              <li className="text-gray-300">123 Rental Street</li>
              <li className="text-gray-300">City, State 12345</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 QuickRent. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}