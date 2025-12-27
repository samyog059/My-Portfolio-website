require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Parse JSON bodies
app.use(express.json());

// CORS: allow specific origins if provided, otherwise allow all (useful for local dev)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : '*',
  })
);

// Mongo connection
mongoose.set('strictQuery', true);
const connectMongo = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
};

connectMongo().catch(err => {
  console.error('Mongo connection error:', err.message);
  process.exit(1);
});

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Contact = mongoose.model('Contact', contactSchema);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    await Contact.create({ name, email, subject, message });
    return res.status(201).json({ success: true, message: 'Message saved.' });
  } catch (err) {
    console.error('Failed to save contact:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to save message.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
