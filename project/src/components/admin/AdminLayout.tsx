import { ReactNode } from 'react';
import { LayoutDashboard, Hotel, Calendar, Users, LogOut, User } from 'lucide-react';

type AdminLayoutProps = {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  admin: { username: string };
};

export default function AdminLayout({ children, activeTab, onTabChange, onLogout, admin }: AdminLayoutProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'rooms', label: 'Manage Rooms', icon: Hotel },
    { id: 'bookings', label: 'Manage Bookings', icon: Calendar },
    { id: 'customers', label: 'View Customers', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-gradient-to-b from-emerald-700 to-teal-700 min-h-screen text-white">
          <div className="p-6 border-b border-emerald-600">
            <div className="flex items-center gap-3 mb-2">
              <Hotel className="w-8 h-8" />
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
            <p className="text-emerald-100 text-sm">Oman Grand Hotel</p>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-white text-emerald-700 shadow-lg'
                      : 'text-emerald-50 hover:bg-emerald-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-0 w-64 p-4 border-t border-emerald-600">
            <div className="flex items-center gap-3 px-4 py-3 bg-emerald-600 rounded-lg mb-2">
              <User className="w-5 h-5" />
              <div className="flex-1">
                <p className="font-medium text-sm">{admin.username}</p>
                <p className="text-xs text-emerald-100">Administrator</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-emerald-50 hover:bg-emerald-600 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h2>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>

          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
