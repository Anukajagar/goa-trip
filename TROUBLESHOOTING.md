# Troubleshooting MongoDB Connection Issues

## Error: "Operation `bookings.insertOne()` buffering timed out after 10000ms"

This error occurs when MongoDB cannot establish a connection. Here are the steps to fix it:

### Step 1: Verify .env File

Make sure you have a `.env` file in the root directory with:

```
MONGODB_URI=mongodb+srv://02fe23bcs084_db_user:gdIfM5hTrZ79lwMz@anushri.dcyewix.mongodb.net/goa
PORT=5000
```

### Step 2: Check MongoDB Atlas IP Whitelist

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to your cluster
3. Click on "Network Access" in the left sidebar
4. Click "Add IP Address"
5. For development, add `0.0.0.0/0` (allows all IPs) OR add your current IP address
6. Click "Confirm"

**Important:** If your IP is not whitelisted, MongoDB will reject the connection.

### Step 3: Verify Connection String

Check that your connection string format is correct:
```
mongodb+srv://username:password@cluster.mongodb.net/database
```

Make sure:
- Username and password are correct
- No special characters need URL encoding
- Database name is correct (in this case: `goa`)

### Step 4: Check Internet Connection

- Ensure you have an active internet connection
- Some corporate networks/firewalls may block MongoDB connections
- Try using a different network (mobile hotspot) to test

### Step 5: Verify Server is Running

1. Make sure the backend server is running:
   ```bash
   npm run server
   ```

2. You should see:
   ```
   ✅ Connected to MongoDB successfully!
   🚀 Server running on port 5000
   ```

3. If you see connection errors, check the error messages

### Step 6: Test Connection

Test the connection by visiting:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected",
  "readyState": 1
}
```

If `readyState` is not `1`, the database is not connected.

### Step 7: Check MongoDB Atlas Cluster Status

1. Go to MongoDB Atlas dashboard
2. Check if your cluster is running (not paused)
3. If paused, click "Resume" to start it

### Step 8: Common Issues

#### Issue: Connection times out
**Solution:** 
- Increase timeout in `server/index.js` (already set to 30 seconds)
- Check firewall settings
- Verify IP whitelist

#### Issue: Authentication failed
**Solution:**
- Verify username and password in connection string
- Check if database user has proper permissions
- Ensure password doesn't contain special characters that need encoding

#### Issue: Network error
**Solution:**
- Check internet connection
- Try different network
- Verify MongoDB Atlas is accessible from your location

### Step 9: Enable Debugging

If issues persist, you can enable MongoDB debug logging:

1. In `server/index.js`, add before `mongoose.connect`:
   ```javascript
   mongoose.set('debug', true);
   ```

2. This will show detailed connection logs

### Step 10: Alternative: Use Local MongoDB

If Atlas continues to have issues, you can use a local MongoDB instance:

1. Install MongoDB locally
2. Update `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/goa
   ```

## Still Having Issues?

1. Check server console for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure Node.js and npm are up to date
4. Try restarting the server after making changes

## Connection States

- `0` = disconnected
- `1` = connected
- `2` = connecting
- `3` = disconnecting

The server will only accept requests when state is `1` (connected).

