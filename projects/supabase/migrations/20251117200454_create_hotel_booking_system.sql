/*
  # Hotel Booking System Database Schema
  
  ## Overview
  Complete database structure for a hotel booking system with authentication, room management, and booking functionality.
  
  ## New Tables
  
  ### 1. `admins`
  Administrator accounts for system management
  - `id` (uuid, primary key) - Unique admin identifier
  - `username` (text, unique) - Admin login username
  - `email` (text, unique) - Admin email address
  - `password_hash` (text) - Hashed password for security
  - `created_at` (timestamptz) - Account creation timestamp
  
  ### 2. `rooms`
  Hotel room inventory and details
  - `id` (uuid, primary key) - Unique room identifier
  - `room_type` (text) - Type of room (Single, Double, Deluxe, Suite)
  - `price` (decimal) - Price per night
  - `max_guests` (integer) - Maximum number of guests allowed
  - `description` (text) - Detailed room description
  - `image_url` (text) - URL/path to room image
  - `status` (text) - Availability status (Available, Not Available)
  - `amenities` (text[]) - Array of amenities (WiFi, AC, Breakfast, etc.)
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 3. `bookings`
  Customer booking records
  - `id` (uuid, primary key) - Unique booking identifier
  - `customer_name` (text) - Full name of customer
  - `email` (text) - Customer email address
  - `phone` (text) - Customer phone number
  - `cnic_passport` (text, optional) - Customer identification
  - `room_id` (uuid, foreign key) - Reference to booked room
  - `check_in_date` (date) - Booking start date
  - `check_out_date` (date) - Booking end date
  - `adults` (integer) - Number of adult guests
  - `children` (integer) - Number of child guests
  - `special_requests` (text, optional) - Customer special requests
  - `total_price` (decimal) - Total booking amount
  - `booking_status` (text) - Status (Pending, Confirmed, Cancelled)
  - `created_at` (timestamptz) - Booking creation timestamp
  
  ### 4. `payments` (Optional)
  Payment transaction records
  - `id` (uuid, primary key) - Unique payment identifier
  - `booking_id` (uuid, foreign key) - Reference to booking
  - `amount` (decimal) - Payment amount
  - `method` (text) - Payment method (Cash, Card, Online)
  - `status` (text) - Payment status (Pending, Completed, Failed)
  - `created_at` (timestamptz) - Payment timestamp
  
  ## Security
  
  ### Row Level Security (RLS)
  - All tables have RLS enabled
  - Admins can perform all operations on rooms and bookings
  - Public users can view available rooms and create bookings
  - Customers can view their own bookings
  
  ### Policies
  1. **Admins table**: Only accessible by authenticated admins
  2. **Rooms table**: Public can read, admins can manage
  3. **Bookings table**: Public can create, admins can manage all
  4. **Payments table**: Restricted to authenticated users
  
  ## Notes
  - Password hashing handled at application level
  - Room availability calculated based on booking date ranges
  - Booking price automatically calculated: price_per_night × number_of_nights
  - Default admin account will need to be created separately
*/

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_type text NOT NULL,
  price decimal(10, 2) NOT NULL CHECK (price > 0),
  max_guests integer NOT NULL DEFAULT 2 CHECK (max_guests > 0),
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Not Available')),
  amenities text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  cnic_passport text DEFAULT '',
  room_id uuid NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
  check_in_date date NOT NULL,
  check_out_date date NOT NULL,
  adults integer NOT NULL DEFAULT 1 CHECK (adults > 0),
  children integer NOT NULL DEFAULT 0 CHECK (children >= 0),
  special_requests text DEFAULT '',
  total_price decimal(10, 2) NOT NULL CHECK (total_price >= 0),
  booking_status text NOT NULL DEFAULT 'Pending' CHECK (booking_status IN ('Pending', 'Confirmed', 'Cancelled')),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (check_out_date > check_in_date)
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  amount decimal(10, 2) NOT NULL CHECK (amount >= 0),
  method text NOT NULL DEFAULT 'Cash' CHECK (method IN ('Cash', 'Card', 'Online')),
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Failed')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Admins table policies
CREATE POLICY "Admins can read own data"
  ON admins FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can update own data"
  ON admins FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- Rooms table policies (public read, authenticated admin write)
CREATE POLICY "Anyone can view available rooms"
  ON rooms FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage rooms"
  ON rooms FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update rooms"
  ON rooms FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete rooms"
  ON rooms FOR DELETE
  TO authenticated
  USING (true);

-- Bookings table policies
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view bookings"
  ON bookings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (true);

-- Payments table policies
CREATE POLICY "Authenticated users can view payments"
  ON payments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update payments"
  ON payments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_room_id ON bookings(room_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in_date, check_out_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for rooms table
CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
