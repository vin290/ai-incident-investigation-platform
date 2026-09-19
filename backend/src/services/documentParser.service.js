import fs from "fs/promises";
import { PDFParse } from "pdf-parse";

export const extractText = async (filePath, mimeType) => {
  if (mimeType === "text/plain") {
    return await fs.readFile(filePath, "utf-8");
  }

  if (mimeType === "application/json") {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.stringify(JSON.parse(content), null, 2);
  }

  if (mimeType === "application/pdf") {
    const buffer = await fs.readFile(filePath);

    const parser = new PDFParse({
      data: buffer,
    });

    const result = await parser.getText();

    //await parser.destroy();

    return result.text;
  }

  throw new Error(`Unsupported file type: ${mimeType}`);
};