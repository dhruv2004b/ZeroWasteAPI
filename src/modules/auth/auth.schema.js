import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long"),

  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),

  userType: z.enum(["donor", "receiver", "volunteer"], {
    errorMap: () => ({ message: "Invalid user type" })
  }),

  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
});


export const loginSchema = z.object({
  identifier: z
    .string()
    .min(3, "Email or mobile is required"),

  password: z
    .string()
    .min(6, "Password is required"),

  userType: z.enum(["donor", "receiver", "volunteer"], {
    errorMap: () => ({ message: "Invalid user type" })
  })
});
