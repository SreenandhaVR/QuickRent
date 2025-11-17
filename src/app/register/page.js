'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useLoading } from '@/contexts/LoadingContext';

export default function Register() {
  const { loading, setLoading } = useLoading();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/onboarding';
      } else {
        alert(data.error || 'Registration failed');
        setLoading(false);
      }
    } catch (error) {
      alert('Registration failed');
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

        {/* Register Form Container */}
        <div className="relative backdrop-blur-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-[2rem] p-6 shadow-[0_8px_32px_0_rgba(34,211,238,0.15)] hover:shadow-[0_8px_48px_0_rgba(34,211,238,0.25)] transition-all duration-[1000ms] ease-in-out">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block mb-3" aria-label="Go to QuickRent homepage">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                QuickRent
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Create Account</h1>
            <p className="text-cyan-400/70 text-xs">Join QuickRent and start renting today</p>
          </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-0 border-b-2 border-gray-600 py-3 text-cyan-400 placeholder-transparent focus:outline-none focus:border-cyan-400 transition-all duration-500 peer"
                  placeholder="First Name"
                  id="firstName"
                  autoComplete="given-name"
                  aria-label="First Name"
                  required
                />
                <label htmlFor="firstName" className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-cyan-400 peer-focus:text-sm">
                  First Name
                </label>
                <User className="absolute right-0 top-3 text-cyan-400/50" size={18} aria-hidden="true" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-0 border-b-2 border-gray-600 py-3 text-cyan-400 placeholder-transparent focus:outline-none focus:border-cyan-400 transition-all duration-500 peer"
                  placeholder="Last Name"
                  id="lastName"
                  autoComplete="family-name"
                  aria-label="Last Name"
                  required
                />
                <label htmlFor="lastName" className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-cyan-400 peer-focus:text-sm">
                  Last Name
                </label>
                <User className="absolute right-0 top-3 text-cyan-400/50" size={18} aria-hidden="true" />
              </div>
            </div>

            <div className="relative mb-5">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-transparent border-0 border-b-2 border-gray-600 py-3 text-cyan-400 placeholder-transparent focus:outline-none focus:border-cyan-400 transition-all duration-500 peer"
                placeholder="Email Address"
                id="email"
                autoComplete="email"
                aria-label="Email Address"
                required
              />
              <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-cyan-400 peer-focus:text-sm">
                Email Address
              </label>
              <Mail className="absolute right-0 top-3 text-cyan-400/50" size={18} aria-hidden="true" />
            </div>

            <div className="relative mb-5">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-transparent border-0 border-b-2 border-gray-600 py-3 text-cyan-400 placeholder-transparent focus:outline-none focus:border-cyan-400 transition-all duration-500 peer"
                placeholder="Phone Number"
                id="phone"
                autoComplete="tel"
                aria-label="Phone Number"
                required
              />
              <label htmlFor="phone" className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-cyan-400 peer-focus:text-sm">
                Phone Number
              </label>
              <Phone className="absolute right-0 top-3 text-cyan-400/50" size={18} aria-hidden="true" />
            </div>

            <div className="relative mb-5">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-transparent border-0 border-b-2 border-gray-600 py-3 text-cyan-400 placeholder-transparent focus:outline-none focus:border-cyan-400 transition-all duration-500 peer"
                placeholder="Password"
                id="password"
                autoComplete="new-password"
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
              {formData.password && (
                <div className="absolute -bottom-5 left-0 right-0 flex items-center space-x-2">
                  <div className="flex-1 bg-white/10 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{getPasswordStrengthText()}</span>
                </div>
              )}
            </div>

            <div className="relative mb-5">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full bg-transparent border-0 border-b-2 border-gray-600 py-3 text-cyan-400 placeholder-transparent focus:outline-none focus:border-cyan-400 transition-all duration-500 peer"
                placeholder="Confirm Password"
                id="confirmPassword"
                autoComplete="new-password"
                aria-label="Confirm Password"
                required
              />
              <label htmlFor="confirmPassword" className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-cyan-400 peer-focus:text-sm">
                Confirm Password
              </label>
              <div className="absolute right-0 top-3 flex gap-2">
                <Lock className="text-cyan-400/50" size={18} aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-all duration-300 ${agreeToTerms ? 'border-cyan-400 bg-cyan-400' : 'border-gray-500'}`}>
                    {agreeToTerms && (
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors">
                  I agree to{' '}
                  <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 underline-offset-4 hover:underline">
                    Terms
                  </Link>{' '}
                  &{' '}
                  <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline-offset-4 hover:underline">
                    Privacy
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-label="Create your account"
              className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 text-black font-bold py-3 px-6 rounded-2xl transition-all duration-[800ms] ease-out flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] group"
            >
              <span>Create Account</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}