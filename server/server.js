import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import movieRoutes from './routes/movies.js';
import uploadRoutes from './routes/upload.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection logic for serverless
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected!');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
};

// Middleware to ensure DB is connected before handling requests
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('API is running.');
});
app.use('/api/movies', movieRoutes);
app.use('/api/upload', uploadRoutes);

// Only start the server if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
    );
}

export default app;