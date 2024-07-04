import express from "express";
import { getMenuItems, createMenuItem, deleteMenuItem, addToCart, removeFromCart } from "../controllers/menuController.js";
import { verifyToken } from '../controllers/authController.js';

const router = express.Router();

router.post("/", verifyToken, createMenuItem);
router.get("/", verifyToken, getMenuItems);
router.delete("/:id", verifyToken, deleteMenuItem);

// Cart operations
router.post("/cart", verifyToken, addToCart);
router.delete("/cart/:cartItemId", verifyToken, removeFromCart);

export default router;
