import 'dotenv/config'; 

import express from 'express';
import mongoose from 'mongoose';

import cors from 'cors';





const app = express();
app.use(cors());
app.use(express.json());

import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';


// Middleware routes
app.get('/', (req, res) => {
  res.send('JobTrackr API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/reminders', reminderRoutes);


// Connect to MongoDB and start server
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

export default app; 