import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import  Order  from "../../Models/Order";

export const getOrders = async (req: AuthRequest, res: Response) => {
  const orders = await Order.find({
    $or: [{ retailerId: req.user.id }, { distributorId: req.user.id }],
  });
  res.json(orders);
};
