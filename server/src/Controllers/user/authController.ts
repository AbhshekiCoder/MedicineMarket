import { Request, Response } from "express";
import * as bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";
import User from "../../Models/User";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

interface UserPayload {
  _id: string;

}

const generateToken = (user: UserPayload): string => {
  return jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: "1hr" }
  );
};

// Signup
export const signup = async (req: Request, res: Response) => {
  try {
    
    const { firstName, profileImageUrl, userType, companyName, location, latitude, longitude, email, password } = req.body;
   

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ firstName, profileImageUrl, userType, companyName, location, latitude, longitude,  email, password: hashedPassword });
    await user.save();

    
    res.status(201).json({
      message: "User registered successfully",
     
    });
    
  } catch (err) {
    if(err instanceof Error){
    console.log(err)
    res.status(500).json({ error: err.message });
    }
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken({ _id: user._id.toString() });

    res.json({
      message: "Login successful",
      user: { 
        id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email, 
        userType: user.userType 
      },
      token,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get Current User
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const id = jwt.decode(token as string) as {id: string};
    const result = await User.findById(id.id).select("-passwordHash");
    if(result){
        res.json(result);
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Logout
export const logout = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: "Logged out successfully" });
};
