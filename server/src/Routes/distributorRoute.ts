import { acceptBid, getBidsForRequest, submitBid } from "../Controllers/distributor/bidController";
import { authMiddleware } from "../middleware/authMiddleware";
import * as express from 'express';

const router = express.Router();

router.post("/bids", authMiddleware, submitBid);
router.get("/bids/:requestId", authMiddleware, getBidsForRequest);
router.post("/bids/:bidId/accept", authMiddleware, acceptBid);

export default router;