import { User } from "../auth/auth.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const updateProfilePic = async (userId, profilePic) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.profilePic = profilePic;
  await user.save();

  return true;
};

export const getProfilePic = async (userId) => {
  const user = await User.findById(userId).select("profilePic userType");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};
