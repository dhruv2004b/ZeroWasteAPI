import { ApiError } from "../utils/ApiError.js";
import { User } from "../modules/auth/auth.model.js";

export const donorOnly = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user || user.userType !== "donor") {
    throw new ApiError(403, "Only donors can perform this action");
  }

  next();
};
