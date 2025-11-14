'use client';

'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" role="banner">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=75"
        alt="Modern city skyline at night with glowing lights"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rw=="
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
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
    </section>
  );
}