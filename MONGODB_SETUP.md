# MongoDB Atlas Setup Guide

## Step 1: Configure MongoDB Atlas Network Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in to your account
3. Select your project
4. Click **"Network Access"** in the left sidebar (under Security)
5. Click **"Add IP Address"** button
6. Click **"Allow Access from Anywhere"**
   - This will add `0.0.0.0/0` (required for Render.com)
7. Click **"Confirm"**

## Step 2: Create Database User

1. Click **"Database Access"** in the left sidebar (under Security)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Enter username: `portfolioUser` (or any username you prefer)
5. Click **"Autogenerate Secure Password"** or create your own
6. **IMPORTANT:** Copy and save this password immediately!
7. Under "Database User Privileges", select **"Read and write to any database"**
8. Click **"Add User"**

## Step 3: Get Your Connection String

1. Click **"Database"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Choose **Driver: Node.js** and **Version: 5.5 or later**
5. Copy the connection string - it will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace `<username>` with your database username**
7. **Replace `<password>` with your database password**
8. **Add database name after `.net/`** - change to:
   ```
   mongodb+srv://portfolioUser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

## Step 4: Update Local .env File

1. Open `.env` file in your project
2. Replace the MONGODB_URI with your actual connection string:
   ```
   MONGODB_URI=mongodb+srv://portfolioUser:YOUR_ACTUAL_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

## Step 5: Set Environment Variable in Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Find your backend service
3. Click on your service name
4. Go to **"Environment"** tab in the left sidebar
5. Click **"Add Environment Variable"**
6. Set:
   - **Key:** `MONGODB_URI`
   - **Value:** Your full connection string (paste it here)
7. Click **"Save Changes"**
8. Render will automatically redeploy your service

## Step 6: Verify Connection

After Render redeploys (takes 2-3 minutes):

1. Check Render logs:
   - Go to your service in Render Dashboard
   - Click **"Logs"** tab
   - Look for: `✓ MongoDB connected successfully`

2. Test the API endpoint:
   - Open: `https://my-portfolio-website-wbz1.onrender.com/api/messages`
   - You should see: `{"success": true, "count": 0, "data": []}`

3. Test contact form submission:
   - Go to your portfolio: `samyogpangeni.com.np`
   - Fill out and submit the contact form
   - Check if you get success message

## Common Issues

### Issue: "MongoNetworkError: failed to connect"
**Solution:** Make sure you added `0.0.0.0/0` to Network Access in Atlas

### Issue: "Authentication failed"
**Solution:** Double-check your username and password in the connection string. Make sure special characters in password are URL-encoded:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `^` → `%5E`
- `&` → `%26`

### Issue: "Connection timeout"
**Solution:** 
- Verify Network Access allows `0.0.0.0/0`
- Check if cluster is active (not paused)
- Wait 2-3 minutes after making changes

## Quick Test Commands

### Test locally:
```bash
node server.js
```

### Test production API:
```bash
curl https://my-portfolio-website-wbz1.onrender.com/api/messages
```

## Need Help?

If you're still having issues:
1. Share the error message from Render logs
2. Verify your connection string format (without password)
3. Confirm Network Access shows `0.0.0.0/0`
