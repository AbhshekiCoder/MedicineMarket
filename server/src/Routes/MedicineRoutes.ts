import { getMedicine, searchMedicines, seedMedicines } from "../Controllers/user/medicineController";
import * as express from 'express';

const router = express.Router();
// Medicines
router.get("/search", searchMedicines);
router.get("/:id", getMedicine);
router.post("/seed", seedMedicines);

export default router;