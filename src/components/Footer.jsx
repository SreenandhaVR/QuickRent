import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t-4 border-gradient-to-r from-cyan-400 to-green-400" role="contentinfo">
      <div className="h-1 bg-gradient-to-r from-cyan-400 to-green-400" aria-hidden="true"></div>
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <nav aria-labelledby="quick-links-heading">
            <h2 id="quick-links-heading" className="text-white font-semibold text-lg mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Home</Link></li>
              <li><Link href="/browse" className="text-gray-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Browse Items</Link></li>
              <li><Link href="/rent-out" className="text-gray-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Rent Out</Link></li>
              <li><Link href="/near-me" className="text-gray-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Near Me</Link></li>
            </ul>
          </nav>

          {/* Support */}
          <nav aria-labelledby="support-heading">
            <h2 id="support-heading" className="text-white font-semibold text-lg mb-4">Support</h2>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Help Center</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">FAQ</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">Privacy Policy</Link></li>
            </ul>
          </nav>

          {/* Follow Us */}
          <nav aria-labelledby="social-heading">
            <h2 id="social-heading" className="text-white font-semibold text-lg mb-4">Follow Us</h2>
            <ul className="space-y-2">
              <li><Link href="https://facebook.com/quickrent" className="text-gray-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded" aria-label="Follow us on Facebook">Facebook</Link></li>
              <li><Link href="https://twitter.com/quickrent" className="text-gray-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded" aria-label="Follow us on Twitter">Twitter</Link></li>
              <li><Link href="https://instagram.com/quickrent" className="text-gray-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded" aria-label="Follow us on Instagram">Instagram</Link></li>
              <li><Link href="https://linkedin.com/company/quickrent" className="text-gray-300 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded" aria-label="Follow us on LinkedIn">LinkedIn</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-white font-semibold text-lg mb-4">Contact</h2>
            <address className="space-y-2 not-italic">
              <div className="text-gray-300">
                <a href="mailto:support@quickrent.com" className="hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">support@quickrent.com</a>
              </div>
              <div className="text-gray-300">
                <a href="tel:+15551234567" className="hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded">+1 (555) 123-4567</a>
              </div>
              <div className="text-gray-300">123 Rental Street</div>
              <div className="text-gray-300">City, State 12345</div>
            </address>
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