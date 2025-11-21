import { Hotel } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Hotel className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Oman Grand Hotel</h1>
              <p className="text-emerald-100 text-sm">Experience Luxury in the Heart of Muscat</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
