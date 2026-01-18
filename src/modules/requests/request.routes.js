import { Router } from "express";
import { createRequest } from "./request.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createRequestSchema } from "./request.schema.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../auth/auth.model.js";

const router = Router();

// Receiver-only middleware
const receiverOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.userType !== "receiver") {
      return next(
        new ApiError(403, "Only receivers can create food requests")
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

router.post(
  "/",
  protect,
  receiverOnly,
  validate(createRequestSchema),
  createRequest
);

export default router;
