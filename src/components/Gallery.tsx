import { useState } from 'react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const images = [
    {
      url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      category: 'exterior',
      title: 'Hotel Exterior',
      description: 'Grand entrance and facade'
    },
    {
      url: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      category: 'rooms',
      title: 'Deluxe Room',
      description: 'Elegant and spacious accommodation'
    },
    {
      url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      category: 'rooms',
      title: 'Executive Suite',
      description: 'Luxury suite with city view'
    },
    {
      url: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      category: 'rooms',
      title: 'Family Room',
      description: 'Perfect for families'
    },
    {
      url: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
      category: 'rooms',
      title: 'Presidential Suite',
      description: 'Ultimate luxury experience'
    },
    {
      url: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
      category: 'dining',
      title: 'Fine Dining Restaurant',
      description: 'Exquisite culinary experience'
    },
    {
      url: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
      category: 'dining',
      title: 'Breakfast Buffet',
      description: 'International breakfast selection'
    },
    {
      url: 'https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg',
      category: 'dining',
      title: 'Café & Lounge',
      description: 'Casual dining and drinks'
    },
    {
      url: 'https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg',
      category: 'facilities',
      title: 'Swimming Pool',
      description: 'Outdoor pool with city views'
    },
    {
      url: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg',
      category: 'facilities',
      title: 'Fitness Center',
      description: 'State-of-the-art gym equipment'
    },
    {
      url: 'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg',
      category: 'facilities',
      title: 'Spa & Wellness',
      description: 'Relaxation and rejuvenation'
    },
    {
      url: 'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg',
      category: 'facilities',
      title: 'Conference Room',
      description: 'Modern meeting facilities'
    },
    {
      url: 'https://images.pexels.com/photos/269141/pexels-photo-269141.jpeg',
      category: 'exterior',
      title: 'Hotel Lobby',
      description: 'Elegant reception area'
    },
    {
      url: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg',
      category: 'dining',
      title: 'Bar & Lounge',
      description: 'Premium beverages and entertainment'
    },
    {
      url: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      category: 'facilities',
      title: 'Business Center',
      description: 'Professional workspace'
    },
    {
      url: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      category: 'rooms',
      title: 'Bathroom Suite',
      description: 'Luxurious bathroom amenities'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'rooms', label: 'Rooms & Suites' },
    { value: 'dining', label: 'Dining' },
    { value: 'facilities', label: 'Facilities' },
    { value: 'exterior', label: 'Exterior & Lobby' }
  ];

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Photo Gallery
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our beautiful hotel through stunning images of our rooms, facilities, and amenities
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
              activeCategory === cat.value
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Image Count */}
      <div className="text-center mb-8">
        <p className="text-gray-600 font-medium">
          Showing {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => setSelectedImage(image.url)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                <p className="text-sm text-gray-200">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 transition"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Experience It Yourself</h2>
        <p className="text-xl mb-6 opacity-90">
          Pictures don't do justice to the real experience. Book your stay today and create unforgettable memories.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Book Your Room Now
        </button>
      </div>
    </div>
  );
}
