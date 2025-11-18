import { Building2, Award, Users, Heart, MapPin, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          About Oman Grand Hotel
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience luxury and comfort in the heart of Muscat, where traditional Omani hospitality meets modern elegance
        </p>
      </div>

      {/* Image Banner */}
      <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
        <img
          src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
          alt="Hotel Exterior"
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Our Story */}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="w-8 h-8 text-emerald-600" />
          <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
        </div>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Welcome to Oman Grand Hotel, a premier destination for travelers seeking the perfect blend of luxury, 
            comfort, and authentic Omani hospitality. Established in 2010, we have been proudly serving guests from 
            around the world, offering them an unforgettable experience in the beautiful capital city of Muscat.
          </p>
          <p>
            Our hotel stands as a beacon of excellence in the hospitality industry, combining traditional Arabian 
            architecture with modern amenities. Every corner of our establishment reflects our commitment to providing 
            guests with an experience that goes beyond mere accommodation.
          </p>
          <p>
            Located in the heart of Muscat, we offer convenient access to the city's most famous landmarks, bustling 
            souqs, pristine beaches, and cultural attractions. Whether you're here for business or pleasure, 
            Oman Grand Hotel is your home away from home.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-emerald-600 mb-2">15+</div>
          <p className="text-gray-600 font-medium">Years of Excellence</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-emerald-600 mb-2">100+</div>
          <p className="text-gray-600 font-medium">Luxury Rooms</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-emerald-600 mb-2">50K+</div>
          <p className="text-gray-600 font-medium">Happy Guests</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
          <p className="text-gray-600 font-medium">Guest Service</p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <MapPin className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Prime Location</h3>
            <p className="text-gray-600">
              Located in the heart of Muscat with easy access to major attractions, shopping centers, and business districts.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <Award className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Award Winning</h3>
            <p className="text-gray-600">
              Recognized for excellence in hospitality with multiple awards for service quality and guest satisfaction.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <Users className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Staff</h3>
            <p className="text-gray-600">
              Our multilingual team is trained to provide personalized service ensuring every need is met with care.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Authentic Hospitality</h3>
            <p className="text-gray-600">
              Experience genuine Omani warmth and hospitality that makes every guest feel truly welcome and valued.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <Building2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Luxury Rooms</h3>
            <p className="text-gray-600">
              Spacious, elegantly designed rooms with premium amenities and stunning views of the city or sea.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <Clock className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Service</h3>
            <p className="text-gray-600">
              Round-the-clock concierge, room service, and support staff ready to assist you at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="leading-relaxed">
            To provide exceptional hospitality experiences that exceed guest expectations through personalized service, 
            luxurious accommodations, and a commitment to Omani cultural heritage. We strive to create memorable moments 
            that inspire guests to return and recommend us to others.
          </p>
        </div>

        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
          <p className="leading-relaxed">
            To be recognized as the leading luxury hotel in Muscat, setting the standard for excellence in hospitality 
            while showcasing the best of Omani culture and warmth. We envision becoming the preferred choice for 
            discerning travelers seeking authentic experiences.
          </p>
        </div>
      </div>
    </div>
  );
}
