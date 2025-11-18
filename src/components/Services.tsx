import { Wifi, Coffee, Utensils, Dumbbell, Car, Waves, Sparkles, Shield, Headphones, UtensilsCrossed, Wine, Briefcase } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Complimentary high-speed internet access throughout the hotel, perfect for business and leisure travelers.',
      category: 'connectivity'
    },
    {
      icon: Utensils,
      title: 'Fine Dining Restaurant',
      description: 'Experience world-class cuisine at our signature restaurant featuring international and authentic Omani dishes.',
      category: 'dining'
    },
    {
      icon: Coffee,
      title: 'Coffee Shop & Café',
      description: 'Enjoy freshly brewed coffee, pastries, and light meals in our cozy café open throughout the day.',
      category: 'dining'
    },
    {
      icon: UtensilsCrossed,
      title: '24/7 Room Service',
      description: 'Order from our extensive menu any time of day or night, delivered fresh to your room.',
      category: 'room'
    },
    {
      icon: Dumbbell,
      title: 'Fitness Center',
      description: 'State-of-the-art gym equipment and facilities for maintaining your fitness routine while traveling.',
      category: 'wellness'
    },
    {
      icon: Waves,
      title: 'Swimming Pool',
      description: 'Relax by our temperature-controlled outdoor pool with stunning city views and poolside service.',
      category: 'wellness'
    },
    {
      icon: Sparkles,
      title: 'Spa & Wellness',
      description: 'Rejuvenate with traditional Omani treatments, massages, and therapies at our luxury spa.',
      category: 'wellness'
    },
    {
      icon: Car,
      title: 'Valet Parking',
      description: 'Complimentary valet parking service for all guests with 24/7 secure parking facilities.',
      category: 'convenience'
    },
    {
      icon: Briefcase,
      title: 'Business Center',
      description: 'Fully equipped business center with meeting rooms, printing, and secretarial services.',
      category: 'business'
    },
    {
      icon: Headphones,
      title: 'Concierge Service',
      description: 'Our expert concierge team assists with tours, reservations, and any special requests you may have.',
      category: 'convenience'
    },
    {
      icon: Shield,
      title: '24/7 Security',
      description: 'Round-the-clock security personnel and CCTV surveillance ensuring your safety and peace of mind.',
      category: 'safety'
    },
    {
      icon: Wine,
      title: 'Lounge & Bar',
      description: 'Unwind in our sophisticated lounge with premium beverages and entertainment.',
      category: 'dining'
    }
  ];

  const roomAmenities = [
    'Air Conditioning',
    'Flat-screen TV',
    'Mini Bar',
    'Safe Deposit Box',
    'Private Bathroom',
    'Premium Bedding',
    'Work Desk',
    'Telephone',
    'Hair Dryer',
    'Iron & Ironing Board',
    'Complimentary Toiletries',
    'Bathrobe & Slippers',
    'Coffee/Tea Maker',
    'Daily Housekeeping',
    'Wake-up Service',
    'Blackout Curtains'
  ];

  const categories = [
    { name: 'All Services', value: 'all', color: 'emerald' },
    { name: 'Dining', value: 'dining', color: 'orange' },
    { name: 'Wellness', value: 'wellness', color: 'blue' },
    { name: 'Business', value: 'business', color: 'purple' },
    { name: 'Convenience', value: 'convenience', color: 'teal' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Services & Amenities
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the exceptional services and premium amenities designed to make your stay comfortable and memorable
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              cat.value === 'all'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Hotel Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 rounded-full mb-4">
                  <Icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Room Amenities */}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">In-Room Amenities</h2>
        <p className="text-gray-600 mb-6">
          Every room at Oman Grand Hotel is equipped with premium amenities to ensure your comfort:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {roomAmenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-700 bg-emerald-50 px-4 py-3 rounded-lg"
            >
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span className="text-sm font-medium">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
          <Utensils className="w-12 h-12 mb-4" />
          <h3 className="text-2xl font-bold mb-4">Dining Excellence</h3>
          <p className="leading-relaxed mb-4">
            Indulge in culinary masterpieces prepared by our award-winning chefs. From traditional Omani 
            delicacies to international cuisine, every meal is a gastronomic journey.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <span>Breakfast Buffet (6:00 AM - 10:30 AM)</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <span>À la Carte Dining</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <span>Special Dietary Menus Available</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
          <Waves className="w-12 h-12 mb-4" />
          <h3 className="text-2xl font-bold mb-4">Wellness & Recreation</h3>
          <p className="leading-relaxed mb-4">
            Maintain your wellness routine or discover new ways to relax and rejuvenate during your stay 
            with our comprehensive wellness facilities.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <span>Olympic-Size Swimming Pool</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <span>Fully Equipped Gym</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <span>Spa & Massage Treatments</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Need Something Special?</h3>
        <p className="text-blue-800">
          Our concierge team is available 24/7 to arrange special services, tours, transportation, 
          or any other requests to make your stay exceptional. Contact us anytime at +968 2123 4567.
        </p>
      </div>
    </div>
  );
}
