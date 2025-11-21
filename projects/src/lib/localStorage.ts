// localStorage Database Layer for Hotel Booking System

export type Room = {
  id: string;
  room_type: string;
  price: number;
  max_guests: number;
  description: string;
  image_url: string;
  status: 'Available' | 'Not Available';
  amenities: string[];
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  cnic_passport: string;
  room_id: string;
  check_in_date: string;
  check_out_date: string;
  adults: number;
  children: number;
  special_requests: string;
  total_price: number;
  booking_status: 'Pending' | 'Confirmed' | 'Cancelled';
  created_at: string;
  rooms?: Room;
};

export type Admin = {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
};

// Initialize default data
const initializeDatabase = () => {
  if (!localStorage.getItem('rooms')) {
    const defaultRooms: Room[] = [
      {
        id: '1',
        room_type: 'Deluxe Room',
        price: 75,
        max_guests: 2,
        description: 'Spacious deluxe room with modern amenities and city view',
        image_url: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
        status: 'Available',
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Room Service'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        room_type: 'Executive Suite',
        price: 120,
        max_guests: 3,
        description: 'Luxurious executive suite with separate living area and premium amenities',
        image_url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
        status: 'Available',
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Room Service', 'Jacuzzi', 'Balcony'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        room_type: 'Family Room',
        price: 95,
        max_guests: 4,
        description: 'Perfect for families with extra space and comfortable bedding arrangements',
        image_url: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
        status: 'Available',
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Room Service', 'Extra Beds'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '4',
        room_type: 'Presidential Suite',
        price: 200,
        max_guests: 4,
        description: 'Ultimate luxury with panoramic views, private lounge, and personalized service',
        image_url: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
        status: 'Available',
        amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Room Service', 'Jacuzzi', 'Balcony', 'Kitchen', 'Private Butler'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    localStorage.setItem('rooms', JSON.stringify(defaultRooms));
  }

  if (!localStorage.getItem('bookings')) {
    localStorage.setItem('bookings', JSON.stringify([]));
  }

  if (!localStorage.getItem('admins')) {
    const defaultAdmins: Admin[] = [
      {
        id: '1',
        username: 'admin',
        email: 'admin@omangrandhotel.com',
        password: 'admin123',
        created_at: new Date().toISOString()
      }
    ];
    localStorage.setItem('admins', JSON.stringify(defaultAdmins));
  }
};

// Initialize on load
initializeDatabase();

// Utility function to generate UUID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Database operations
export const db = {
  // Rooms operations
  rooms: {
    getAll: async (): Promise<Room[]> => {
      const rooms = localStorage.getItem('rooms');
      return rooms ? JSON.parse(rooms) : [];
    },

    getById: async (id: string): Promise<Room | null> => {
      const rooms = await db.rooms.getAll();
      return rooms.find(room => room.id === id) || null;
    },

    getAvailable: async (): Promise<Room[]> => {
      const rooms = await db.rooms.getAll();
      return rooms.filter(room => room.status === 'Available');
    },

    create: async (roomData: Omit<Room, 'id' | 'created_at' | 'updated_at'>): Promise<Room> => {
      const rooms = await db.rooms.getAll();
      const newRoom: Room = {
        ...roomData,
        id: generateId(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      rooms.push(newRoom);
      localStorage.setItem('rooms', JSON.stringify(rooms));
      return newRoom;
    },

    update: async (id: string, roomData: Partial<Room>): Promise<Room | null> => {
      const rooms = await db.rooms.getAll();
      const index = rooms.findIndex(room => room.id === id);
      if (index === -1) return null;

      rooms[index] = {
        ...rooms[index],
        ...roomData,
        updated_at: new Date().toISOString()
      };
      localStorage.setItem('rooms', JSON.stringify(rooms));
      return rooms[index];
    },

    delete: async (id: string): Promise<boolean> => {
      const rooms = await db.rooms.getAll();
      const filtered = rooms.filter(room => room.id !== id);
      if (filtered.length === rooms.length) return false;
      localStorage.setItem('rooms', JSON.stringify(filtered));
      return true;
    }
  },

  // Bookings operations
  bookings: {
    getAll: async (): Promise<Booking[]> => {
      const bookings = localStorage.getItem('bookings');
      const bookingList: Booking[] = bookings ? JSON.parse(bookings) : [];
      
      // Populate room data
      const rooms = await db.rooms.getAll();
      return bookingList.map(booking => ({
        ...booking,
        rooms: rooms.find(room => room.id === booking.room_id)
      }));
    },

    getById: async (id: string): Promise<Booking | null> => {
      const bookings = await db.bookings.getAll();
      return bookings.find(booking => booking.id === id) || null;
    },

    getByRoomId: async (roomId: string): Promise<Booking[]> => {
      const bookings = await db.bookings.getAll();
      return bookings.filter(booking => booking.room_id === roomId);
    },

    getByStatus: async (status: 'Pending' | 'Confirmed' | 'Cancelled'): Promise<Booking[]> => {
      const bookings = await db.bookings.getAll();
      return bookings.filter(booking => booking.booking_status === status);
    },

    create: async (bookingData: Omit<Booking, 'id' | 'created_at'>): Promise<Booking> => {
      const bookings = localStorage.getItem('bookings');
      const bookingList: Booking[] = bookings ? JSON.parse(bookings) : [];
      
      const newBooking: Booking = {
        ...bookingData,
        id: generateId(),
        created_at: new Date().toISOString()
      };
      
      bookingList.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(bookingList));
      
      // Get room data for return value
      const room = await db.rooms.getById(bookingData.room_id);
      return {
        ...newBooking,
        rooms: room || undefined
      };
    },

    update: async (id: string, bookingData: Partial<Booking>): Promise<Booking | null> => {
      const bookings = localStorage.getItem('bookings');
      const bookingList: Booking[] = bookings ? JSON.parse(bookings) : [];
      const index = bookingList.findIndex(booking => booking.id === id);
      
      if (index === -1) return null;

      bookingList[index] = {
        ...bookingList[index],
        ...bookingData
      };
      localStorage.setItem('bookings', JSON.stringify(bookingList));
      
      // Get room data for return value
      const room = await db.rooms.getById(bookingList[index].room_id);
      return {
        ...bookingList[index],
        rooms: room || undefined
      };
    },

    delete: async (id: string): Promise<boolean> => {
      const bookings = localStorage.getItem('bookings');
      const bookingList: Booking[] = bookings ? JSON.parse(bookings) : [];
      const filtered = bookingList.filter(booking => booking.id !== id);
      
      if (filtered.length === bookingList.length) return false;
      localStorage.setItem('bookings', JSON.stringify(filtered));
      return true;
    }
  },

  // Admins operations
  admins: {
    getAll: async (): Promise<Admin[]> => {
      const admins = localStorage.getItem('admins');
      return admins ? JSON.parse(admins) : [];
    },

    getByUsername: async (username: string): Promise<Admin | null> => {
      const admins = await db.admins.getAll();
      return admins.find(admin => admin.username === username) || null;
    },

    create: async (adminData: Omit<Admin, 'id' | 'created_at'>): Promise<Admin> => {
      const admins = await db.admins.getAll();
      const newAdmin: Admin = {
        ...adminData,
        id: generateId(),
        created_at: new Date().toISOString()
      };
      admins.push(newAdmin);
      localStorage.setItem('admins', JSON.stringify(admins));
      return newAdmin;
    }
  }
};
