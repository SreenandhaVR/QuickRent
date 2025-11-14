'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            <span className="text-cyan-400">Q</span>uickRent
          </h1>
          <p className="text-gray-400">
            {isLogin ? 'Welcome back!' : 'Join the community'}
          </p>
        </div>

        <form className="space-y-6">
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          )}
          
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-green-400 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-green-500 transition-colors"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}