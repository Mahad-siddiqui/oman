import { ReactNode, useState } from 'react';
import { LayoutDashboard, Hotel, Calendar, Users, LogOut, User, Menu, X } from 'lucide-react';

type AdminLayoutProps = {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  admin: { username: string };
};

export default function AdminLayout({ children, activeTab, onTabChange, onLogout, admin }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'rooms', label: 'Manage Rooms', icon: Hotel },
    { id: 'bookings', label: 'Manage Bookings', icon: Calendar },
    { id: 'customers', label: 'View Customers', icon: Users }
  ];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Mobile Header */}
        <div className="md:hidden bg-gradient-to-r from-emerald-700 to-teal-700 text-white flex items-center justify-between p-4 shadow-md">
          <div className="flex items-center gap-2">
            <Hotel className="w-6 h-6" />
            <h1 className="text-lg font-bold">Admin Panel</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-emerald-600 rounded-lg transition"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-emerald-700 to-teal-700 min-h-screen text-white transform transition-transform md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:mt-0 mt-16`}
        >
          <div className="p-6 border-b border-emerald-600 hidden md:block">
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
                  onClick={() => handleTabChange(item.id)}
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

          <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-emerald-600">
            <div className="flex items-center gap-3 px-4 py-3 bg-emerald-600 rounded-lg mb-2">
              <User className="w-5 h-5" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{admin.username}</p>
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

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 w-full">
          <div className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h2>
              <div className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
