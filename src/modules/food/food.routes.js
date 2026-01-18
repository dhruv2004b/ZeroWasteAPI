import { Router } from "express";
import { createFood } from "./food.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createFoodSchema } from "./food.schema.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { donorOnly } from "../../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/",
  protect,
  donorOnly,
  validate(createFoodSchema),
  createFood
);

export default router;
