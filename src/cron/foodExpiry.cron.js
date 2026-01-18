import cron from "node-cron";
import { Food } from "../modules/food/food.model.js";

// Runs every 10 minutes
export const startFoodExpiryCron = () => {
  cron.schedule("*/10 * * * *", async () => {
    try {
      const now = new Date();

      // 1️⃣ Mark expired food
      const expiredResult = await Food.updateMany(
        {
          expiryAt: { $lte: now },
          status: { $ne: "expired" }
        },
        {
          $set: { status: "expired" }
        }
      );

      // 2️⃣ Delete food expired more than 12 hours ago
      const deleteBefore = new Date(
        now.getTime() - 12 * 60 * 60 * 1000
      );

      const deletedResult = await Food.deleteMany({
        status: "expired",
        expiryAt: { $lte: deleteBefore }
      });

      if (
        expiredResult.modifiedCount > 0 ||
        deletedResult.deletedCount > 0
      ) {
        console.log(
          `[CRON] Expired updated: ${expiredResult.modifiedCount}, Deleted: ${deletedResult.deletedCount}`
        );
      }
    } catch (error) {
      console.error("[CRON] Food expiry error:", error.message);
    }
  });
};
