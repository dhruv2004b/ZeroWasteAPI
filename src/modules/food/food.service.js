import { Food } from "./food.model.js";

export const createFoodDonation = async (data, donorId) => {
  const expiryAt = new Date(
  Date.now() + data.expiryTime * 60 * 60 * 1000
);


  const food = await Food.create({
    donorId,
    foodType: data.foodType,
    quantity: data.quantity,
    feedTo: data.feedTo,
    expiryAt,
    location: {
      address: data.location.address,
      coordinates: {
        type: "Point",
        coordinates: data.location.coordinates.coordinates
      }
    }
  });

  return food;
};
