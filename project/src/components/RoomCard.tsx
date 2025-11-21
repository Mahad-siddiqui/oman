import { Users, Wifi, Coffee } from 'lucide-react';
import { Room } from '../lib/supabase';
import { formatCurrency } from '../lib/utils';

type RoomCardProps = {
  room: Room;
  onBook: (room: Room) => void;
};

export default function RoomCard({ room, onBook }: RoomCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
      <div className="relative h-64 overflow-hidden">
        <img
          src={room.image_url}
          alt={room.room_type}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
          {formatCurrency(room.price)}/night
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{room.room_type}</h3>

        <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>

        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <Users className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium">Up to {room.max_guests} guests</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities.slice(0, 4).map((amenity, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full"
            >
              {amenity === 'WiFi' && <Wifi className="w-3 h-3" />}
              {amenity === 'Breakfast' && <Coffee className="w-3 h-3" />}
              {amenity}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{room.amenities.length - 4} more
            </span>
          )}
        </div>

        <button
          onClick={() => onBook(room)}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-md"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
