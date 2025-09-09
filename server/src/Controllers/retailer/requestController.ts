import { Response } from "express";
import { AuthRequest } from '../../middleware/authMiddleware'
import  MedicineRequest  from "../../Models/MedicineRequest";
import * as jwt from "jsonwebtoken";
import type { JwtPayload }  from "jsonwebtoken";
export const createRequest = async (req: AuthRequest, res: Response) => {

  const JWT_SECRET = process.env.JWT_SECRET || "123456";

  const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
   
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
   
  const request = new MedicineRequest({ ...req.body, retailerId: decoded.id});
  await request.save();
  res.status(201).json(request);
};

export const getMyRequests = async (req: AuthRequest, res: Response) => {
  
  const JWT_SECRET = process.env.JWT_SECRET || "123456";

  const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
   
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  const requests = await MedicineRequest.find({ retailerId: decoded.id });
  res.status(200).json(requests)
  
};

export const getActiveRequests = async (req: AuthRequest, res: Response) => {
  const requests = await MedicineRequest.find({ status: "active" });
  res.json(requests);
};
