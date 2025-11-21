# Hotel Booking System - Oman Grand Hotel

A complete hotel booking system built with React, TypeScript, Tailwind CSS, and Supabase.

## Features Implemented

### Customer-Facing Features
- **Home Page**: Welcome screen with search form
- **Room Search**: Search rooms by check-in/check-out dates and guest count
- **Available Rooms Display**: Grid view of available rooms with images and details
- **Room Details**: View amenities, pricing, and capacity
- **Booking Form**: Complete customer information form with validation
- **Booking Confirmation**: Success page with booking reference number
- **Room Availability Logic**: Prevents double-booking by checking existing reservations

### Admin Panel Features
- **Admin Login**: Secure authentication (username: admin, password: admin123)
- **Dashboard**: Overview with statistics (total rooms, available rooms, bookings, etc.)
- **Manage Rooms**: Full CRUD operations for rooms
  - Add new rooms with images, pricing, amenities
  - Edit existing room details
  - Delete rooms
  - Upload room images (via URL)
  - Set room availability status
- **Manage Bookings**: View and manage all customer bookings
  - View booking details
  - Confirm pending bookings
  - Cancel bookings
  - Filter by status
- **View Customers**: Customer directory with booking history

## Database Structure

### Tables
1. **admins**: Administrator accounts
2. **rooms**: Hotel room inventory
3. **bookings**: Customer reservations
4. **payments**: Payment records (optional)

All tables have Row Level Security (RLS) enabled for data protection.

## How to Use

### For Customers:
1. Enter check-in and check-out dates
2. Select number of adults and children
3. Browse available rooms
4. Click "Book Now" on desired room
5. Fill in personal information
6. Confirm booking and receive booking reference

### For Admins:
1. Click "Admin Login" button in top-right corner
2. Login with credentials (admin/admin123)
3. Use sidebar navigation to access different sections
4. Manage rooms, bookings, and view customer data

## Technical Details

### Key Features:
- **Real-time availability checking**: Prevents overlapping bookings
- **Automatic price calculation**: Based on number of nights
- **Form validation**: Email, phone, and date validation
- **Responsive design**: Works on mobile, tablet, and desktop
- **Beautiful UI**: Modern design with emerald/teal color scheme
- **Error handling**: User-friendly error messages

### Currency:
All prices are displayed in Omani Rial (OMR)

## Sample Rooms

The system comes pre-loaded with 5 rooms:
1. Single Room (45 OMR/night)
2. Double Room (75 OMR/night)
3. Deluxe Room (120 OMR/night)
4. Family Suite (180 OMR/night)
5. Presidential Suite (350 OMR/night)

## Admin Credentials

**Username**: admin
**Password**: admin123

## Design Theme

- Professional emerald and teal color scheme
- Clean, modern interface
- High-quality stock photos from Pexels
- Smooth transitions and hover effects
- Intuitive navigation

## Notes

- This is a production-ready booking system
- All data is persisted in Supabase PostgreSQL database
- The system handles date conflicts automatically
- Admin can manage all aspects of the hotel operations
- Customers receive immediate booking confirmation
