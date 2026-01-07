# Goa Holiday Package Booking System

A React.js web application for booking holiday packages in Goa during New Year and Christmas celebrations with MongoDB backend integration.

## Features

- **Three Package Options:**
  - Platinum Package: ₹15,000 per person (15% discount)
  - Gold Package: ₹10,000 per person (10% discount)
  - Silver Package: ₹5,000 per person (5% discount)

- **Home Page:** Displays all available packages with pricing details
- **Enquire Page:** Contact form for package inquiries (saved to MongoDB)
- **Booking Page:** Complete booking system with:
  - Booking form with validation
  - Real-time price calculation
  - New Year Voucher option (₹1,000 OFF)
  - CRUD operations (Create, Read, Update, Delete) for bookings
  - View all bookings in the UI
  - All data persisted in MongoDB

## Installation

1. Install dependencies:
```bash
npm install
```

2. **Set up MongoDB connection:**
   - Create a `.env` file in the root directory
   - Add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://02fe23bcs084_db_user:gdIfM5hTrZ79lwMz@anushri.dcyewix.mongodb.net/goa
   PORT=5000
   ```
   - The connection string is already configured in the server code

3. **Start the backend server:**
   Open a terminal and run:
   ```bash
   npm run server
   ```
   The server will start on `http://localhost:5000`

4. **Start the frontend development server:**
   Open another terminal and run:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

   **OR** run both together (if you have `concurrently` installed):
   ```bash
   npm run dev:all
   ```

## MongoDB Connection

The MongoDB connection string is configured in:
- **Backend:** `server/index.js` reads from `.env` file
- **Environment Variable:** `MONGODB_URI` in `.env` file

Make sure to:
1. Create a `.env` file in the root directory
2. Add your MongoDB connection string to the `.env` file
3. The database name is `goa` (as specified in the connection string)
4. Collections will be automatically created: `bookings` and `enquiries`

## API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Enquiries
- `GET /api/enquiries` - Get all enquiries
- `POST /api/enquiries` - Create new enquiry

## Build for Production

```bash
npm run build
```

## Technologies Used

- **Frontend:**
  - React 18
  - React Router DOM
  - Vite
  - CSS3

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Mongoose)
  - CORS
  - dotenv

## Package Pricing Logic

- Base price is calculated as: Package Price × Number of Persons
- Discount is applied: Base Price × Discount Percentage
- New Year Voucher (if applied): Additional ₹1,000 OFF
- Final Price = (Base Price - Discount) - Voucher Discount

## Validation

The booking form includes validation for:
- Name (required)
- Email (required, valid email format)
- Phone (required, 10 digits)
- Package selection (required)
- Number of persons (1-20)

## Troubleshooting

- **MongoDB Connection Error:** Make sure your `.env` file exists and contains the correct connection string
- **Server not running:** The frontend needs the backend server to be running on port 5000
- **CORS errors:** The backend is configured to allow CORS from the frontend

