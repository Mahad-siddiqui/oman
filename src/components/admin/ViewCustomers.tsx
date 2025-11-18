import { useEffect, useState } from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import { Booking, db } from '../../lib/localStorage';

type Customer = {
  customer_name: string;
  email: string;
  phone: string;
  total_bookings: number;
  bookings: Booking[];
};

export default function ViewCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const bookings = await db.bookings.getAll();
      // Sort by created_at descending
      const sorted = bookings.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      const customerMap = new Map<string, Customer>();

      sorted.forEach((booking) => {
        const key = booking.email.toLowerCase();
        if (customerMap.has(key)) {
          const customer = customerMap.get(key)!;
          customer.total_bookings++;
          customer.bookings.push(booking);
        } else {
          customerMap.set(key, {
            customer_name: booking.customer_name,
            email: booking.email,
            phone: booking.phone,
            total_bookings: 1,
            bookings: [booking]
          });
        }
      });

      setCustomers(Array.from(customerMap.values()));
    } catch (error) {
      setError('Failed to load customers');
      console.error(error);
    } finally {
      setLoading(false);
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
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-1">Customer Directory</h3>
        <p className="text-gray-600">View all customers and their booking history</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {customers.map((customer, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-1">{customer.customer_name}</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    {customer.phone}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full">
                  <p className="text-2xl font-bold">{customer.total_bookings}</p>
                  <p className="text-xs">Booking{customer.total_bookings > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Recent Bookings
              </h5>
              <div className="space-y-2">
                {customer.bookings.slice(0, 3).map((booking, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Booking ID: {booking.id.substring(0, 8).toUpperCase()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.booking_status === 'Confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.booking_status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {booking.booking_status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {customers.length === 0 && (
          <div className="col-span-2 bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No customers found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
