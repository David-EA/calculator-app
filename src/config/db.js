import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import { logger } from '../utils/logger.js';

dotEnv.config();

const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            logger.info('MongoDB connected successfully')
        }).catch((error) => {
            logger.error('MongoDB connection failed:', error.message)
            process.exit(1)
        })
}

export default connectDB;