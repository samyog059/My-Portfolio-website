# Deployment Guide - Portfolio Backend to Cloud

## 🌍 Quick Deployment on Render.com (Recommended)

### Step 1: Prepare Your Code
1. Push your project to GitHub
```bash
git init
git add .
git commit -m "Add Node.js backend"
git push origin main
```

### Step 2: Set Up MongoDB Atlas
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create Free Account
3. Create a **Free Cluster**
4. Go to **Security** → **Database Access** → Create user
5. Go to **Network Access** → Add your IP (or 0.0.0.0/0 for anywhere)
6. Get Connection String:
   - Click **Connect** → **Connection String**
   - Copy: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/...`

### Step 3: Deploy on Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **New +** → **Web Service**
4. Select your GitHub repo
5. Fill in details:
   - **Name**: portfolio-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add **Environment Variable**:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
7. Click **Deploy**

### Step 4: Get Your Live Backend URL
After deployment, Render gives you a URL like:
```
https://portfolio-backend-xxxxx.onrender.com
```

### Step 5: Update Your Frontend
Update `script.js` line 29:
```javascript
fetch("https://portfolio-backend-xxxxx.onrender.com/api/contact", {
```

### Step 6: Deploy Your Frontend
If hosted on:
- **GitHub Pages**: Push changes to repo
- **Netlify**: Connect and redeploy
- **Vercel**: Push changes to repo
- **Any host**: Upload new files

## ✅ Test Your Live Setup
1. Go to your live portfolio website
2. Fill out contact form
3. Submit
4. Should show ✓ Message sent successfully!
5. Check messages at: `https://portfolio-backend-xxxxx.onrender.com/api/messages`

## 📋 File Checklist
- [x] server.js - Backend code
- [x] package.json - Dependencies
- [x] .env - Environment variables (update MONGODB_URI)
- [x] script.js - Frontend (update fetch URL)

## 🔧 Troubleshooting

### "Cannot connect to database"
- Check MONGODB_URI is correct
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check database user password

### "CORS Error"
Add to server.js line 12:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

### "502 Bad Gateway"
- Check logs on Render dashboard
- Make sure PORT is set to 5000 or use `process.env.PORT`

## 💰 Costs
- **Render.com**: Free tier (limited)
- **MongoDB Atlas**: Free tier (512MB storage, plenty for forms)
- **GitHub Pages/Netlify**: Free hosting

## 🚀 Production Tips
1. Use environment variables for sensitive data
2. Add input validation on backend
3. Add rate limiting to prevent spam
4. Set up email notifications
5. Monitor logs regularly

## Alternative Hosting Options
- **Railway**: railway.app (free tier)
- **Heroku**: heroku.com (paid - free tier ended)
- **AWS**: aws.amazon.com (1 year free)
- **Google Cloud**: cloud.google.com (free credits)
