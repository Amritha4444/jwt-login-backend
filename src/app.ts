import express from 'express';
import cors from 'cors';

import { env } from './config/env';
import authRoutes from './modules/auth/auth.routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

app.use(
  cors({
    origin: env.allowedOrigins.split(',').map((origin) => origin.trim())
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(errorMiddleware);

export default app;