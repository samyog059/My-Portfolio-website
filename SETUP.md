# Portfolio Backend Setup Guide

## Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or cloud) - [Download](https://www.mongodb.com/try/download/community)

## Installation Steps

### 1. Install Node.js Dependencies
```bash
cd c:\Users\Dell\My-Portfolio-website
npm install
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
- Install MongoDB Community Edition
- Start MongoDB service:
  ```bash
  # Windows
  net start MongoDB
  
  # Or start mongod manually
  mongod
  ```

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

### 3. Start the Backend Server
```bash
npm start
```

Or for development (auto-reload):
```bash
npm run dev
```

Expected output:
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
✓ API endpoint: http://localhost:5000/api/contact
```

### 4. Test the Form
1. Open your portfolio website in browser
2. Fill out the contact form
3. Submit - message should be saved to MongoDB

## File Structure
```
My-Portfolio-website/
├── index.html
├── style.css
├── script.js
├── server.js           (NEW - Node.js backend)
├── package.json        (NEW - Dependencies)
├── .env               (NEW - Configuration)
└── .gitignore         (NEW - Git ignore)
```

## API Endpoints

### POST /api/contact
Submit a contact form message
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in..."
}
```

Response:
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "data": { /* message object */ }
}
```

### GET /api/messages
Get all messages (admin)
```bash
curl http://localhost:5000/api/messages
```

### PATCH /api/messages/:id
Update message status
```bash
curl -X PATCH http://localhost:5000/api/messages/[id] \
  -H "Content-Type: application/json" \
  -d '{"status": "read"}'
```

### DELETE /api/messages/:id
Delete a message
```bash
curl -X DELETE http://localhost:5000/api/messages/[id]
```

## Environment Variables (.env)

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/portfolio

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

## Troubleshooting

### "MongoDB connection error"
- Make sure MongoDB is running: `mongod`
- Check MONGODB_URI in .env file
- Verify connection string format

### "Cannot find module"
```bash
npm install
```

### "Port 5000 already in use"
Change PORT in .env file or kill the process using port 5000

### CORS Error
The server is configured for localhost. For production, update CORS settings in server.js:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

## Deployment

### Deploy on Heroku:
1. Add Procfile: `echo "web: npm start" > Procfile`
2. Connect MongoDB Atlas (cloud database)
3. Push to Heroku

### Deploy on Railway/Render:
1. Connect GitHub repo
2. Add MONGODB_URI environment variable
3. Deploy

## Next Steps
- Add email notifications when form is submitted
- Create admin dashboard to view messages
- Add message status tracking
- Set up automated responses
