'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, MapPin, Camera, User, Star } from 'lucide-react';

// Location Step Component with autocomplete
const LocationStep = ({ formData, setFormData }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const popularLocations = [
    'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
    'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
    'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
    'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
    'Boston, MA', 'El Paso, TX', 'Nashville, TN', 'Detroit, MI', 'Oklahoma City, OK',
    'Portland, OR', 'Las Vegas, NV', 'Memphis, TN', 'Louisville, KY', 'Baltimore, MD'
  ];

  const handleLocationChange = (value) => {
    setFormData({...formData, location: value});
    
    if (value.length > 1) {
      const filtered = popularLocations.filter(location => 
        location.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (location) => {
    setFormData({...formData, location});
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white text-center">Where are you located?</h2>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleLocationChange(e.target.value)}
          onFocus={() => formData.location.length > 1 && setShowSuggestions(true)}
          className="w-full pl-12 pr-4 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter your city or zip code"
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {suggestions.map((location, index) => (
              <button
                key={index}
                onClick={() => selectSuggestion(location)}
                className="w-full text-left px-4 py-3 hover:bg-gray-600 text-white border-b border-gray-600 last:border-b-0 flex items-center gap-2"
              >
                <MapPin size={16} className="text-gray-400" />
                {location}
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="text-gray-400 text-sm text-center">
        This helps us show you items available in your area
      </p>
    </div>
  );
};

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '',
    location: '',
    interests: [],
    profilePhoto: null
  });

  const steps = [
    { id: 1, title: 'Welcome', subtitle: 'Let\'s get you started' },
    { id: 2, title: 'User Type', subtitle: 'How do you plan to use QuickRent?' },
    { id: 3, title: 'Location', subtitle: 'Where are you located?' },
    { id: 4, title: 'Interests', subtitle: 'What items interest you?' },
    { id: 5, title: 'Profile', subtitle: 'Complete your profile' }
  ];

  const userTypes = [
    { id: 'renter', title: 'I want to rent items', desc: 'Looking for things to rent' },
    { id: 'owner', title: 'I want to rent out items', desc: 'Have items to share' },
    { id: 'both', title: 'Both', desc: 'Rent and rent out items' }
  ];

  const categories = [
    'Electronics', 'Tools', 'Vehicles', 'Furniture', 'Clothes', 'Sports', 'Party Supplies', 'Cameras'
  ];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleComplete = async () => {
    try {
      const response = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Onboarding failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => (
              <div key={step.id} className={`flex items-center ${step.id < steps.length ? 'flex-1' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id ? 'bg-cyan-400 text-black' : 'bg-gray-700 text-gray-400'
                }`}>
                  {currentStep > step.id ? <Check size={16} /> : step.id}
                </div>
                {step.id < steps.length && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-cyan-400' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">{steps[currentStep - 1].title}</h1>
            <p className="text-gray-400">{steps[currentStep - 1].subtitle}</p>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-3xl mx-auto">
                Q
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Welcome to QuickRent!</h2>
                <p className="text-gray-300 text-lg">
                  Let's set up your account in just a few steps. This will help us personalize your experience.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="text-cyan-400 text-2xl font-bold">5K+</div>
                  <div className="text-gray-300 text-sm">Items Available</div>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="text-cyan-400 text-2xl font-bold">2K+</div>
                  <div className="text-gray-300 text-sm">Active Users</div>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="text-cyan-400 text-2xl font-bold">500+</div>
                  <div className="text-gray-300 text-sm">Rental Shops</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: User Type */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">How do you plan to use QuickRent?</h2>
              <div className="space-y-4">
                {userTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFormData({...formData, userType: type.id})}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                      formData.userType === type.id 
                        ? 'border-cyan-400 bg-cyan-400/10' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-white font-semibold">{type.title}</div>
                    <div className="text-gray-400 text-sm">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {currentStep === 3 && (
            <LocationStep formData={formData} setFormData={setFormData} />
          )}

          {/* Step 4: Interests */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">What items interest you?</h2>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      const interests = formData.interests.includes(category)
                        ? formData.interests.filter(i => i !== category)
                        : [...formData.interests, category];
                      setFormData({...formData, interests});
                    }}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      formData.interests.includes(category)
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                        : 'border-gray-600 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm text-center">
                Select all that apply (you can change this later)
              </p>
            </div>
          )}

          {/* Step 5: Profile */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">Complete your profile</h2>
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                  {formData.profilePhoto ? (
                    <img src={formData.profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                  ) : (
                    <User size={32} className="text-gray-400" />
                  )}
                </div>
                <button className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mx-auto">
                  <Camera size={16} />
                  <span>Add Profile Photo</span>
                </button>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">You're all set! 🎉</h3>
                <p className="text-gray-300 text-sm">
                  Your account is ready. You can now start browsing items or list your first rental.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentStep === 1 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 2 && !formData.userType) ||
                  (currentStep === 3 && !formData.location)
                }
                className="flex items-center space-x-2 bg-cyan-400 text-black px-6 py-2 rounded-lg hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex items-center space-x-2 bg-cyan-400 text-black px-6 py-2 rounded-lg hover:bg-cyan-300"
              >
                <span>Complete Setup</span>
                <Check size={16} />
              </button>
            )}
          </div>

          {/* Skip Option */}
          <div className="text-center mt-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-gray-300 text-sm">
              Skip for now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}