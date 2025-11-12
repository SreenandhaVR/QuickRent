'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-7xl lg:text-9xl font-black mb-6 leading-none">
              <span className="text-white">Quick</span>
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Rent</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto mb-8"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto font-light"
          >
            The Future of Rental Solutions
            <br />
            <span className="text-cyan-400 font-medium">Connecting Communities Through Smart Rentals</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.5)" }}>
              <Link
                href="/browse"
                className="group px-12 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg font-bold text-lg relative overflow-hidden"
              >
                <span className="relative z-10">Explore Rentals</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/list-item"
                className="px-12 py-4 border border-cyan-400/50 rounded-lg font-bold text-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
              >
                List Your Items
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Active Users', icon: '👥' },
              { number: '15K+', label: 'Listed Items', icon: '📦' },
              { number: '500+', label: 'Partner Shops', icon: '🏪' },
              { number: '98%', label: 'Satisfaction Rate', icon: '⭐' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              Our <span className="text-cyan-400">Solutions</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive rental ecosystem designed for modern businesses and individuals
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: 'For Individuals',
                description: 'Rent anything from cameras to tools. Quick, secure, and affordable.',
                features: ['Verified Items', 'Instant Booking', 'Insurance Coverage', '24/7 Support'],
                icon: '👤',
                gradient: 'from-cyan-500/20 to-blue-500/20'
              },
              {
                title: 'For Rental Shops',
                description: 'Expand your reach and manage inventory with our advanced platform.',
                features: ['Inventory Management', 'Analytics Dashboard', 'Payment Processing', 'Customer Insights'],
                icon: '🏪',
                gradient: 'from-emerald-500/20 to-cyan-500/20'
              },
              {
                title: 'Enterprise Solutions',
                description: 'Custom rental solutions for large organizations and corporations.',
                features: ['White-label Platform', 'API Integration', 'Custom Workflows', 'Dedicated Support'],
                icon: '🏢',
                gradient: 'from-purple-500/20 to-emerald-500/20'
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`p-8 bg-gradient-to-br ${service.gradient} backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-all duration-300`}
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="mt-6 px-6 py-3 bg-white/10 border border-cyan-400/50 rounded-lg font-semibold hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              Powered by <span className="text-emerald-400">Advanced Technology</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'AI Matching', icon: '🤖', desc: 'Smart item recommendations' },
              { name: 'Blockchain Security', icon: '🔐', desc: 'Secure transactions' },
              { name: 'IoT Integration', icon: '📡', desc: 'Real-time tracking' },
              { name: 'Cloud Infrastructure', icon: '☁️', desc: '99.9% uptime guarantee' }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16,185,129,0.3)" }}
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center hover:border-emerald-400/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-emerald-400">{tech.name}</h3>
                <p className="text-gray-400 text-sm">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-cyan-500/10"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-12 bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl"
          >
            <h2 className="text-5xl font-bold mb-6">
              Ready to Transform Your
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Rental Experience?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of users and businesses already using QuickRent to streamline their rental operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.5)" }}>
                <Link
                  href="/get-started"
                  className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg font-bold text-lg"
                >
                  Get Started Today
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/contact"
                  className="px-10 py-4 border border-emerald-400/50 rounded-lg font-bold text-lg hover:bg-emerald-400/10 hover:border-emerald-400 transition-all duration-300"
                >
                  Contact Sales
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}