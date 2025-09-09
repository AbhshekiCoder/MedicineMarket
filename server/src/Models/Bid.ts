import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      index: true,
    },
    requestId: {
      type: mongoose.Schema.Types.String, // references medicineRequests.id (serial int)
      required: true,
      ref: "MedicineRequest",
    },
    distributorId: {
      type: mongoose.Schema.Types.String, // references users.id (UUID string)
      required: true,
      ref: "User",
    },
    pricePerUnit: {
      type: mongoose.Schema.Types.Decimal128, // numeric(10,2)
      required: true,
    },
    deliveryHours: {
      type: Number,
      required: true,
    },
    minQuantity: {
      type: Number,
      required: true,
    },
    distanceInMiles: {
      type: Number, // real in Postgres ~ float in Mongo
    },
    anonymousName: {
      type: String,
      required: true, // e.g. "Distributor Alpha"
    },
    status: {
      type: String,
      enum: ["active", "accepted", "rejected"],
      default: "active",
      required: true,
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "bids",
  }
);

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;
