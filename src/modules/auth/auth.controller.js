import { registerUser } from "./auth.service.js";
import { generateToken } from "../../utils/generateToken.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { loginUser } from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    const token = generateToken(user._id);

    res.status(201).json(
      new ApiResponse(true, "User registered successfully", {
        token,
        user_type: user.userType
      })
    );
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);

    const token = generateToken(user._id);

    res.status(200).json(
      new ApiResponse(true, "Login successful", {
        token,
        user_id: user._id,
        user_type: user.userType
      })
    );
  } catch (error) {
    next(error);
  }
};

