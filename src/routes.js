import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import foodRoutes from "./modules/food/food.routes.js";
import userRoutes from "./modules/users/user.routes.js";


const router = Router();

router.use("/auth", authRoutes);
router.use("/food", foodRoutes);
router.use("/users", userRoutes);

export default router;
