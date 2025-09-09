import mongoose from "mongoose";

const medicineRequestSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      index: true,
    },
    retailerId: {
      type: mongoose.Schema.Types.String, // users.id is UUID string
      required: true,
      ref: "User",
    },
    medicineId: {
      type: mongoose.Schema.Types.String, // medicines.id is serial int
      required: true,
      ref: "Medicine",
    },
    quantity: {
      type: Number,
      required: true,
    },
    maxPricePerUnit: {
      type: mongoose.Schema.Types.Decimal128, // precision 10, scale 2
    },
    deliveryTimelineHours: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "medicine_requests",
  }
);

const MedicineRequest = mongoose.model(
  "MedicineRequest",
  medicineRequestSchema
);

export default MedicineRequest;
