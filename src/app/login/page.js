'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useLoading } from '../../contexts/LoadingContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { loading, setLoading } = useLoading();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Login form submitted');
    console.log('Email:', email);
    console.log('Password length:', password.length);
    
    try {
      console.log('Making API request to /api/auth/login');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      console.log('Response URL:', response.url);
      
      const responseText = await response.text();
      console.log('Raw response length:', responseText.length);
      console.log('Raw response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed JSON data:', data);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        console.log('Response was not JSON, likely an error page');
        console.log('First 500 chars of response:', responseText.substring(0, 500));
        throw new Error('Server returned an error page instead of JSON');
      }
      
      if (response.ok) {
        console.log('✅ Login successful!');
        console.log('📄 Response data:', data);
        console.log('🔑 Token received:', data.token);
        console.log('👤 User data:', data.user);
        localStorage.setItem('token', data.token);
        console.log('💾 Token stored in localStorage');
        alert('Login successful!');
        window.location.href = '/dashboard';
      } else {
        console.log('❌ Login failed with status:', response.status);
        console.log('📄 Error response:', data);
        console.log('🚫 Error message:', data.error);
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Mouse Follower Glow */}
      <div 
        className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none transition-all duration-[3500ms] ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Large Q Shape Container */}
      <div className="relative z-10 w-full max-w-xl">
        {/* Giant Q Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full opacity-30">
            <defs>
              <linearGradient id="qGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#22d3ee', stopOpacity: 0.6}} />
                <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 0.6}} />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="60" fill="none" stroke="url(#qGradient)" strokeWidth="12"/>
            <line x1="140" y1="140" x2="160" y2="160" stroke="url(#qGradient)" strokeWidth="12" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Login Form Container */}
        <div className="relative backdrop-blur-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-[2rem] p-6 shadow-[0_8px_32px_0_rgba(34,211,238,0.15)] hover:shadow-[0_8px_48px_0_rgba(34,211,238,0.25)] transition-all duration-[1000ms] ease-in-out">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block mb-3" aria-label="Go to QuickRent homepage">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                QuickRent
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Sign In</h1>
            <p className="text-cyan-400/70 text-xs">Continue your rental journey</p>
          </div>

        {/* Login Form */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="relative mb-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-0 border-b-2 border-gray-600 py-3 text-cyan-400 placeholder-transparent focus:outline-none focus:border-cyan-400 transition-all duration-500 peer"
                placeholder="Email"
                id="email"
                name="email"
                autoComplete="email"
                aria-label="Email address"
                required
              />
              <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-cyan-400 peer-focus:text-sm">
                Email Address
              </label>
              <Mail className="absolute right-0 top-3 text-cyan-400/50" size={18} aria-hidden="true" />
            </div>

            {/* Password Field */}
            <div className="relative mb-5">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-0 border-b-2 border-gray-600 py-3 text-cyan-400 placeholder-transparent focus:outline-none focus:border-cyan-400 transition-all duration-500 peer"
                placeholder="Password"
                id="password"
                name="password"
                autoComplete="current-password"
                aria-label="Password"
                required
              />
              <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-cyan-400 peer-focus:text-sm">
                Password
              </label>
              <div className="absolute right-0 top-3 flex gap-2">
                <Lock className="text-cyan-400/50" size={18} aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-all duration-300 ${rememberMe ? 'border-cyan-400 bg-cyan-400' : 'border-gray-500'}`}>
                    {rememberMe && <ArrowRight className="text-black" size={16} />}
                  </div>
                </div>
                <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors">Keep me signed in</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors underline-offset-4 hover:underline">
                Reset Password
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              aria-label="Sign in to your account"
              className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 text-black font-bold py-3 px-6 rounded-2xl transition-all duration-[800ms] ease-out flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] group"
            >
              <span>Enter</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} aria-hidden="true" />
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-100px) translateX(50px);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}