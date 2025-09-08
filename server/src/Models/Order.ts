import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      index: true,
    },
    bidId: {
      type: mongoose.Schema.Types.Number, // references bids.id (serial int)
      required: true,
      ref: "Bid",
    },
    retailerId: {
      type: mongoose.Schema.Types.String, // references users.id (UUID string)
      required: true,
      ref: "User",
    },
    distributorId: {
      type: mongoose.Schema.Types.String, // references users.id (UUID string)
      required: true,
      ref: "User",
    },
    medicineId: {
      type: mongoose.Schema.Types.Number, // references medicines.id (serial int)
      required: true,
      ref: "Medicine",
    },
    quantity: {
      type: Number,
      required: true,
    },
    pricePerUnit: {
      type: mongoose.Schema.Types.Decimal128, // numeric(10,2)
      required: true,
    },
    totalPrice: {
      type: mongoose.Schema.Types.Decimal128, // numeric(10,2)
      required: true,
    },
    deliveryHours: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["confirm", "packed", "in_transit", "delivered"],
      default: "confirm",
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
    collection: "orders",
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
