import { useState } from 'react';
import { User, Mail, Phone, CreditCard, MessageSquare, ArrowLeft } from 'lucide-react';
import { Room } from '../lib/supabase';
import { calculateTotalPrice, formatCurrency, isValidEmail, isValidPhone, calculateNights } from '../lib/utils';

type BookingFormProps = {
  room: Room;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  onSubmit: (bookingData: BookingData) => void;
  onBack: () => void;
};

export type BookingData = {
  customer_name: string;
  email: string;
  phone: string;
  cnic_passport: string;
  special_requests: string;
};

export default function BookingForm({
  room,
  checkIn,
  checkOut,
  adults,
  children,
  onSubmit,
  onBack
}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingData>({
    customer_name: '',
    email: '',
    phone: '',
    cnic_passport: '',
    special_requests: ''
  });
  const [error, setError] = useState('');

  const totalPrice = calculateTotalPrice(room.price, checkIn, checkOut);
  const nights = calculateNights(checkIn, checkOut);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.customer_name.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isValidPhone(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Room Selection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Complete Your Booking</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  placeholder="+968 XXXX XXXX"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  CNIC / Passport Number (Optional)
                </label>
                <input
                  type="text"
                  value={formData.cnic_passport}
                  onChange={(e) => setFormData({ ...formData, cnic_passport: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  placeholder="Enter your ID number"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  Special Requests (Optional)
                </label>
                <textarea
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"
                  rows={4}
                  placeholder="Any special requirements? Early check-in, extra pillows, etc."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-lg"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h3>

            <div className="mb-4">
              <img
                src={room.image_url}
                alt={room.room_type}
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-3 border-t pt-4">
              <div>
                <p className="text-sm text-gray-600">Room Type</p>
                <p className="font-semibold text-gray-800">{room.room_type}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Check-in</p>
                <p className="font-semibold text-gray-800">{new Date(checkIn).toLocaleDateString()}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Check-out</p>
                <p className="font-semibold text-gray-800">{new Date(checkOut).toLocaleDateString()}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Guests</p>
                <p className="font-semibold text-gray-800">
                  {adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}
                </p>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm text-gray-600">Price per night</p>
                <p className="font-semibold text-gray-800">{formatCurrency(room.price)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Number of nights</p>
                <p className="font-semibold text-gray-800">{nights} night{nights > 1 ? 's' : ''}</p>
              </div>

              <div className="border-t pt-3 bg-emerald-50 -mx-6 px-6 py-3 -mb-6 rounded-b-2xl">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalPrice)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
