import { ApiResponse } from "../../utils/ApiResponse.js";
import { updateProfilePic, getProfilePic } from "./user.service.js";

export const uploadProfilePic = async (req, res, next) => {
  try {
    await updateProfilePic(req.user.id, req.body.profilePic);

    res.status(200).json(
      new ApiResponse(true, "Profile picture updated successfully")
    );
  } catch (error) {
    next(error);
  }
};

export const fetchProfilePic = async (req, res, next) => {
  try {
    const user = await getProfilePic(req.params.id);

    res.status(200).json(
      new ApiResponse(true, "Profile picture fetched successfully", {
        profilePic: user.profilePic,
        userType: user.userType
      })
    );
  } catch (error) {
    next(error);
  }
};
