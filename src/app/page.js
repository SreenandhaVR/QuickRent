'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Cameras', icon: '🎥', count: 120 },
    { name: 'Bikes', icon: '🚴‍♂️', count: 85 },
    { name: 'Tools', icon: '🔧', count: 200 },
    { name: 'Furniture', icon: '🛋️', count: 150 },
    { name: 'Electronics', icon: '💻', count: 95 },
    { name: 'Event Gear', icon: '🎪', count: 75 }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'Found the perfect camera for my wedding shoot. Super easy process!'
    },
    {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'Listed my tools and started earning immediately. Great platform!'
    },
    {
      name: 'Emma Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'Rented a bike for the weekend. Clean, affordable, and convenient.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 text-4xl opacity-30"
        >
          🎥
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-32 right-20 text-4xl opacity-30"
        >
          🚴‍♂️
        </motion.div>
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-32 left-20 text-4xl opacity-30"
        >
          🔧
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl lg:text-8xl font-bold mb-8 leading-tight"
          >
            Find Anything to Rent —{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Anytime, Anywhere
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
          >
            From bikes to cameras, tools to tech — QuickRent connects you with what you need.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="What do you want to rent?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg"
              />
              <button className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:scale-105 transition-transform">
                Search
              </button>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/browse"
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Browse Items
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/list-item"
                className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
              >
                List Your Item
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Browse Popular Categories</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.05, boxShadow: "0 20px 40px rgba(6,182,212,0.3)" }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-400">{category.count} items</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* For Renters & Shop Owners */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              {...fadeInUp}
              className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-md border border-white/10 rounded-3xl p-10"
            >
              <div className="text-6xl mb-6">👥</div>
              <h3 className="text-3xl font-bold mb-6">For Renters</h3>
              <p className="text-xl text-gray-300 mb-8">
                Search, compare, and rent verified items nearby. Get what you need without the commitment of buying.
              </p>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/register-renter"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl font-bold hover:shadow-lg transition-all duration-300"
                >
                  Register as Renter
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-white/10 rounded-3xl p-10"
            >
              <div className="text-6xl mb-6">🏪</div>
              <h3 className="text-3xl font-bold mb-6">For Rental Shops</h3>
              <p className="text-xl text-gray-300 mb-8">
                Register your shop or list your items to reach local customers and grow your rental business.
              </p>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/register-shop"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold hover:shadow-lg transition-all duration-300"
                >
                  List Your Shop
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Near Me Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Rental Services Near You</h2>
            <p className="text-xl text-gray-300">Discover local rental options in your area</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              { city: 'Kochi', service: 'Bike Rentals', count: '25+ shops' },
              { city: 'Thrissur', service: 'Camera Rentals', count: '15+ shops' },
              { city: 'Calicut', service: 'Tool Rentals', count: '30+ shops' }
            ].map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-2">{location.service} in {location.city}</h3>
                <p className="text-gray-400">{location.count}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeInUp}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.5)" }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-lg shadow-lg"
            >
              📍 Enable Location
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Referral CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            {...fadeInUp}
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/10 rounded-3xl p-12"
          >
            <div className="text-6xl mb-6">🎁</div>
            <h2 className="text-4xl font-bold mb-6">Refer a Friend or Shop — Earn Rewards!</h2>
            <p className="text-xl text-gray-300 mb-8">
              Share QuickRent with friends and earn credits for every successful referral.
            </p>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/refer"
                className="inline-block px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Refer Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">What Our Users Say</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            {...fadeInUp}
            className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md border border-white/10 rounded-3xl p-16"
          >
            <h2 className="text-6xl font-bold mb-8">
              Join the{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Smart Way
              </span>{' '}
              to Rent
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Start your rental journey today and discover a world of possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/browse"
                  className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Start Browsing
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/register"
                  className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Register Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}