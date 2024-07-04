import express from 'express';
import { handlePayment } from '../controllers/paymentController.js';
import { verifyToken } from '../controllers/authController.js';
const router = express.Router();

router.post('/',verifyToken, handlePayment);

export default router;
