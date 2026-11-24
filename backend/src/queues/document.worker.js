import { Worker } from "bullmq";
import dotenv from "dotenv";
import { connectDb } from "../config/db.js";
import Document from "../models/Document.js";
import { extractText } from "../services/documentParser.service.js";
import  {chunkText} from "../services/chunk.service.js";
import { generateEmbeddings } from "../services/embedding.services.js";
import { storeChunk } from "../services/qdrant.service.js";
import crypto from "crypto";
dotenv.config();

const connection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
};

const startWorker = async () => {
  try {
    await connectDb();

    const worker = new Worker(
      "document-processing",

      async (job) => {
        console.log("Job received:", job.id);
        console.log("Job name:", job.name);
        console.log("Job data:", job.data);

        const { documentId, filePath, mimeType } = job.data;

        await Document.findByIdAndUpdate(documentId, {
          status: "processing",
        });

        console.log(`Processing file: ${filePath}`);
        console.log(`File type: ${mimeType}`);

        // Temporary delay to simulate document processing
        //await new Promise((resolve) => setTimeout(resolve, 5000));

        const text = await extractText(filePath, mimeType);

console.log("Extracted text length:", text.length);
console.log("Extracted text preview:", text.slice(0, 300));
const chunks = chunkText(text);

console.log("Total chunks:", chunks.length);

console.log("First chunk:", chunks[0]);

//let firstChunk=chunks[0];

//const vector = await generateEmbeddings(firstChunk.text);



if (chunks.length === 0) {
  throw new Error("No chunks generated");
}

const {  userId } = job.data;

if (!userId) {
  throw new Error("userId missing from job data");
}

for (const chunk of chunks) {
  const vector = await generateEmbeddings(chunk.text);

  await storeChunk({
    id: crypto.randomUUID(),
    vector,
    text: chunk.text,
    documentId,
    userId,
    chunkIndex: chunk.index,
  });

  console.log(
    `Chunk ${chunk.index + 1}/${chunks.length} stored in Qdrant`
  );
}




console.log("First chunk stored in Qdrant");

if (chunks.length > 1) {
  console.log("Second chunk:", chunks[1]);
}

        await Document.findByIdAndUpdate(documentId, {
          status: "completed",
        });

        return {
          documentId,
            textLength: text.length,
  totalChunks: chunks.length,
          message: "Temporary document processing completed",
        };
      },

      {
        connection,
      }
    );

    worker.on("completed", (job, result) => {
      console.log(`Job ${job.id} completed`);
      console.log("Result:", result);
    });

    worker.on("failed", (job, error) => {
      console.error(`Job ${job?.id} failed:`, error.message);
    });

    console.log("Document worker is running");
  } catch (error) {
    console.error("Worker startup failed:", error.message);
    process.exit(1);
  }
};

startWorker();