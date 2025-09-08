import mongoose from "mongoose";

const distributorInventorySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      index: true,
    },
    distributorId: {
      type: mongoose.Schema.Types.String, // referencing users.id (UUID string)
      required: true,
      ref: "User", // reference to users collection
    },
    medicineId: {
      type: mongoose.Schema.Types.Number, // referencing medicines.id (serial int)
      required: true,
      ref: "Medicine",
    },
    // Original values from Excel sheet - preserved exactly as uploaded
    originalCode: {
      type: String,
      maxlength: 100,
    },
    originalProductName: {
      type: String,
      maxlength: 500,
    },
    originalCompanyName: {
      type: String,
      maxlength: 200,
    },
    currentStock: {
      type: Number,
      required: true,
      default: 0,
    },
    salesPrice: {
      type: mongoose.Schema.Types.Decimal128, // precision 10, scale 2
    },
  },
  {
    timestamps: {
      createdAt: "uploadedAt", // maps to uploaded_at
      updatedAt: "updatedAt",
    },
    collection: "distributor_inventory",
  }
);

// Compound unique index for (distributorId + medicineId)
distributorInventorySchema.index(
  { distributorId: 1, medicineId: 1 },
  { unique: true }
);

const DistributorInventory = mongoose.model(
  "DistributorInventory",
  distributorInventorySchema
);

export default DistributorInventory;
