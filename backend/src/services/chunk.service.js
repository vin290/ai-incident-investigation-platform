export const chunkText = (
  text,
  chunkSize = 1000,
  overlap = 200
) => {
  if (!text || typeof text !== "string") {
    return [];
  }

  const cleanedText = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const chunks = [];

  let start = 0;
  let index = 0;

  while (start < cleanedText.length) {
    const end = Math.min(start + chunkSize, cleanedText.length);

    const chunk = cleanedText.slice(start, end).trim();

    if (chunk) {
      chunks.push({
        index,
        text: chunk,
        start,
        end,
      });

      index++;
    }

    if (end === cleanedText.length) {
      break;
    }

    start = end - overlap;
  }

  return chunks;
};