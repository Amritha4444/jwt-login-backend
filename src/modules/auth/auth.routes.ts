import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);
router.get('/me', authMiddleware, AuthController.getMe);

export default router;