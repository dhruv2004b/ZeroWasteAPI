import { ApiResponse } from "../../utils/ApiResponse.js";
import { createFoodRequest } from "./request.service.js";

export const createRequest = async (req, res, next) => {
  try {
    const request = await createFoodRequest(req.body, req.user.id);

    res.status(201).json(
      new ApiResponse(true, "Food request created successfully", {
        request_id: request._id,
        status: request.status
      })
    );
  } catch (error) {
    next(error);
  }
};
