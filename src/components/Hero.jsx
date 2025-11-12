'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80')"
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      
      {/* Content */}
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
        >
          <Link
            href="/browse"
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25"
          >
            Browse Rentals
          </Link>
          <Link
            href="/list-item"
            className="px-8 py-4 border-2 border-cyan-400 text-white font-semibold rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
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
        >
          <div className="text-white">
            <div className="text-3xl font-bold text-cyan-400">5K+</div>
            <div className="text-gray-300">Items Listed</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold text-cyan-400">2K+</div>
            <div className="text-gray-300">Active Renters</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold text-cyan-400">500+</div>
            <div className="text-gray-300">Rental Shops</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}