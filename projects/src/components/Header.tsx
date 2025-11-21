import { Hotel } from 'lucide-react';

type HeaderProps = {
  currentView: string;
  onNavigate: (view: string) => void;
};

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'mybookings', label: 'My Bookings' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Hotel className="w-10 h-10" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Oman Grand Hotel</h1>
              <p className="text-emerald-100 text-xs md:text-sm">Experience Luxury in the Heart of Muscat</p>
            </div>
          </div>
          
          <nav className="flex flex-wrap gap-2 md:gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-all ${
                  currentView === item.id
                    ? 'bg-white text-emerald-600 shadow-md'
                    : 'text-white hover:bg-emerald-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
