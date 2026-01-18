import { z } from "zod";

export const createFoodSchema = z.object({
  foodType: z.enum(["veg", "non-veg"]),
  quantity: z.number().min(1, "Minimum quantity is 1"),
  feedTo: z.enum(["humans", "animals", "both"]),
  expiryTime: z.number().min(60, "Expiry must be at least 60 minutes")
});
