'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AnimatedContent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Your Trusted Rental Partner — <span className="text-cyan-400">QuickRent</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Find anything you need to rent or list your items to grow your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/browse"
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            Browse Rentals
          </Link>
          <Link
            href="/list-item"
            className="px-8 py-4 border-2 border-cyan-400 text-white font-semibold rounded-lg hover:bg-cyan-400/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            List Your Item
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold text-white mb-6"
      >
        Your Trusted Rental Partner — <span className="text-cyan-400">QuickRent</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl md:text-2xl text-gray-300 mb-8"
      >
        Find anything you need to rent or list your items to grow your business.
      </motion.p>
      
      {/* CTA Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        role="group"
        aria-label="Main actions"
      >
        <Link
          href="/browse"
          className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Browse available rental items"
        >
          Browse Rentals
        </Link>
        <Link
          href="/list-item"
          className="px-8 py-4 border-2 border-cyan-400 text-white font-semibold rounded-lg hover:bg-cyan-400/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
          aria-label="List your item for rental"
        >
          List Your Item
        </Link>
      </motion.div>
      
      {/* Stats Row */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row justify-center gap-8 text-center"
        role="region"
        aria-label="Platform statistics"
      >
        <div className="text-white">
          <div className="text-3xl font-bold text-cyan-400" aria-label="5 thousand plus">5K+</div>
          <div className="text-gray-300">Items Listed</div>
        </div>
        <div className="text-white">
          <div className="text-3xl font-bold text-cyan-400" aria-label="2 thousand plus">2K+</div>
          <div className="text-gray-300">Active Renters</div>
        </div>
        <div className="text-white">
          <div className="text-3xl font-bold text-cyan-400" aria-label="500 plus">500+</div>
          <div className="text-gray-300">Rental Shops</div>
        </div>
      </motion.div>
    </div>
  );
}