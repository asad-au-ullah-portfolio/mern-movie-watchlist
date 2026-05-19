// src/app.js
import express from 'express';
import cors from 'cors';

import movieRoutes from './routes/movies.js';
import uploadRoutes from './routes/upload.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running.');
});
app.use('/api/movies', movieRoutes);
app.use('/api/upload', uploadRoutes);

export default app;