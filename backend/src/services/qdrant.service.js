import qdrant from "../config/qdrant.js";

const COLLECTION_NAME = "incident_chunks";

export const ensureQdrantCollection = async () => {
  const collections = await qdrant.getCollections();

  const exists = collections.collections.some(
    (collection) => collection.name === COLLECTION_NAME
  );

  if (!exists) {
    await qdrant.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 768,
        distance: "Cosine",
      },
    });

    console.log(`Qdrant collection created: ${COLLECTION_NAME}`);
  } else {
    console.log(`Qdrant collection already exists: ${COLLECTION_NAME}`);
  }
};

export const storeChunk = async({id,vector,text,documentId,userId,chunkIndex}) =>{

  await qdrant.upsert(COLLECTION_NAME, {
    wait: true,
    points: [
      {
        id,
        vector,
        payload: {
          text,
          documentId,
          userId,
          chunkIndex,
        },
      },
    ],
  });
}