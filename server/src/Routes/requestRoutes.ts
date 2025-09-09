import { createRequest, getActiveRequests, getMyRequests } from "../Controllers/retailer/requestController";
import { authMiddleware } from "../middleware/authMiddleware";
import * as express from 'express';

const router = express.Router();
router.post("/", authMiddleware, createRequest);
router.get("/my", authMiddleware, getMyRequests);
router.get("/active", authMiddleware, getActiveRequests);

export default router;