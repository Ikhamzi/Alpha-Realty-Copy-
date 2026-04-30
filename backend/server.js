import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import referralRoutes from './routes/referrals.js';
import partnerRoutes from './routes/partners.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173' || 'https://alpha-realty.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']

}));
app.use(express.json({ limit: '10mb' }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Alpha Realty Backend API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/partners', partnerRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

export default app;


