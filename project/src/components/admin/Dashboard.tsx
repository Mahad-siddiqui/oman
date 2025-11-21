import { useEffect, useState } from 'react';
import { Hotel, CheckCircle, Clock, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type DashboardStats = {
  totalRooms: number;
  availableRooms: number;
  bookedRooms: number;
  todaysBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRooms: 0,
    availableRooms: 0,
    bookedRooms: 0,
    todaysBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data: rooms } = await supabase.from('rooms').select('*');
      const { data: bookings } = await supabase.from('bookings').select('*');

      const today = new Date().toISOString().split('T')[0];

      setStats({
        totalRooms: rooms?.length || 0,
        availableRooms: rooms?.filter(r => r.status === 'Available').length || 0,
        bookedRooms: rooms?.filter(r => r.status === 'Not Available').length || 0,
        todaysBookings: bookings?.filter(b => b.created_at.startsWith(today)).length || 0,
        pendingBookings: bookings?.filter(b => b.booking_status === 'Pending').length || 0,
        confirmedBookings: bookings?.filter(b => b.booking_status === 'Confirmed').length || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
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

  const statCards = [
    {
      title: 'Total Rooms',
      value: stats.totalRooms,
      icon: Hotel,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Available Rooms',
      value: stats.availableRooms,
      icon: CheckCircle,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Booked Rooms',
      value: stats.bookedRooms,
      icon: Calendar,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: "Today's Bookings",
      value: stats.todaysBookings,
      icon: Calendar,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Confirmed Bookings',
      value: stats.confirmedBookings,
      icon: CheckCircle,
      color: 'bg-teal-500',
      bgColor: 'bg-teal-50'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">System Overview</h3>
        <p className="text-gray-600">Quick summary of hotel operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className={`text-3xl font-bold ${stat.color.replace('bg-', 'text-')}`}>
                  {stat.value}
                </div>
              </div>
              <h4 className="text-gray-700 font-semibold">{stat.title}</h4>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition font-medium">
            View All Bookings
          </button>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-medium">
            Manage Rooms
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
            View Customers
          </button>
        </div>
      </div>
    </div>
  );
}
