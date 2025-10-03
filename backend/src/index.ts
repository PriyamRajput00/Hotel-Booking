import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// CRITICAL: Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if the environment variable is defined before attempting to connect
if (!process.env.MONGO_CONNECTION_STRING) {
    throw new Error("MONGO_CONNECTION_STRING environment variable must be defined.");
}

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
console.log('Auth routes mounted at /api/auth');
app.use('/api/users', userRoutes);
console.log('User routes mounted at /api/users');

app.listen(8000, () => {
    console.log("Server is running on localhost:8000");
});
