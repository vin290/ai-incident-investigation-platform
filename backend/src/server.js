import app from "./app.js";
import { connectDb } from "./config/db.js";
import redis from "./config/redis.js";
import qdrant from "./config/qdrant.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Connect MongoDB
    await connectDb();

    // 2. Check Redis
    const response = await redis.ping();
    console.log("Redis Ping:", response);

    const collections = await qdrant.getCollections();

console.log("Qdrant connected");
console.log("Qdrant collections:", collections.collections);

    // 3. Start Express
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();