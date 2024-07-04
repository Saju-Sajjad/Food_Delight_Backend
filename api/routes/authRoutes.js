import express from 'express';
import { signup, login, verifyToken, logout, refreshToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-token', verifyToken);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

export default router;
