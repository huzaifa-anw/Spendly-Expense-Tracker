import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRouter from './routes/auth.route.js';

dotenv.config()

connectDB();

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Spendly server is running on port ${PORT}`));