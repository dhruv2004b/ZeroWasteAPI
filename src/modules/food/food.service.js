import { Food } from "./food.model.js";

export const createFoodDonation = async (data, donorId) => {
  const expiryAt = new Date(Date.now() + data.expiryTime * 60000);

  const food = await Food.create({
    donorId,
    foodType: data.foodType,
    quantity: data.quantity,
    feedTo: data.feedTo,
    expiryAt
  });

  return food;
};
