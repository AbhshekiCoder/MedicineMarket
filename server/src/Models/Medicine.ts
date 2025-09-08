import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
    },
    genericName: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    ndc: {
      type: String,
      unique: true,
      sparse: true, // allows multiple null values if NDC isn't always set
    },
    strength: {
      type: String,
    },
    dosageForm: {
      type: String,
    },
    packageSize: {
      type: String,
    },
    lastTradedPrice: {
      type: mongoose.Schema.Types.Decimal128, // handles precision 10, scale 2
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "medicines",
  }
);

// Compound unique index for (name + manufacturer)
medicineSchema.index(
  { name: 1, manufacturer: 1 },
  { unique: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
