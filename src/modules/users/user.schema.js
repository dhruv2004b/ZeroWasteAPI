import { z } from "zod";

export const updateProfilePicSchema = z.object({
  profilePic: z
    .string()
    .min(1, "Profile picture is required")
});


