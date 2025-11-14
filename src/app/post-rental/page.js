'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PostRental() {
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [location, setLocation] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [pricePerWeek, setPricePerWeek] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState('');
  const [deposit, setDeposit] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState(false);
  const [inAppChat, setInAppChat] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [postTheme, setPostTheme] = useState('minimal');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [condition, setCondition] = useState('');
  const [customCondition, setCustomCondition] = useState('');

  const categories = ['Clothes', 'Electronics', 'Tools', 'Vehicles', 'Furniture', 'Party Props'];
  const availabilityOptions = ['Available Now', 'Booked till Thursday', 'Only weekends'];
  const savedLocations = ['Home', 'Office', 'Store'];
  
  const templates = {
    fashion: { category: 'Clothes', caption: 'Stylish outfit perfect for special occasions! 👗✨ Great condition, designer brand.', priceRange: '200-500' },
    gadget: { category: 'Electronics', caption: 'Latest tech gadget in perfect working condition! 📱⚡ Includes all accessories.', priceRange: '500-2000' },
    decor: { category: 'Furniture', caption: 'Beautiful home decor piece to elevate your space! 🏠💫 Clean and well-maintained.', priceRange: '300-1000' },
    tools: { category: 'Tools', caption: 'Professional grade tool for your projects! 🔧💪 Reliable and efficient.', priceRange: '100-800' }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImageUrls = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImageUrls].slice(0, 10));
  };

  const addSuggestion = (type) => {
    switch(type) {
      case 'condition':
        setCaption(prev => prev + ' #NewCondition');
        break;
      case 'price':
        setCaption(prev => prev + ' #GreatPrice');
        break;
      case 'location':
        setCaption(prev => prev + ' #LocalPickup');
        break;
    }
  };

  const applyTemplate = (templateKey) => {
    const template = templates[templateKey];
    setSelectedCategory(template.category);
    setCaption(template.caption);
    setSelectedTemplate(templateKey);
  };

  return (
    <div className="min-h-screen bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-lg max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
          <h1 className="text-lg font-semibold text-white">New Rental Post</h1>
          <Link href="/" className="text-gray-400 hover:text-white text-xl">✕</Link>
        </div>

        <div className="p-4 space-y-6">
          {/* Photo Upload - IG Style */}
          <div className="grid grid-cols-5 gap-2">
            {images.map((img, index) => (
              <div key={index} className="aspect-square relative group">
                <Image 
                  src={img} 
                  alt={`Photo ${index + 1}`} 
                  fill 
                  className="object-cover rounded-lg"
                  style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`
                  }}
                />
                <button
                  onClick={() => setEditingImage(index)}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg"
                >
                  <span className="text-white text-lg">✏️</span>
                </button>
              </div>
            ))}
            {images.length < 10 && (
              <label className="aspect-square bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-cyan-400 transition-colors">
                <span className="text-gray-400 text-xl">+</span>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}
          </div>

          {/* Quick Templates */}
          <div>
            <p className="text-white text-sm font-medium mb-2">Quick Templates</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(templates).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => applyTemplate(key)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedTemplate === key 
                      ? 'border-cyan-400 bg-cyan-400/10' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <p className="text-white text-sm font-medium capitalize">{key} Rental</p>
                  <p className="text-gray-400 text-xs">{template.category}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Caption Area - IG Style */}
          <div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Describe your item 🔥 Condition, brand, why someone should rent it…"
              rows="4"
              className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
            />
            
            {/* Auto-Suggestions */}
            <div className="flex flex-wrap gap-2 mt-2">
              <button onClick={() => addSuggestion('condition')} className="px-3 py-1 bg-gray-700 text-cyan-400 rounded-full text-xs hover:bg-gray-600 transition-colors">
                Add Condition
              </button>
              <button onClick={() => addSuggestion('price')} className="px-3 py-1 bg-gray-700 text-cyan-400 rounded-full text-xs hover:bg-gray-600 transition-colors">
                Add Price
              </button>
              <button onClick={() => addSuggestion('location')} className="px-3 py-1 bg-gray-700 text-cyan-400 rounded-full text-xs hover:bg-gray-600 transition-colors">
                Add Location
              </button>
            </div>
          </div>

          {/* Tag Categories */}
          <div>
            <p className="text-white text-sm font-medium mb-2">Tag Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    selectedCategory === cat
                      ? 'bg-cyan-400 text-black'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Availability */}
          <div>
            <p className="text-white text-sm font-medium mb-2">Tag Availability</p>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedAvailability(option)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    selectedAvailability === option
                      ? 'bg-green-400 text-black'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Location Picker */}
          <div>
            <p className="text-white text-sm font-medium mb-2">📍 Add Location</p>
            <div className="space-y-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search location..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <div className="flex flex-wrap gap-2">
                {savedLocations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs hover:bg-gray-600 transition-colors"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Panel */}
          <div className="bg-gray-800/50 rounded-xl p-4 space-y-4">
            <p className="text-white text-sm font-medium">💰 Pricing</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-gray-400 text-xs mb-1">Per Day</label>
                <input
                  type="number"
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(e.target.value)}
                  placeholder="₹500"
                  className="w-full px-2 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-1">Per Week</label>
                <input
                  type="number"
                  value={pricePerWeek}
                  onChange={(e) => setPricePerWeek(e.target.value)}
                  placeholder="₹3000"
                  className="w-full px-2 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-1">Per Month</label>
                <input
                  type="number"
                  value={pricePerMonth}
                  onChange={(e) => setPricePerMonth(e.target.value)}
                  placeholder="₹10000"
                  className="w-full px-2 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Deposit (Optional)</label>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="₹1000"
                className="w-full px-2 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-800/50 rounded-xl p-4 space-y-3">
            <p className="text-white text-sm font-medium">☎️ Contact Info</p>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.checked)}
                  className="w-4 h-4 text-green-400 bg-gray-700 border-gray-600 rounded focus:ring-green-400"
                />
                <span className="text-gray-300 text-sm">WhatsApp</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inAppChat}
                  onChange={(e) => setInAppChat(e.target.checked)}
                  className="w-4 h-4 text-cyan-400 bg-gray-700 border-gray-600 rounded focus:ring-cyan-400"
                />
                <span className="text-gray-300 text-sm">In-app chat</span>
              </label>
            </div>
          </div>

          {/* Post Style Themes */}
          <div>
            <p className="text-white text-sm font-medium mb-2">✨ Post Style</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { key: 'minimal', name: 'Minimal', bg: 'bg-white/10' },
                { key: 'retro', name: 'Retro', bg: 'bg-orange-400/20' },
                { key: 'neon', name: 'Neon', bg: 'bg-pink-400/20' },
                { key: 'pro', name: 'Pro', bg: 'bg-blue-400/20' }
              ].map((theme) => (
                <button
                  key={theme.key}
                  onClick={() => setPostTheme(theme.key)}
                  className={`p-2 rounded-lg text-xs transition-colors ${
                    postTheme === theme.key
                      ? 'border-2 border-cyan-400 ' + theme.bg
                      : 'border border-gray-600 hover:border-gray-500 ' + theme.bg
                  }`}
                >
                  <span className="text-white">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 p-4 space-y-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {showPreview ? 'Hide Preview' : 'Preview Post'}
          </button>
          <button className="w-full py-3 bg-gradient-to-r from-cyan-400 to-green-400 text-white font-semibold rounded-xl hover:from-cyan-500 hover:to-green-500 transition-colors">
            Share to Marketplace 🚀
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-sm max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Post Preview</h2>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>
            
            <div className="p-4">
              {/* Preview Content */}
              <div className={`rounded-xl overflow-hidden ${
                postTheme === 'minimal' ? 'bg-white/5' :
                postTheme === 'retro' ? 'bg-orange-400/10' :
                postTheme === 'neon' ? 'bg-gradient-to-br from-pink-400/20 to-purple-400/20' :
                'bg-blue-400/10'
              }`}>
                {/* User Info */}
                <div className="flex items-center p-3 border-b border-gray-700/50">
                  <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-black text-sm font-bold">U</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-white text-sm font-medium">username</p>
                    <p className="text-gray-400 text-xs">{location || 'Location'}</p>
                  </div>
                </div>
                
                {/* Images */}
                {images.length > 0 && (
                  <div className="aspect-square relative bg-gray-800">
                    <Image src={images[0]} alt="Preview" fill className="object-cover" />
                    {selectedCategory && (
                      <div className="absolute top-2 left-2 bg-cyan-400 text-black px-2 py-1 rounded text-xs font-semibold">
                        {selectedCategory}
                      </div>
                    )}
                    {selectedAvailability && (
                      <div className="absolute top-2 right-2 bg-green-400 text-black px-2 py-1 rounded text-xs font-semibold">
                        {selectedAvailability}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex items-center justify-between p-3">
                  <div className="flex space-x-4">
                    <span className="text-xl">❤️</span>
                    <span className="text-xl">💬</span>
                    <span className="text-xl">📤</span>
                  </div>
                  <span className="text-xl">🔖</span>
                </div>
                
                {/* Caption */}
                <div className="px-3 pb-3">
                  <p className="text-white text-sm">
                    <span className="font-semibold">username</span> {caption}
                  </p>
                  {pricePerDay && (
                    <div className="mt-2 flex space-x-2">
                      <span className="bg-pink-400 text-black px-2 py-1 rounded text-xs font-semibold">
                        ₹{pricePerDay}/day
                      </span>
                      {pricePerWeek && (
                        <span className="bg-pink-400 text-black px-2 py-1 rounded text-xs font-semibold">
                          ₹{pricePerWeek}/week
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Editor Modal */}
      {editingImage !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-sm">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Edit Photo</h2>
              <button
                onClick={() => setEditingImage(null)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Preview */}
              <div className="aspect-square relative bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src={images[editingImage]}
                  alt="Editing"
                  fill
                  className="object-cover"
                  style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`
                  }}
                />
                {condition && (
                  <div className="absolute top-2 right-2 bg-cyan-400 text-black px-2 py-1 rounded text-xs font-semibold">
                    {condition}
                  </div>
                )}
              </div>

              {/* Brightness */}
              <div>
                <label className="block text-white text-sm mb-2">Brightness</label>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={brightness}
                  onChange={(e) => setBrightness(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Contrast */}
              <div>
                <label className="block text-white text-sm mb-2">Contrast</label>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={contrast}
                  onChange={(e) => setContrast(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Condition Stickers */}
              <div>
                <label className="block text-white text-sm mb-2">Condition</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['New', 'Like New', 'Used'].map((cond) => (
                    <button
                      key={cond}
                      onClick={() => setCondition(condition === cond ? '' : cond)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        condition === cond
                          ? 'bg-cyan-400 text-black'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={customCondition}
                    onChange={(e) => setCustomCondition(e.target.value)}
                    placeholder="Custom condition..."
                    className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                  <button
                    onClick={() => {
                      if (customCondition.trim()) {
                        setCondition(customCondition.trim());
                        setCustomCondition('');
                      }
                    }}
                    className="px-3 py-1 bg-cyan-400 text-black rounded text-xs font-semibold hover:bg-cyan-500 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setBrightness(100);
                    setContrast(100);
                    setCondition('');
                  }}
                  className="flex-1 py-2 text-center text-gray-400 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setEditingImage(null)}
                  className="flex-1 py-2 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-500 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}