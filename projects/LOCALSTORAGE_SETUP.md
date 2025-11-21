# LocalStorage Database Implementation

## Overview
Your hotel booking system now uses **localStorage** as the database. All data is stored locally in the browser with no external dependencies.

## Key Changes

### 1. New Database Layer
- **File**: `src/lib/localStorage.ts`
- Provides a complete database API using localStorage
- Includes operations for rooms, bookings, and admin management
- Automatically initializes with sample data on first load

### 2. Updated Components
All components have been updated to use the new localStorage database:

- ✅ `App.tsx` - Main application logic
- ✅ `auth.ts` - Admin authentication
- ✅ `BookingForm.tsx` - Room booking form
- ✅ `RoomCard.tsx` - Room display card
- ✅ `BookingConfirmation.tsx` - Booking confirmation
- ✅ `admin/Dashboard.tsx` - Admin dashboard
- ✅ `admin/ManageRooms.tsx` - Room management
- ✅ `admin/ManageBookings.tsx` - Booking management
- ✅ `admin/ViewCustomers.tsx` - Customer view

### 3. Clean Implementation
- No Supabase dependencies
- No external API calls
- No environment variables needed
- Pure frontend application

## Features

### Database Operations

#### Rooms
- `db.rooms.getAll()` - Get all rooms
- `db.rooms.getById(id)` - Get room by ID
- `db.rooms.getAvailable()` - Get available rooms
- `db.rooms.create(data)` - Create new room
- `db.rooms.update(id, data)` - Update room
- `db.rooms.delete(id)` - Delete room

#### Bookings
- `db.bookings.getAll()` - Get all bookings (with room data)
- `db.bookings.getById(id)` - Get booking by ID
- `db.bookings.getByRoomId(roomId)` - Get bookings for a room
- `db.bookings.getByStatus(status)` - Get bookings by status
- `db.bookings.create(data)` - Create new booking
- `db.bookings.update(id, data)` - Update booking
- `db.bookings.delete(id)` - Delete booking

#### Admins
- `db.admins.getAll()` - Get all admins
- `db.admins.getByUsername(username)` - Get admin by username
- `db.admins.create(data)` - Create new admin

### Initial Data

The system comes pre-loaded with:

**4 Sample Rooms:**
1. Deluxe Room - OMR 75/night
2. Executive Suite - OMR 120/night
3. Family Room - OMR 95/night
4. Presidential Suite - OMR 200/night

**1 Admin Account:**
- Username: `admin`
- Password: `admin123`

## Data Persistence

- All data is stored in browser's localStorage
- Data persists between page refreshes
- Data is specific to each browser/device
- **Note**: Clearing browser data will delete all bookings and rooms

## Development Tips

### Viewing Data
Open browser DevTools → Application/Storage → Local Storage to view:
- `rooms` - All room data
- `bookings` - All booking data
- `admins` - Admin accounts
- `admin` - Currently logged-in admin session

### Resetting Data
To reset to default data, run in browser console:
```javascript
localStorage.clear();
location.reload();
```

### Testing
1. **Customer Flow**: Search rooms → Book room → View confirmation
2. **Admin Flow**: Login with admin/admin123 → Manage rooms/bookings
3. **Data Persistence**: Refresh page to verify data is saved

## Advantages of localStorage

✅ **No External Dependencies** - Works offline, no API calls
✅ **Fast Performance** - Instant data access
✅ **Simple Setup** - No database configuration needed
✅ **Perfect for Demos** - Great for showcasing functionality
✅ **Zero Cost** - No hosting or database fees

## Limitations

⚠️ **Browser-Specific** - Data doesn't sync across devices
⚠️ **Storage Limit** - ~5-10MB per domain (sufficient for this app)
⚠️ **Not Secure** - Data visible in DevTools (don't store sensitive info)
⚠️ **Single User** - No multi-user concurrent access

## Migration to Production Database

If you need to migrate to a real database later:

1. Keep the existing database API structure in `localStorage.ts`
2. Replace the implementation with API calls to your backend
3. No changes needed in components (they use the same API)

Example structure maintained:
```typescript
export const db = {
  rooms: { getAll, create, update, delete },
  bookings: { getAll, create, update, delete },
  admins: { getAll, getByUsername }
}
```

## Support

The system is fully functional and ready to use! All functionality is powered by localStorage with zero external dependencies.

Enjoy your locally-powered hotel booking system! 🏨
