import "./config/env.js";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { startFoodExpiryCron } from "./cron/foodExpiry.cron.js";
import { startRequestExpiryCron } from "./cron/requestExpiry.cron.js";



const PORT = process.env.PORT || 5000;

connectDB();
startFoodExpiryCron();
startRequestExpiryCron();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
