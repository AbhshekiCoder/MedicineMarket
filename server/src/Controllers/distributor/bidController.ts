import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import Bid  from "../../Models/Bid";
import  Order  from "../../Models/Order";

export const submitBid = async (req: AuthRequest, res: Response) => {
  const bid = new Bid({ ...req.body, distributorId: req.user.id });
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
