import express from "express";
import upload from "../middlewares/upload.js";
import { uploadResume , uploadAndAnalyzeResume , analyzeExistingResume} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/upload", upload.single("resume"), uploadResume);
router.post("/upload-and-analyze", upload.single("resume"), uploadAndAnalyzeResume);
router.get("/analyze/:id", analyzeExistingResume);

export default router;