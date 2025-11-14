'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Smartphone, Palette, Settings, Upload, Edit3, Crop, RotateCw, ZoomIn, ZoomOut, Heart, MessageCircle, Send, Bookmark, X, Minus, Plus } from 'lucide-react';

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
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [editingImage, setEditingImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [customCategory, setCustomCategory] = useState('');
  const [cropMode, setCropMode] = useState(false);
  const [cropPosition, setCropPosition] = useState({ x: 50, y: 50, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [aspectRatio, setAspectRatio] = useState('free');
  const [activeSection, setActiveSection] = useState('media');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userTags, setUserTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

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
      case 'hashtag':
        setCaption(prev => prev + ' #trending');
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

  const applyCrop = () => {
    if (editingImage === null) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new window.Image();
    
    img.onload = () => {
      const scaleX = img.width / 400;
      const scaleY = img.height / 400;
      
      canvas.width = cropPosition.width * scaleX;
      canvas.height = cropPosition.height * scaleY;
      
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom / 100, zoom / 100);
      
      ctx.drawImage(
        img,
        cropPosition.x * scaleX - canvas.width / 2,
        cropPosition.y * scaleY - canvas.height / 2,
        cropPosition.width * scaleX,
        cropPosition.height * scaleY,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );
      
      ctx.restore();
      
      const croppedImageUrl = canvas.toDataURL();
      setImages(prev => prev.map((image, index) => 
        index === editingImage ? croppedImageUrl : image
      ));
      setEditingImage(null);
    };
    
    img.src = images[editingImage];
  };

  const setAspectRatioConstraint = (ratio) => {
    setAspectRatio(ratio);
    if (ratio !== 'free') {
      const ratios = { '1:1': 1, '4:5': 0.8, '16:9': 1.78 };
      const targetRatio = ratios[ratio];
      const currentWidth = cropPosition.width;
      const newHeight = currentWidth / targetRatio;
      setCropPosition(prev => ({ ...prev, height: newHeight }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Sidebar */}
      <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-4">
        <Link href="/" className="w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center text-black font-bold">
          Q
        </Link>
        <button
          onClick={() => setActiveSection('media')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
            activeSection === 'media' ? 'bg-cyan-400 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          <Smartphone size={20} />
        </button>
        <button
          onClick={() => setActiveSection('design')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
            activeSection === 'design' ? 'bg-cyan-400 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          <Palette size={20} />
        </button>
        <button
          onClick={() => setActiveSection('settings')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
            activeSection === 'settings' ? 'bg-cyan-400 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Form */}
        <div className="w-80 bg-gray-900 border-r border-gray-700 overflow-y-auto">
          <div className="p-4 border-b border-gray-700">
            <h1 className="text-lg font-semibold text-white">NEW RENTAL POST</h1>
          </div>

          <div className="p-4 space-y-6">
            {/* MEDIA SECTION */}
            {activeSection === 'media' && (
              <>
                {/* QUICK START */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">QUICK START</h3>
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
                        <p className="text-white text-sm font-medium capitalize">{key}</p>
                        <p className="text-gray-400 text-xs">{template.category}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* MEDIA UPLOAD */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">MEDIA</h3>
                  <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-cyan-400 transition-colors">
                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-white font-medium mb-1">Upload Images</p>
                    <p className="text-gray-400 text-sm mb-4">Drag & drop or click to browse</p>
                    <label className="inline-block px-4 py-2 bg-cyan-400 text-black rounded-lg cursor-pointer hover:bg-cyan-500 transition-colors">
                      Choose Files
                      <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                  {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {images.map((img, index) => (
                        <div key={index} className="aspect-square relative group">
                          <Image src={img} alt={`Photo ${index + 1}`} fill className="object-cover rounded-lg" />
                          <button
                            onClick={() => setEditingImage(index)}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg"
                          >
                            <Edit3 className="text-white" size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* DESCRIPTION */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">DESCRIPTION</h3>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Describe your item, condition, and why someone should rent it..."
                    rows="4"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => addSuggestion('hashtag')} className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600">
                      + Hashtag
                    </button>
                    <button onClick={() => addSuggestion('price')} className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600">
                      + Price
                    </button>
                    <button onClick={() => addSuggestion('location')} className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600">
                      + Location
                    </button>
                  </div>
                </div>

                {/* CATEGORY */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">CATEGORY</h3>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          selectedCategory === category
                            ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                            : 'border-gray-600 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Custom category..."
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && customCategory.trim()) {
                          setSelectedCategory(customCategory.trim());
                          setCustomCategory('');
                        }
                      }}
                      className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      onClick={() => {
                        if (customCategory.trim()) {
                          setSelectedCategory(customCategory.trim());
                          setCustomCategory('');
                        }
                      }}
                      className="px-3 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 transition-colors text-sm"
                    >
                      Add
                    </button>
                  </div>
                  {selectedCategory && !categories.includes(selectedCategory) && (
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-400/20 text-green-400 rounded text-xs">
                        Custom: {selectedCategory}
                        <button
                          onClick={() => setSelectedCategory('')}
                          className="text-green-400 hover:text-green-300"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    </div>
                  )}
                </div>

                {/* USER TAGS */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">TAGS</h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add tags (e.g. vintage, designer)..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && tagInput.trim()) {
                          setUserTags(prev => [...prev, tagInput.trim()]);
                          setTagInput('');
                        }
                      }}
                      className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      onClick={() => {
                        if (tagInput.trim()) {
                          setUserTags(prev => [...prev, tagInput.trim()]);
                          setTagInput('');
                        }
                      }}
                      className="px-3 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 transition-colors text-sm"
                    >
                      Add
                    </button>
                  </div>
                  {userTags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {userTags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-400/20 text-cyan-400 rounded text-xs"
                        >
                          #{tag}
                          <button
                            onClick={() => setUserTags(prev => prev.filter((_, i) => i !== index))}
                            className="text-cyan-400 hover:text-cyan-300"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* DESIGN SECTION */}
            {activeSection === 'design' && (
              <>
                {editingImage !== null ? (
                  <>
                    {/* BACK TO GALLERY */}
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() => setEditingImage(null)}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X size={16} />
                        Back to Gallery
                      </button>
                      <span className="text-gray-400 text-sm">Editing Image {editingImage + 1}</span>
                    </div>

                    {/* IMAGE PREVIEW */}
                    <div className="mb-4">
                      <div className="relative w-full h-48 bg-gray-800 rounded-lg overflow-hidden">
                        <Image
                          src={images[editingImage]}
                          alt="Editing"
                          fill
                          className="object-contain"
                          style={{
                            filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                            transform: `rotate(${rotation}deg) scale(${zoom / 100})`
                          }}
                        />
                      </div>
                    </div>

                    {/* CROP CONTROLS */}
                    <div className="mb-4">
                      <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">CROP</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCropMode(!cropMode)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                            cropMode ? 'bg-cyan-400 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'
                          }`}
                        >
                          <Crop size={16} />
                          {cropMode ? 'Exit Crop' : 'Crop'}
                        </button>
                        <button
                          onClick={() => setRotation(prev => prev + 90)}
                          className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                        >
                          <RotateCw size={16} />
                        </button>
                      </div>
                    </div>

                    {/* ADJUSTMENTS */}
                    <div className="mb-4">
                      <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">ADJUSTMENTS</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Brightness: {brightness}%</label>
                          <input
                            type="range"
                            min="50"
                            max="150"
                            value={brightness}
                            onChange={(e) => setBrightness(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Contrast: {contrast}%</label>
                          <input
                            type="range"
                            min="50"
                            max="150"
                            value={contrast}
                            onChange={(e) => setContrast(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Zoom: {zoom}%</label>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setZoom(prev => Math.max(50, prev - 10))}
                              className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white"
                            >
                              <Minus size={16} />
                            </button>
                            <input
                              type="range"
                              min="50"
                              max="200"
                              value={zoom}
                              onChange={(e) => setZoom(e.target.value)}
                              className="flex-1"
                            />
                            <button
                              onClick={() => setZoom(prev => Math.min(200, prev + 10))}
                              className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* APPLY CHANGES */}
                    <div className="flex gap-2">
                      <button
                        onClick={applyCrop}
                        className="flex-1 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 transition-colors font-medium"
                      >
                        Apply Changes
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* IMAGE FILTERS */}
                    <div>
                      <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">FILTERS</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {['Original', 'Vintage', 'Bright', 'Warm', 'Cool', 'B&W'].map((filter) => (
                          <button
                            key={filter}
                            className="p-2 rounded-lg border text-center transition-colors border-gray-600 text-gray-300 hover:border-gray-500 text-xs"
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SELECT IMAGE TO EDIT */}
                    {images.length > 0 && (
                      <div>
                        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">EDIT IMAGES</h3>
                        <div className="grid grid-cols-4 gap-2">
                          {images.map((img, index) => (
                            <div key={index} className="aspect-square relative group">
                              <Image src={img} alt={`Photo ${index + 1}`} fill className="object-cover rounded-lg" />
                              <button
                                onClick={() => setEditingImage(index)}
                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg"
                              >
                                <Edit3 className="text-white" size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* SETTINGS SECTION */}
            {activeSection === 'settings' && (
              <>
                {/* AVAILABILITY */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">AVAILABILITY</h3>
                  <div className="space-y-2">
                    {availabilityOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedAvailability(option)}
                        className={`w-full p-3 rounded-lg border text-left transition-colors ${
                          selectedAvailability === option
                            ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                            : 'border-gray-600 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* LOCATION */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">LOCATION</h3>
                  <input
                    type="text"
                    placeholder="Enter pickup location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 mb-2"
                  />
                  <div className="flex gap-2">
                    {savedLocations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setLocation(loc)}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PRICING */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">PRICING</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Per Day</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={pricePerDay}
                        onChange={(e) => setPricePerDay(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Per Week</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={pricePerWeek}
                        onChange={(e) => setPricePerWeek(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Per Month</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={pricePerMonth}
                        onChange={(e) => setPricePerMonth(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Deposit</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>

                {/* CONTACT */}
                <div>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">CONTACT</h3>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 mb-3"
                  />
                  <div className="space-y-2">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.checked)}
                        className="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400"
                      />
                      <span className="text-gray-300">WhatsApp available</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={inAppChat}
                        onChange={(e) => setInAppChat(e.target.checked)}
                        className="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400"
                      />
                      <span className="text-gray-300">In-app chat</span>
                    </label>
                  </div>
                </div>

                {/* PUBLISH */}
                <div className="pt-4 border-t border-gray-700">
                  <button className="w-full py-3 bg-cyan-400 text-black font-medium rounded-lg hover:bg-cyan-500 transition-colors">
                    Publish Rental Post
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <div className="w-80 max-w-sm">
            {/* Mobile Preview Frame */}
            <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl">
              <div className="bg-black rounded-2xl overflow-hidden">
                {/* Status Bar */}
                <div className="bg-black px-4 py-2 flex justify-between items-center">
                  <span className="text-white text-sm font-medium">9:41</span>
                  <div className="flex space-x-1">
                    <div className="w-4 h-2 bg-white rounded-sm"></div>
                    <div className="w-6 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="bg-gray-900">
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
                  {images.length > 0 ? (
                    <div className="aspect-[4/3] relative bg-gray-800">
                      <Image src={images[currentImageIndex]} alt="Preview" fill className="object-cover" />
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
                      {/* Image Navigation Dots */}
                      {images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                        <p className="text-gray-400 text-sm">Upload an image to preview</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between p-3">
                    <div className="flex space-x-4">
                      <Heart className="text-white" size={20} />
                      <MessageCircle className="text-white" size={20} />
                      <Send className="text-white" size={20} />
                    </div>
                    <Bookmark className="text-white" size={20} />
                  </div>
                  
                  {/* Caption */}
                  <div className="px-3 pb-3">
                    <p className="text-white text-sm">
                      <span className="font-semibold">username</span> {caption || 'Add a description to see it here...'}
                    </p>
                    {pricePerDay && (
                      <div className="mt-2">
                        <span className="bg-pink-400 text-black px-2 py-1 rounded text-xs font-semibold">
                          ₹{pricePerDay}/day
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Crop Tool Modal */}
      {editingImage !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-3xl border border-gray-700/50 w-full max-w-2xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <h2 className="text-xl font-semibold text-white">Crop Image</h2>
              <button
                onClick={() => setEditingImage(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Main Crop Area */}
              <div className="relative bg-gray-800 rounded-2xl overflow-hidden mb-6" style={{ height: '400px' }}>
                <Image
                  src={images[editingImage]}
                  alt="Crop preview"
                  fill
                  className="object-contain"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`
                  }}
                />
                
                {/* Draggable Crop Box */}
                <div 
                  className="absolute border-2 border-cyan-400 bg-transparent z-20 cursor-move"
                  style={{
                    left: `${cropPosition.x}px`,
                    top: `${cropPosition.y}px`,
                    width: `${cropPosition.width}px`,
                    height: `${cropPosition.height}px`,
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white cursor-nw-resize"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white cursor-ne-resize"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white cursor-sw-resize"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white cursor-se-resize"></div>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                {/* Aspect Ratio Presets */}
                <div>
                  <label className="block text-white text-sm font-medium mb-3">Aspect Ratio</label>
                  <div className="flex space-x-2">
                    {[
                      { key: 'free', label: 'Free' },
                      { key: '1:1', label: '1:1' },
                      { key: '4:5', label: '4:5' },
                      { key: '16:9', label: '16:9' }
                    ].map((ratio) => (
                      <button
                        key={ratio.key}
                        onClick={() => setAspectRatioConstraint(ratio.key)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          aspectRatio === ratio.key
                            ? 'bg-cyan-400 text-black'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {ratio.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Zoom and Rotate Controls */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-3">Zoom ({zoom}%)</label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setZoom(Math.max(50, zoom - 10))}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="range"
                        min="50"
                        max="200"
                        value={zoom}
                        onChange={(e) => setZoom(e.target.value)}
                        className="flex-1"
                      />
                      <button
                        onClick={() => setZoom(Math.min(200, zoom + 10))}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-3">Rotate ({rotation}°)</label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setRotation(rotation - 90)}
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors flex items-center gap-2"
                      >
                        <RotateCw size={16} className="transform scale-x-[-1]" />
                        90°
                      </button>
                      <button
                        onClick={() => setRotation(rotation + 90)}
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors flex items-center gap-2"
                      >
                        <RotateCw size={16} />
                        90°
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex space-x-4 p-6 border-t border-gray-700/50">
              <button
                onClick={() => setEditingImage(null)}
                className="flex-1 py-3 text-center text-gray-300 border border-gray-600 rounded-xl hover:bg-gray-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={applyCrop}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-400 to-green-400 text-white font-semibold rounded-xl hover:from-cyan-500 hover:to-green-500 transition-all shadow-lg"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}