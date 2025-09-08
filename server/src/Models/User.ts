import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(), // acts like UUID
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["retailer", "distributor"],
      default: "retailer",
      required: true,
    },
    companyName: {
      type: String,
    },
    location: {
      type: String, // ZIP code or city
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

export default User;
