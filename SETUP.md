# MongoDB Setup Instructions

## Step 1: Create .env File

Create a file named `.env` in the root directory of the project with the following content:

```
MONGODB_URI=mongodb+srv://02fe23bcs084_db_user:gdIfM5hTrZ79lwMz@anushri.dcyewix.mongodb.net/goa
PORT=5000
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Start the Backend Server

In one terminal window:
```bash
npm run server
```

You should see:
- ✅ Connected to MongoDB
- 🚀 Server running on port 5000

## Step 4: Start the Frontend

In another terminal window:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Alternative: Run Both Together

If you want to run both servers in one command:
```bash
npm run dev:all
```

## MongoDB Connection Details

- **Connection String:** Already configured in the code
- **Database Name:** `goa`
- **Collections:** 
  - `bookings` - Stores all booking data
  - `enquiries` - Stores all enquiry data

The MongoDB connection is handled in `server/index.js` which reads the `MONGODB_URI` from the `.env` file.

## Troubleshooting

1. **Cannot connect to MongoDB:**
   - Check your internet connection
   - Verify the connection string in `.env` is correct
   - Make sure MongoDB Atlas allows connections from your IP

2. **Server not starting:**
   - Make sure port 5000 is not already in use
   - Check that all dependencies are installed

3. **Frontend can't connect to backend:**
   - Ensure the backend server is running on port 5000
   - Check browser console for CORS errors

