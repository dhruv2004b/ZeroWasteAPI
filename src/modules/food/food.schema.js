import { z } from "zod";

export const createFoodSchema = z.object({
  foodType: z.enum(["veg", "non-veg"]),
  quantity: z.number().min(1),
  feedTo: z.enum(["humans", "animals", "both"]),
  expiryTime: z
  .number()
  .int("Expiry time must be a whole number")
  .min(1, "Expiry time must be at least 1 hour")
  .max(24, "Expiry time cannot exceed 24 hours"),


  location: z.object({
    address: z.object({
      plotNo: z.string().min(1),
      street: z.string().min(1),
      landmark: z.string().optional(),
      area: z.string().min(1),
      pincode: z.string().regex(/^[0-9]{6}$/, "Invalid pincode"),
      city: z.string().min(1),
      state: z.string().min(1),
      country: z.string().min(1)
    }),

    coordinates: z.object({
      coordinates: z
        .array(z.number())
        .length(2, "Coordinates must be [longitude, latitude]")
    })
  })
});
