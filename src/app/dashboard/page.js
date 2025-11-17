'use client';
import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Home, DollarSign, Calendar, Bell, Search, Menu, X, Users, Eye, Heart, MessageSquare, Clock, MapPin, Star, ArrowUpRight, ArrowDownRight, Filter, Download, AlertCircle, CheckCircle } from 'lucide-react';

// Login Prompt Component
const LoginPrompt = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
    <div className="max-w-md w-full bg-gray-800 rounded-2xl border border-gray-700 p-8 text-center">
      <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8 text-cyan-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">Authentication Required</h2>
      <p className="text-gray-400 mb-6">
        Please log in to access your QuickRent dashboard.
      </p>
      <div className="space-y-3">
        <button 
          onClick={() => window.location.href = '/login'}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
        >
          Log In
        </button>
        <button 
          onClick={() => window.location.href = '/register'}
          className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
        >
          Create Account
        </button>
      </div>
    </div>
  </div>
);

// Onboarding Required Component
const OnboardingRequired = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
    <div className="max-w-2xl w-full bg-gray-800 rounded-2xl border border-gray-700 p-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Home className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">Welcome to QuickRent!</h2>
        <p className="text-gray-400 text-lg">
          Complete your profile setup to start browsing and renting items
        </p>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={() => window.location.href = '/onboarding'}
          className="flex-1 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
        >
          Complete Setup Now
        </button>
        <button className="px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors">
          Later
        </button>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(null);
  const [userType, setUserType] = useState('renter');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState('30days');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch('/api/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setIsAuthenticated(true);
          setOnboardingComplete(userData.onboardingCompleted || false);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  if (!onboardingComplete) {
    return <OnboardingRequired />;
  }

  const ownerStats = {
    totalRevenue: 12450,
    revenueChange: 12.5,
    activeListings: 5,
    listingsChange: 1,
    totalViews: 2847,
    viewsChange: 23.8,
    bookingRate: 68,
    bookingRateChange: 5.2
  };

  const renterStats = {
    savedSearches: 12,
    favoriteProperties: 8,
    viewedProperties: 45,
    scheduledViewings: 3
  };

  const ownerProperties = [
    { id: 1, name: 'Sunset Villa', location: 'Miami Beach, FL', price: 2500, status: 'rented', views: 432, inquiries: 28, rating: 4.8 },
    { id: 2, name: 'Downtown Loft', location: 'New York, NY', price: 3200, status: 'available', views: 687, inquiries: 45, rating: 4.9 },
    { id: 3, name: 'Garden Apartment', location: 'Austin, TX', price: 1800, status: 'rented', views: 298, inquiries: 19, rating: 4.7 }
  ];

  const renterFavorites = [
    { id: 1, name: 'Modern Studio', location: 'Seattle, WA', price: 1900, image: '🏢', available: 'Dec 1', saved: true },
    { id: 2, name: 'Cozy 2BR', location: 'Portland, OR', price: 2200, image: '🏡', available: 'Now', saved: true }
  ];

  const recentActivity = userType === 'owner' 
    ? [
        { type: 'inquiry', property: 'Downtown Loft', user: 'Sarah M.', time: '2 hours ago', icon: MessageSquare },
        { type: 'viewing', property: 'Beach House', user: 'John D.', time: '5 hours ago', icon: Calendar }
      ]
    : [
        { type: 'saved', property: 'Modern Studio', action: 'Added to favorites', time: '3 hours ago', icon: Heart },
        { type: 'viewed', property: 'Luxury Condo', action: 'Property viewed', time: '1 day ago', icon: Eye }
      ];

  const monthlyData = [
    { month: 'Jun', revenue: 8200, views: 1850, bookings: 4 },
    { month: 'Jul', revenue: 9500, views: 2100, bookings: 5 },
    { month: 'Aug', revenue: 11200, views: 2450, bookings: 6 },
    { month: 'Sep', revenue: 10800, views: 2680, bookings: 5 },
    { month: 'Oct', revenue: 12450, views: 2847, bookings: 7 },
  ];

  const StatCard = ({ icon: Icon, label, value, change, prefix = '', suffix = '' }) => (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-cyan-500/10 rounded-lg">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold">
                Quick<span className="text-cyan-400">Rent</span>
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 bg-gray-700 rounded-lg px-4 py-2 w-64">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="bg-transparent border-none outline-none text-white w-full"
                />
              </div>

              {/* User Type Toggle */}
              <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setUserType('renter')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    userType === 'renter' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Renter
                </button>
                <button
                  onClick={() => setUserType('owner')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    userType === 'owner' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Owner
                </button>
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-700 rounded-lg">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center font-bold">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-800 border-r border-gray-700 transition-transform duration-300 mt-[73px] lg:mt-0`}>
          <nav className="p-4 space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-cyan-500/10 text-cyan-400 rounded-lg">
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
              <Home className="w-5 h-5" />
              {userType === 'owner' ? 'My Properties' : 'Browse Properties'}
            </a>
            {userType === 'owner' ? (
              <>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <DollarSign className="w-5 h-5" />
                  Finances
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <Users className="w-5 h-5" />
                  Tenants
                </a>
              </>
            ) : (
              <>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <Heart className="w-5 h-5" />
                  Favorites
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                  <Search className="w-5 h-5" />
                  Saved Searches
                </a>
              </>
            )}
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
              <Calendar className="w-5 h-5" />
              Schedule
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
              <MessageSquare className="w-5 h-5" />
              Messages
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header with filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {userType === 'owner' ? 'Owner Dashboard' : 'Renter Dashboard'}
              </h2>
              <p className="text-gray-400">
                {userType === 'owner' ? 'Track your properties performance' : 'Manage your rental search'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="year">This year</option>
              </select>
              <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 px-4 py-2 rounded-lg">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          {userType === 'owner' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={DollarSign}
                label="Total Revenue"
                value={ownerStats.totalRevenue}
                change={ownerStats.revenueChange}
                prefix="$"
              />
              <StatCard
                icon={Home}
                label="Active Listings"
                value={ownerStats.activeListings}
                change={ownerStats.listingsChange}
              />
              <StatCard
                icon={Eye}
                label="Total Views"
                value={ownerStats.totalViews}
                change={ownerStats.viewsChange}
              />
              <StatCard
                icon={TrendingUp}
                label="Booking Rate"
                value={ownerStats.bookingRate}
                change={ownerStats.bookingRateChange}
                suffix="%"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={Search}
                label="Saved Searches"
                value={renterStats.savedSearches}
              />
              <StatCard
                icon={Heart}
                label="Favorite Properties"
                value={renterStats.favoriteProperties}
              />
              <StatCard
                icon={Eye}
                label="Properties Viewed"
                value={renterStats.viewedProperties}
              />
              <StatCard
                icon={Calendar}
                label="Scheduled Viewings"
                value={renterStats.scheduledViewings}
              />
            </div>
          )}

          {/* Charts and Properties */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue/Activity Chart */}
            <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">
                  {userType === 'owner' ? 'Revenue Trend' : 'Activity Overview'}
                </h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-cyan-500 text-white rounded-lg text-sm">Revenue</button>
                  <button className="px-3 py-1 text-gray-400 hover:text-white rounded-lg text-sm">Views</button>
                  <button className="px-3 py-1 text-gray-400 hover:text-white rounded-lg text-sm">Bookings</button>
                </div>
              </div>
              
              {/* Simple bar chart visualization */}
              <div className="h-64 flex items-end justify-between gap-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-700 rounded-t-lg relative" style={{ height: `${(data.revenue / 15000) * 100}%` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-lg"></div>
                    </div>
                    <span className="text-xs text-gray-400">{data.month}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-700 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400">Average Monthly</div>
                  <div className="text-2xl font-bold">${(monthlyData.reduce((acc, d) => acc + d.revenue, 0) / monthlyData.length).toFixed(0)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Best Month</div>
                  <div className="text-2xl font-bold">October</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Growth Rate</div>
                  <div className="text-2xl font-bold text-green-400">+18%</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                      <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <Icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{activity.property}</div>
                        <div className="text-xs text-gray-400 truncate">
                          {userType === 'owner' ? activity.user : activity.action}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-4 py-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                View All Activity
              </button>
            </div>
          </div>

          {/* Properties/Favorites Table */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {userType === 'owner' ? 'My Properties' : 'Favorite Properties'}
              </h3>
              <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            <div className="overflow-x-auto">
              {userType === 'owner' ? (
                <table className="w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Property</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Views</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rating</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {ownerProperties.map((property) => (
                      <tr key={property.id} className="hover:bg-gray-700/30">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{property.name}</div>
                            <div className="text-sm text-gray-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {property.location}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium">${property.price}/mo</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            property.status === 'available' ? 'bg-green-500/10 text-green-400' :
                            property.status === 'rented' ? 'bg-blue-500/10 text-blue-400' :
                            'bg-yellow-500/10 text-yellow-400'
                          }`}>
                            {property.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300">{property.views}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span>{property.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                  {renterFavorites.map((property) => (
                    <div key={property.id} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-3xl">
                          {property.image}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{property.name}</h4>
                              <p className="text-sm text-gray-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {property.location}
                              </p>
                            </div>
                            <Heart className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">${property.price}/mo</span>
                            <span className="text-xs text-gray-400">Available {property.available}</span>
                          </div>
                          <button className="w-full mt-3 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-medium">
                            Schedule Viewing
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}