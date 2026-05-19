// api/index.js  (VERCEL ENTRY)
import 'dotenv/config';

import app from '../src/app.js';
import connectDB from '../src/db.js';

await connectDB();

export default app;