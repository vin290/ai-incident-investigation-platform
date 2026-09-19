import Document from "../models/Document.js";
import { documentQueue } from "../queues/document.queues.js";

export const uploadDocument = async (req, res) => {
  try {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    const document = await Document.create({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
      uploadedBy: req.user.userId,
    });

await documentQueue.add(
  "process-document",
  {
    documentId: document._id.toString(),
    filePath: document.filePath,
    mimeType: document.mimeType,
  },
  {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: 100,
    removeOnFail: 100,
  }
);
    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    console.error("Upload document error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      uploadedBy: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (error) {
    console.error("Get documents error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
