import { Response } from "express";
import { AuthRequest } from '../../middleware/authMiddleware'
import  MedicineRequest  from "../../Models/MedicineRequest";

export const createRequest = async (req: AuthRequest, res: Response) => {
  const request = new MedicineRequest({ ...req.body, retailerId: req.user.id });
  await request.save();
  res.status(201).json(request);
};

export const getMyRequests = async (req: AuthRequest, res: Response) => {
  const requests = await MedicineRequest.find({ retailerId: req.user.id });
  res.json(requests);
};

export const getActiveRequests = async (req: AuthRequest, res: Response) => {
  const requests = await MedicineRequest.find({ status: "active" });
  res.json(requests);
};
