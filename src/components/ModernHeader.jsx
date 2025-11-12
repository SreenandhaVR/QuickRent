'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ModernHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3"
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                QuickRent
              </span>
            </Link>
          </motion.div>

          {/* Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {[
              { name: 'Home', href: '/' },
              { name: 'Browse', href: '/browse' },
              { name: 'Categories', href: '/categories' },
              { name: 'Near Me', href: '/near-me' }
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link 
                  href={item.href}
                  className="relative text-gray-300 hover:text-cyan-400 font-medium transition-all duration-300 group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/list-item" 
                className="px-6 py-2.5 text-cyan-400 font-semibold hover:bg-cyan-400/10 rounded-xl transition-all duration-300"
              >
                List Item
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/login" 
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Sign In
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-6 space-y-4 border-t border-white/10 mt-4">
            {[
              { name: 'Home', href: '/' },
              { name: 'Browse', href: '/browse' },
              { name: 'Categories', href: '/categories' },
              { name: 'Near Me', href: '/near-me' }
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ x: 10 }}
                className="block"
              >
                <Link 
                  href={item.href}
                  className="block text-gray-300 hover:text-cyan-400 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <div className="pt-4 space-y-3">
              <Link 
                href="/list-item" 
                className="block w-full text-center px-6 py-3 text-cyan-400 font-semibold border border-cyan-400 rounded-xl hover:bg-cyan-400/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                List Item
              </Link>
              <Link 
                href="/login" 
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}