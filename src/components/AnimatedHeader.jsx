'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AnimatedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Animated Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="flex items-center space-x-2">
            <motion.div 
              className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white font-bold text-xl">Q</span>
            </motion.div>
            <span className="text-2xl font-bold text-gray-800">QuickRent</span>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'Browse Items', 'Categories', 'How It Works'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Link 
                href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/list-item" className="bg-white text-blue-600 border-2 border-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-sm">
              List Your Item
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm">
              Sign In
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden p-2"
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </motion.svg>
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white border-t border-gray-200"
      >
        <div className="px-4 py-4 space-y-4">
          {['Home', 'Browse Items', 'Categories', 'How It Works'].map((item) => (
            <motion.div
              key={item}
              whileHover={{ x: 10 }}
              className="block"
            >
              <Link 
                href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className="block text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}