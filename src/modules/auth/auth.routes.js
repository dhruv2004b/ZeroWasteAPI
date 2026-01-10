import { Router } from "express";
import { register } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { registerSchema } from "./auth.schema.js";
import { registerLimiter } from "../../middlewares/ratelimit.middleware.js";
import { login } from "./auth.controller.js";
import { loginSchema } from "./auth.schema.js";

const router = Router();

router.post("/register",registerLimiter, validate(registerSchema), register);

router.post(
  "/login",
  validate(loginSchema),
  login
);


export default router;
