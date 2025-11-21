import { useState, useEffect } from 'react';
import { Calendar, Mail, Phone, MapPin, CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import { db, Booking } from '../lib/localStorage';
import { formatCurrency, formatDate } from '../lib/utils';

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchId, setSearchId] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Pending' | 'Confirmed' | 'Cancelled'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    filterBookingsList();
  }, [bookings, searchEmail, searchId, filterStatus]);

  const loadBookings = async () => {
    try {
      const allBookings = await db.bookings.getAll();
      setBookings(allBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBookingsList = () => {
    let filtered = [...bookings];

    // Filter by email
    if (searchEmail) {
      filtered = filtered.filter(b => 
        b.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }

    // Filter by booking ID
    if (searchId) {
      filtered = filtered.filter(b => 
        b.id.toLowerCase().includes(searchId.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(b => b.booking_status === filterStatus);
    }

    // Sort by created date (newest first)
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    setFilteredBookings(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle className="w-5 h-5" />;
      case 'Pending':
        return <Clock className="w-5 h-5" />;
      case 'Cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          My Bookings
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          View and manage your hotel reservations
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search by Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                placeholder="Enter your email"
              />
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search by Booking ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                placeholder="Enter booking ID"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            >
              <option value="all">All Bookings</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600 font-medium">
          Found {filteredBookings.length} {filteredBookings.length === 1 ? 'booking' : 'bookings'}
        </p>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Found</h3>
          <p className="text-gray-600 mb-6">
            {searchEmail || searchId ? 
              "Try adjusting your search criteria" : 
              "You don't have any bookings yet. Start exploring our rooms!"}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all"
          >
            Book a Room
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Room Image */}
                {booking.rooms && (
                  <div className="md:w-64 h-48 md:h-auto">
                    <img
                      src={booking.rooms.image_url}
                      alt={booking.rooms.room_type}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Booking Details */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {booking.rooms?.room_type || 'Room'}
                      </h3>
                      <p className="text-sm text-gray-500 font-mono">
                        Booking ID: {booking.id.substring(0, 8).toUpperCase()}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-semibold ${getStatusColor(booking.booking_status)}`}>
                      {getStatusIcon(booking.booking_status)}
                      {booking.booking_status}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-xs text-gray-500">Check-in</p>
                        <p className="font-semibold">{formatDate(booking.check_in_date)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-xs text-gray-500">Check-out</p>
                        <p className="font-semibold">{formatDate(booking.check_out_date)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-semibold">{booking.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-semibold">{booking.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-emerald-600">
                        {formatCurrency(booking.total_price)}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-all font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Booking Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600 transition text-3xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Status Badge */}
              <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 font-semibold ${getStatusColor(selectedBooking.booking_status)} justify-center`}>
                {getStatusIcon(selectedBooking.booking_status)}
                <span>Booking {selectedBooking.booking_status}</span>
              </div>

              {/* Booking Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Booking ID</p>
                  <p className="font-semibold text-gray-800 font-mono">
                    {selectedBooking.id.substring(0, 8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booking Date</p>
                  <p className="font-semibold text-gray-800">
                    {formatDate(selectedBooking.created_at)}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3">Guest Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-700">{selectedBooking.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-700">{selectedBooking.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-700">{selectedBooking.phone}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3">Stay Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Room Type</p>
                    <p className="font-semibold text-gray-800">{selectedBooking.rooms?.room_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Guests</p>
                    <p className="font-semibold text-gray-800">
                      {selectedBooking.adults} Adult{selectedBooking.adults > 1 ? 's' : ''}
                      {selectedBooking.children > 0 && `, ${selectedBooking.children} Child${selectedBooking.children > 1 ? 'ren' : ''}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Check-in</p>
                    <p className="font-semibold text-gray-800">{formatDate(selectedBooking.check_in_date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Check-out</p>
                    <p className="font-semibold text-gray-800">{formatDate(selectedBooking.check_out_date)}</p>
                  </div>
                </div>
              </div>

              {selectedBooking.special_requests && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Special Requests</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {selectedBooking.special_requests}
                  </p>
                </div>
              )}

              <div className="border-t pt-4 bg-emerald-50 -mx-8 px-8 py-4 -mb-8 rounded-b-2xl">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-700">Total Amount</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {formatCurrency(selectedBooking.total_price)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
