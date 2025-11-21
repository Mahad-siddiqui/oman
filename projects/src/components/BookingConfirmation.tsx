import { CheckCircle, Home, Calendar, User, Mail, Phone } from 'lucide-react';
import { Booking, Room } from '../lib/localStorage';
import { formatCurrency, formatDate } from '../lib/utils';

type BookingConfirmationProps = {
  booking: Booking;
  room: Room;
  onNewBooking: () => void;
};

export default function BookingConfirmation({ booking, room, onNewBooking }: BookingConfirmationProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600">Your reservation has been successfully completed</p>
        </div>

        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 mb-8">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">Booking Reference</p>
            <p className="text-2xl font-bold text-emerald-600 font-mono tracking-wide">
              {booking.id.substring(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Guest Name</p>
                <p className="font-semibold text-gray-800">{booking.customer_name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-800">{booking.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-800">{booking.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Home className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Room Type</p>
                <p className="font-semibold text-gray-800">{room.room_type}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Check-in</p>
                  <p className="font-semibold text-gray-800">{formatDate(booking.check_in_date)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Check-out</p>
                  <p className="font-semibold text-gray-800">{formatDate(booking.check_out_date)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-700">Total Amount</p>
              <p className="text-2xl font-bold text-emerald-600">{formatCurrency(booking.total_price)}</p>
            </div>
          </div>

          {booking.special_requests && (
            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-2">Special Requests</p>
              <p className="text-gray-800 bg-gray-50 p-4 rounded-lg">{booking.special_requests}</p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Important:</strong> A confirmation email has been sent to {booking.email}.
            Please save your booking reference number for check-in.
          </p>
        </div>

        <button
          onClick={onNewBooking}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
        >
          Make Another Booking
        </button>
      </div>
    </div>
  );
}
