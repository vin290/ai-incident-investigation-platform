import "dotenv/config";
import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY,
});

export const generateEmbeddings = async(text)=>{

    if(!text || typeof text !== "string"){
        throw new Error("Invalid text input for embedding generation.");
    }
 const response = await ai.models.embedContent({
    model: "gemini-embedding-2",
    contents: text,
    config: {
      outputDimensionality: 768,
    },
  });
    return response.embeddings[0].values;
}