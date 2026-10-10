import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { env } from './config/env';
import authRoutes from './modules/auth/auth.routes';
import { errorMiddleware } from './middleware/error.middleware';
import swaggerSpec from './core/swagger/swagger.config';

const app = express();

app.use(
  cors({
    origin: env.allowedOrigins.split(',').map((origin) => origin.trim())
  })
);

app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Authentication APIs
app.use('/api/auth', authRoutes);

// Centralized error handling
app.use(errorMiddleware);

export default app;