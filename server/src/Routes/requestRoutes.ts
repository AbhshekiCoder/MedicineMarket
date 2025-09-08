import { createRequest, getActiveRequests, getMyRequests } from "../Controllers/retailer/requestController";
import { authMiddleware } from "../middleware/authMiddleware";
import * as express from 'express';

const router = express.Router();
router.post("/requests", authMiddleware, createRequest);
router.get("/requests/my", authMiddleware, getMyRequests);
router.get("/requests/active", authMiddleware, getActiveRequests);

export default router;