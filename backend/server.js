import http from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import pino from 'pino';
import pinoHttp from 'pino-http';

import connectDB from './config/db.js';
import { configureCloudinary } from './config/cloudinary.js';
import { openAIClient } from './config/openai.js';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';
import authRateLimiter from './middleware/rateLimiter.js';

import userRoutes from './routes/userRoutes.js';
import ideaRoutes from './routes/ideaRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

import './cron/weeklyTrendsJob.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
});

app.use(pinoHttp({
  logger,
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
        remoteAddress: req.remoteAddress
      };
    }
  }
}));

if (!process.env.JWT_SECRET) {
  logger.warn('JWT_SECRET is not set');
}

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/ai/analyze', authRateLimiter);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    mongoConnected: mongoose.connection.readyState === 1,
    openAIConfigured: Boolean(openAIClient)
  });
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/ideas', ideaRoutes);
app.use('/api/v1/ratings', ratingRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/ai', aiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    configureCloudinary();
    server.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error(error, 'Failed to start server');
    process.exit(1);
  }
};

startServer();

export default app;
