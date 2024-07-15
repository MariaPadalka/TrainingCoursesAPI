import express from 'express';
import authController from '../controllers/auth.contr.js';
import { authenticateToken } from '../middleware/jwt.mddl.js';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authenticateToken, authController.logoutUser);
router.post('/refresh', authController.refreshTokens);
router.post(
    '/change-password',
    authenticateToken,
    authController.changePassword
);

export default router;
