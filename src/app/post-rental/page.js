'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PostRental() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...imageUrls]);
  };

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-white">Create Post</h1>
          <button className="bg-cyan-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-cyan-500">
            Post
          </button>
        </div>

        {/* Instagram-style Post Preview */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 mb-6">
          {/* User Info */}
          <div className="flex items-center p-4 border-b border-gray-800">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full flex items-center justify-center">
              <span className="text-black font-bold">U</span>
            </div>
            <div className="ml-3">
              <p className="text-white font-semibold">Your Name</p>
              <p className="text-gray-400 text-sm">📍 Kunnamkulam, Kerala</p>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative aspect-square bg-gray-800">
            {images.length > 0 ? (
              <>
                <Image
                  src={images[currentImage]}
                  alt="Rental item"
                  fill
                  className="object-cover"
                />
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImage ? 'bg-white' : 'bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📷</span>
                  </div>
                  <p className="text-gray-400">Add photos</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex space-x-4">
              <button className="text-2xl">❤️</button>
              <button className="text-2xl">💬</button>
              <button className="text-2xl">🔗</button>
            </div>
            <div className="flex space-x-4">
              <button className="text-2xl">📞</button>
              <button className="text-2xl">🛒</button>
            </div>
          </div>

          {/* Caption Preview */}
          <div className="p-4">
            <p className="text-white font-semibold mb-2">Item Name</p>
            <p className="text-gray-300 mb-3">Description of your rental item...</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-cyan-400 font-semibold">₹500/day</span>
              <span className="text-green-400">📅 Available</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-white font-semibold mb-2">Photos</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-400 file:text-black file:font-semibold"
            />
          </div>

          {/* Item Details */}
          <div>
            <label className="block text-white font-semibold mb-2">Item Name</label>
            <input
              type="text"
              placeholder="e.g., Canon DSLR Camera"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Description</label>
            <textarea
              rows="4"
              placeholder="Describe your item, condition, included accessories..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-white font-semibold mb-2">Daily Rate</label>
              <input
                type="number"
                placeholder="₹500"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Weekly Rate</label>
              <input
                type="number"
                placeholder="₹3000"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Monthly Rate</label>
              <input
                type="number"
                placeholder="₹10000"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-white font-semibold mb-2">Location</label>
            <input
              type="text"
              placeholder="Kunnamkulam, Kerala"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-white font-semibold mb-2">Category</label>
            <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400">
              <option>Electronics</option>
              <option>Vehicles</option>
              <option>Tools</option>
              <option>Sports</option>
              <option>Home & Garden</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}