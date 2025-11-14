'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AnimatedHeader() {
  const { scrollY } = useScroll();
  const logoOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const navbarOpacity = useTransform(scrollY, [100, 300], [1, 0]);

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-screen max-w-7xl">
      <div className="flex items-center justify-between px-8">
        {/* Logo */}
        <motion.div 
          style={{ opacity: logoOpacity }}
          className="flex-shrink-0"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="text-2xl font-bold text-white">
              <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">Q</span>uickRent
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Navbar */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ opacity: navbarOpacity }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4 shadow-lg shadow-black/10"
          role="navigation"
          aria-label="Main navigation"
        >
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
                  className="text-white font-semibold hover:bg-gradient-to-r hover:from-cyan-400 hover:to-green-400 hover:bg-clip-text hover:text-transparent transition-all duration-300 relative group focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-green-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
        
        {/* CTA Buttons */}
        <motion.div 
          style={{ opacity: logoOpacity }}
          className="flex items-center gap-4 flex-shrink-0"
        >
          <motion.div whileHover={{ boxShadow: "0 0 20px rgba(6,182,212,0.5)" }}>
            <Link
              href="/post-rental"
              className="px-8 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Post a rental item"
            >
              Post a Rental
            </Link>
          </motion.div>
          <motion.div whileHover={{ boxShadow: "0 0 20px rgba(6,182,212,0.5)" }}>
            <Link
              href="/login"
              className="px-8 py-2 border border-cyan-400 text-white font-semibold rounded-lg hover:bg-cyan-400/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Login or register account"
            >
              Login / Register
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}