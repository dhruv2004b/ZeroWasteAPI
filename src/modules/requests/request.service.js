import { FoodRequest } from "./request.model.js";

export const createFoodRequest = async (data, receiverId) => {
  const validTill = new Date(
    Date.now() + data.validForHours * 60 * 60 * 1000
  );

  const request = await FoodRequest.create({
    receiverId,
    foodType: data.foodType,
    quantity: data.quantity,
    feedTo: data.feedTo,
    validTill,
    location: {
      address: data.location.address,
      coordinates: {
        type: "Point",
        coordinates: data.location.coordinates.coordinates
      }
    }
  });

  return request;
};
