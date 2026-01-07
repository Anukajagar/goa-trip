# MongoDB Atlas Setup Guide

## Step-by-Step Instructions to Connect Your Application

### Step 1: Log into MongoDB Atlas

1. Go to [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
2. Sign in with your MongoDB account
3. You should see your cluster: `anushri` (or similar)

---

### Step 2: Check Your Cluster Status

1. On the **Clusters** page, find your cluster
2. Check if it shows:
   - ✅ **"Running"** (green) - Good, proceed
   - ⏸️ **"Paused"** - Click **"Resume"** button to start it
   - ⚠️ **"Creating"** - Wait for it to finish

**Important:** Your cluster must be running for connections to work!

---

### Step 3: Configure Network Access (IP Whitelist) ⚠️ MOST IMPORTANT

This is usually the main reason connections fail!

1. Click **"Network Access"** in the left sidebar
2. You'll see a list of IP addresses
3. **For Development/Testing:**
   - Click **"Add IP Address"** button
   - Click **"Allow Access from Anywhere"** button
   - This adds `0.0.0.0/0` (allows all IPs)
   - Click **"Confirm"**

   **OR** for more security:
   - Click **"Add IP Address"**
   - Click **"Add Current IP Address"** (adds your current IP)
   - Click **"Confirm"**

4. **Wait 1-2 minutes** for changes to take effect

**Note:** If your IP is not whitelisted, MongoDB will reject all connection attempts!

---

### Step 4: Verify Database User

1. Click **"Database Access"** in the left sidebar
2. Find your user: `02fe23bcs084_db_user`
3. Check:
   - ✅ User exists
   - ✅ Password is correct: `gdIfM5hTrZ79lwMz`
   - ✅ User has proper permissions (read/write)

4. **If user doesn't exist or password is wrong:**
   - Click **"Add New Database User"**
   - Choose **"Password"** authentication
   - Username: `02fe23bcs084_db_user`
   - Password: `gdIfM5hTrZ79lwMz`
   - Database User Privileges: **"Atlas Admin"** or **"Read and write to any database"**
   - Click **"Add User"**

---

### Step 5: Get Your Connection String

1. Click **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. Copy the connection string

Your connection string should look like:
```
mongodb+srv://02fe23bcs084_db_user:<password>@anushri.dcyewix.mongodb.net/goa
```

**Note:** Replace `<password>` with your actual password: `gdIfM5hTrZ79lwMz`

Final string:
```
mongodb+srv://02fe23bcs084_db_user:gdIfM5hTrZ79lwMz@anushri.dcyewix.mongodb.net/goa
```

---

### Step 6: Verify Database Name

1. Click **"Database"** → **"Browse Collections"**
2. Your database should be: **`goa`**
3. If it doesn't exist, it will be created automatically when you first save data

---

### Step 7: Check Connection String Format

Your connection string format:
```
mongodb+srv://[username]:[password]@[cluster]/[database]
```

✅ **Correct Format:**
```
mongodb+srv://02fe23bcs084_db_user:gdIfM5hTrZ79lwMz@anushri.dcyewix.mongodb.net/goa
```

❌ **Common Mistakes:**
- Missing `mongodb+srv://` prefix
- Wrong username or password
- Missing `@` symbol
- Wrong cluster address
- Missing database name at the end

---

### Step 8: Test Connection from Atlas

1. Go to **"Database"** → **"Browse Collections"**
2. If you can see collections or create a new one, connection is working
3. Try creating a test document to verify write access

---

## Troubleshooting Checklist

### ✅ Check These First:

- [ ] **Cluster is running** (not paused)
- [ ] **IP address is whitelisted** (Network Access)
- [ ] **Database user exists** and password is correct
- [ ] **Connection string is correct** in `.env` file
- [ ] **Internet connection** is working
- [ ] **Firewall** is not blocking MongoDB (port 27017)

### Common Error Messages:

#### "IP not whitelisted"
**Solution:** Add your IP to Network Access (Step 3)

#### "Authentication failed"
**Solution:** Check username/password in Database Access (Step 4)

#### "Connection timeout"
**Solution:** 
- Check cluster is running
- Check IP whitelist
- Check internet connection

#### "Cluster not found"
**Solution:** Verify cluster name in connection string matches Atlas

---

## Quick Test Commands

### Test from your computer:

1. **Check if .env file exists:**
   ```bash
   type .env
   ```

2. **Verify connection:**
   ```bash
   node verify-connection.js
   ```

3. **Start server and check logs:**
   ```bash
   npm run server
   ```

   Look for:
   ```
   ✅ Connected to MongoDB successfully!
   ```

---

## MongoDB Atlas Dashboard Links

- **Clusters:** https://cloud.mongodb.com/v2#/clusters
- **Network Access:** https://cloud.mongodb.com/v2#/security/network/whitelist
- **Database Access:** https://cloud.mongodb.com/v2#/security/database/users
- **Database:** https://cloud.mongodb.com/v2#/clusters/detail/anushri/browse

---

## Still Having Issues?

1. **Check server console** for specific error messages
2. **Wait 2-3 minutes** after changing IP whitelist
3. **Try "Allow Access from Anywhere"** (0.0.0.0/0) temporarily for testing
4. **Verify** your `.env` file has the correct connection string
5. **Restart** your server after making changes

---

## Security Best Practices

⚠️ **For Production:**
- Don't use `0.0.0.0/0` (allows all IPs)
- Add specific IP addresses only
- Use strong passwords
- Enable MongoDB Atlas security features

✅ **For Development:**
- Using `0.0.0.0/0` is okay for testing
- Can use current IP address
- Can add multiple IPs if needed

---

## Need More Help?

1. Check MongoDB Atlas status page
2. Review MongoDB Atlas documentation
3. Check server error logs
4. Verify all steps above are completed

