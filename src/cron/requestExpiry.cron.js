import cron from "node-cron";
import { FoodRequest } from "../modules/requests/request.model.js";

// Runs every 10 minutes
export const startRequestExpiryCron = () => {
  cron.schedule("*/10 * * * *", async () => {
    try {
      const now = new Date();

      // 1️⃣ Mark requests as expired
      const expiredResult = await FoodRequest.updateMany(
        {
          validTill: { $lte: now },
          status: { $ne: "expired" }
        },
        {
          $set: { status: "expired" }
        }
      );

      // 2️⃣ Delete requests expired more than 12 hours ago
      const deleteBefore = new Date(
        now.getTime() - 12 * 60 * 60 * 1000
      );

      const deletedResult = await FoodRequest.deleteMany({
        status: "expired",
        validTill: { $lte: deleteBefore }
      });

      if (
        expiredResult.modifiedCount > 0 ||
        deletedResult.deletedCount > 0
      ) {
        console.log(
          `[CRON] Requests expired: ${expiredResult.modifiedCount}, deleted: ${deletedResult.deletedCount}`
        );
      }
    } catch (error) {
      console.error("[CRON] Request expiry error:", error.message);
    }
  });
};
