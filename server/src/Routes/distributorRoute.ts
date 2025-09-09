import { acceptBid, getBidsForRequest, submitBid } from "../Controllers/distributor/bidController";
import { authMiddleware } from "../middleware/authMiddleware";
import * as express from 'express';

const router = express.Router();

router.post("/", authMiddleware, submitBid);
router.get("/:requestId", authMiddleware, getBidsForRequest);
router.post("/:bidId/accept", authMiddleware, acceptBid);

export default router;