import bcrypt from "bcryptjs";
import { User } from "./auth.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const registerUser = async (data) => {
  // 🔍 Check if user already exists (email OR mobile)
  const existingUser = await User.findOne({
    $or: [
      { email: data.email },
      { mobile: data.mobile }
    ]
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // 🔐 Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword
  });

  return user;
};


export const loginUser = async ({ identifier, password, userType }) => {
  const query = identifier.includes("@")
    ? { email: identifier.toLowerCase() }
    : { mobile: identifier };

  const user = await User.findOne(query).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (user.userType !== userType) {
    throw new ApiError(403, "User type mismatch");
  }

  if (user.status && user.status !== "active") {
    throw new ApiError(403, "Account blocked");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  return user;
};

