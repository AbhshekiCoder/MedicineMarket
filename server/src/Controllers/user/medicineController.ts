import { Request, Response } from "express";
import  Medicine  from "../../Models/Medicine";

export const searchMedicines = async (req: Request, res: Response) => {
  const q = req.query.q as string;
  const medicines = await Medicine.find({ name: { $regex: q, $options: "i" } });
  res.json(medicines);
};

export const getMedicine = async (req: Request, res: Response) => {
  const medicine = await Medicine.findById(req.params.id);
  if (!medicine) return res.status(404).json({ message: "Medicine not found" });
  res.json(medicine);
};

export const seedMedicines = async (req: Request, res: Response) => {
 
  await Medicine.insertMany(req.body);
  res.json({ message: "Medicines seeded successfully" });
};
