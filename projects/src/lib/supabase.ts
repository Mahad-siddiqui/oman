import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  password_hash: string;
  created_at: string;
};

export type Payment = {
  id: string;
  booking_id: string;
  amount: number;
  method: 'Cash' | 'Card' | 'Online';
  status: 'Pending' | 'Completed' | 'Failed';
  created_at: string;
};
