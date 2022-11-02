import { Router } from 'express';
import { AuthController } from '../controllers/Auth.controller.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', checkAuth, AuthController.getMe);

export default router;
