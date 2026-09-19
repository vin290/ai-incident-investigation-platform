import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true,},

        fileName: {
        type: String,
        required: true,}
,
    filePath: {
        type: String,
        required: true,},
          mimeType: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["uploaded", "processing", "completed", "failed"],
      default: "uploaded",
    },},
{ timestamps: true });

const Document = mongoose.model("Document", DocumentSchema);

export default Document;
