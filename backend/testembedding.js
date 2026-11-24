import "dotenv/config";
import { generateEmbeddings } from "./src/services/embedding.services.js";

const test = async () => {
  try {
    const text = "Database connection failed because the password expired.";

    const embedding = await generateEmbeddings(text);

    console.log("Embedding generated successfully");
    console.log("Vector length:", embedding.length);
    console.log("First 10 values:", embedding.slice(0, 10));
  } catch (error) {
    console.error("Embedding test failed:", error);
  }
};

test();