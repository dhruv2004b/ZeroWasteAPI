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
      enum: ["available", "accepted", "claimed", "expired"],
      default: "available"
    },

    location: {
      address: {
        plotNo: { type: String, required: true },
        street: { type: String, required: true },
        landmark: { type: String },
        area: { type: String, required: true },
        pincode: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true }
      },

      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point"
        },
        coordinates: {
          type: [Number], // [lng, lat]
          required: true
        }
      }
    }
  },
  { timestamps: true }
);

// 🔥 Enable geo queries
foodSchema.index({ "location.coordinates": "2dsphere" });

export const Food = mongoose.model("Food", foodSchema);
