import { createFoodDonation } from "./food.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const createFood = async (req, res, next) => {
  try {
    const food = await createFoodDonation(req.body, req.user.id);

    res.status(201).json(
      new ApiResponse(true, "Food donation created successfully", {
        food_id: food._id,
        status: food.status
      })
    );
  } catch (error) {
    next(error);
  }
};
