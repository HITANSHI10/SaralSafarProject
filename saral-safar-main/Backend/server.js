import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js'; // Your authentication routes
import busRouter from './routes/busRoutes.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRouter); // Authentication routes
app.use('/api/bus', busRouter);

// Test route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
