import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../Models/User";
import * as dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || '123456';

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Debug log
    console.log("🔑 Incoming Token:", token);
    console.log("🔐 JWT_SECRET being used:", JWT_SECRET);

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    console.log("✅ Decoded Token Payload:", decoded);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err: any) {
    console.error("❌ JWT Verification Error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
