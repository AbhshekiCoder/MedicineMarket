import { getOrders } from "../Controllers/user/orderController";
import { authMiddleware } from "../middleware/authMiddleware";
import * as express from 'express';

const router = express.Router();

router.get("/orders", authMiddleware, getOrders);

export default router;

