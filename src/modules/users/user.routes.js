import { Router } from "express";
import { uploadProfilePic, fetchProfilePic } from "./user.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { updateProfilePicSchema } from "./user.schema.js";

const router = Router();

// Upload / update profile picture
router.post(
  "/profile-pic",
  protect,
  validate(updateProfilePicSchema),
  uploadProfilePic
);

// Get profile picture by user id
router.get(
  "/profile-pic/:id",
  protect,
  fetchProfilePic
);

export default router;
