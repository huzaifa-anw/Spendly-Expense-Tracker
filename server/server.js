import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRouter from './routes/auth.routes.js';
import expensesRouter from './routes/expenses.routes.js';
import insightsRouter from './routes/insights.routes.js';
import logger from './middlewares/logger.middleware.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import cookieParser from 'cookie-parser';
import authenticate from './middlewares/auhenticate.middleware.js';
import { generalLimiter } from './middlewares/rateLimit.middleware.js';
import cors from 'cors';

dotenv.config()

connectDB();

const app = express();

var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(logger);

app.use(generalLimiter);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/expenses', expensesRouter);
app.use('/api/v1/insights', insightsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Spendly server is running on port ${PORT}`));