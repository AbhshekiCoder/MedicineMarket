import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import Bid  from "../../Models/Bid";
import  Order  from "../../Models/Order";
import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

  const JWT_SECRET = process.env.JWT_SECRET || "123456";

  
   
export const submitBid = async (req: AuthRequest, res: Response) => {
  const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
   
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

  const bid = new Bid({ ...req.body, distributorId: decoded.id });
  await bid.save();
  res.status(201).json(bid);
};

export const getBidsForRequest = async (req: AuthRequest, res: Response) => {
  const bids = await Bid.find({ requestId: req.params.requestId });
  res.json(bids);
};

export const acceptBid = async (req: AuthRequest, res: Response) => {
  const bid = await Bid.findById(req.params.bidId);
  if (!bid) return res.status(404).json({ message: "Bid not found" });

  bid.status = "accepted";
  await bid.save();

  const order = new Order({
    bidId: bid._id,
    retailerId: req.user.id,
    distributorId: bid.distributorId,
    medicineId: bid.requestId,
    quantity: bid.minQuantity,
    pricePerUnit: bid.pricePerUnit,
    totalPrice: bid.minQuantity * Number(bid.pricePerUnit),
    deliveryHours: bid.deliveryHours,
  });
  await order.save();

  res.json({ message: "Bid accepted", order });
};
