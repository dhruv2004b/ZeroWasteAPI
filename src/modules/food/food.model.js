import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    foodType: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    feedTo: {
      type: String,
      enum: ["humans", "animals", "both"],
      required: true
    },

    expiryAt: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["available", "claimed", "expired"],
      default: "available"
    }
  },
  { timestamps: true }
);

export const Food = mongoose.model("Food", foodSchema);
