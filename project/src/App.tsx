import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import RoomCard from './components/RoomCard';
import BookingForm, { BookingData } from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import AdminLogin from './components/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ManageRooms from './components/admin/ManageRooms';
import ManageBookings from './components/admin/ManageBookings';
import ViewCustomers from './components/admin/ViewCustomers';
import { supabase, Room, Booking } from './lib/supabase';
import { loginAdmin, getStoredAdmin, storeAdmin, clearAdmin } from './lib/auth';
import { calculateTotalPrice } from './lib/utils';

type AppView = 'home' | 'rooms' | 'booking' | 'confirmation' | 'admin';

function App() {
  const [view, setView] = useState<AppView>('home');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchParams, setSearchParams] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0
  });
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [admin, setAdmin] = useState<{ username: string } | null>(null);
  const [adminView, setAdminView] = useState('dashboard');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const storedAdmin = getStoredAdmin();
    if (storedAdmin) {
      setAdmin(storedAdmin);
      setView('admin');
    }
  }, []);

  const handleSearch = async (checkIn: string, checkOut: string, adults: number, children: number) => {
    setLoading(true);
    setError('');
    setSearchParams({ checkIn, checkOut, adults, children });

    try {
      const { data: allRooms, error: roomError } = await supabase
        .from('rooms')
        .select('*')
        .eq('status', 'Available');

      if (roomError) throw roomError;

      const { data: existingBookings, error: bookingError } = await supabase
        .from('bookings')
        .select('room_id, check_in_date, check_out_date')
        .in('booking_status', ['Pending', 'Confirmed']);

      if (bookingError) throw bookingError;

      const availableRooms = allRooms?.filter((room) => {
        const hasConflict = existingBookings?.some((booking) => {
          if (booking.room_id !== room.id) return false;
          const bookingCheckIn = new Date(booking.check_in_date);
          const bookingCheckOut = new Date(booking.check_out_date);
          const searchCheckIn = new Date(checkIn);
          const searchCheckOut = new Date(checkOut);

          return !(searchCheckOut <= bookingCheckIn || searchCheckIn >= bookingCheckOut);
        });

        return !hasConflict && room.max_guests >= adults + children;
      });

      if (!availableRooms || availableRooms.length === 0) {
        setError('Sorry, no rooms are available for the selected dates and guest count.');
        setRooms([]);
      } else {
        setRooms(availableRooms);
        setView('rooms');
      }
    } catch (err) {
      setError('Error: Could not search for rooms. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
    setView('booking');
  };

  const handleBookingSubmit = async (bookingData: BookingData) => {
    if (!selectedRoom) return;

    setLoading(true);
    setError('');

    try {
      const totalPrice = calculateTotalPrice(
        selectedRoom.price,
        searchParams.checkIn,
        searchParams.checkOut
      );

      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            ...bookingData,
            room_id: selectedRoom.id,
            check_in_date: searchParams.checkIn,
            check_out_date: searchParams.checkOut,
            adults: searchParams.adults,
            children: searchParams.children,
            total_price: totalPrice,
            booking_status: 'Confirmed'
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setConfirmedBooking(data);
      setView('confirmation');
    } catch (err) {
      setError('Error: Could not save booking. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewBooking = () => {
    setView('home');
    setSelectedRoom(null);
    setConfirmedBooking(null);
    setRooms([]);
    setError('');
  };

  const handleAdminLogin = async (username: string, password: string) => {
    setLoginError('');
    const result = await loginAdmin(username, password);

    if (result.success && result.admin) {
      setAdmin({ username: result.admin.username });
      storeAdmin({ username: result.admin.username });
      setView('admin');
    } else {
      setLoginError(result.error || 'Invalid username or password');
    }
  };

  const handleAdminLogout = () => {
    setAdmin(null);
    clearAdmin();
    setView('home');
    setAdminView('dashboard');
  };

  const showAdminLogin = () => {
    setView('admin');
    setAdmin(null);
    clearAdmin();
  };

  if (view === 'admin' && !admin) {
    return <AdminLogin onLogin={handleAdminLogin} error={loginError} />;
  }

  if (view === 'admin' && admin) {
    return (
      <AdminLayout
        activeTab={adminView}
        onTabChange={setAdminView}
        onLogout={handleAdminLogout}
        admin={admin}
      >
        {adminView === 'dashboard' && <Dashboard />}
        {adminView === 'rooms' && <ManageRooms />}
        {adminView === 'bookings' && <ManageBookings />}
        {adminView === 'customers' && <ViewCustomers />}
      </AdminLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <button
        onClick={showAdminLogin}
        className="fixed top-24 right-6 bg-white text-emerald-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-2 font-medium border-2 border-emerald-600"
      >
        <Shield className="w-5 h-5" />
        Admin Login
      </button>

      <main className="container mx-auto px-4 py-12">
        {view === 'home' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Welcome to Oman Grand Hotel
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the finest hospitality in Muscat. Book your perfect room today and enjoy
                luxury accommodation with world-class amenities.
              </p>
            </div>

            {error && (
              <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <SearchForm onSearch={handleSearch} />

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl mb-3">🏨</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Luxury Rooms</h3>
                <p className="text-gray-600">Premium accommodations with modern amenities</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl mb-3">🍽️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Fine Dining</h3>
                <p className="text-gray-600">Exquisite cuisine from around the world</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl mb-3">🌊</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Prime Location</h3>
                <p className="text-gray-600">Steps away from Muscat's finest attractions</p>
              </div>
            </div>
          </div>
        )}

        {view === 'rooms' && (
          <div>
            <div className="mb-8">
              <button
                onClick={() => setView('home')}
                className="text-emerald-600 hover:text-emerald-700 font-medium mb-4"
              >
                ← Back to Search
              </button>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Available Rooms</h2>
              <p className="text-gray-600">
                {rooms.length} room{rooms.length > 1 ? 's' : ''} available for your dates
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} onBook={handleBookRoom} />
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'booking' && selectedRoom && (
          <BookingForm
            room={selectedRoom}
            checkIn={searchParams.checkIn}
            checkOut={searchParams.checkOut}
            adults={searchParams.adults}
            children={searchParams.children}
            onSubmit={handleBookingSubmit}
            onBack={() => setView('rooms')}
          />
        )}

        {view === 'confirmation' && confirmedBooking && selectedRoom && (
          <BookingConfirmation
            booking={confirmedBooking}
            room={selectedRoom}
            onNewBooking={handleNewBooking}
          />
        )}
      </main>

      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Oman Grand Hotel. All rights reserved. | Experience luxury in Muscat
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
