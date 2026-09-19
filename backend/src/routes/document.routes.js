import express from "express";
import {protect} from "../controllers/auth.controller.js";
import { uploadDocument ,getMyDocuments} from "../controllers/document.controller.js";
import {upload} from "../middlewares/upload.middleware.js";

const router = express.Router();    
router.post("/upload", protect, upload.single("file"), uploadDocument);
router.get("/", protect, getMyDocuments);
export default router;