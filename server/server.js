import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config()

connectDB();

const app = express();

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Spendly server is running on port ${PORT}`));