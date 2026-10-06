import { Resume } from "../models/resume.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import extractPdfText from "../utils/extractPdfText.js";
import { analyzeResume } from "../services/geminiServices.js";
import { analyzeOpenAiResume } from "../services/openAiServices.js";
import downloadPdf from "../utils/downloadPdf.js";

// upload resume to the server

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        // Upload PDF buffer to Cloudinary
        const pdfUpload = await uploadToCloudinary(
            req.file.buffer
        );

        const filePath = pdfUpload.secure_url;
        const cloudinaryId = pdfUpload.public_id;

        // Create a new resume document in MongoDB
        const newResume = new Resume({
            user_id: req.body.user_id,
            status: "uploaded",
            file_path: filePath,
            cloudinary_id: cloudinaryId,
            file_name: req.file.originalname,
            size: req.file.size,
        });
        await newResume.save();

        res.status(201).json({
            success: true,
            message: "File uploaded successfully",            
        });

    } catch (error) {

        console.error(
            "Error uploading resume:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Error uploading resume",
            error: error.message,
        });
    }
};

// upload and analyze resume

const uploadAndAnalyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const text = await extractPdfText(req.file.buffer);
        
        // analyzing the extracted text using the analyzeResume function from geminiServices.js
        const analysis = await analyzeResume(text);
        
        
        // Upload PDF buffer to Cloudinary
        const pdfUpload = await uploadToCloudinary(
            req.file.buffer
        );

        const filePath = pdfUpload.secure_url;
        const cloudinaryId = pdfUpload.public_id;

        // Create a new resume document in MongoDB
        const newResume = new Resume({
            user_id: req.body.user_id,
            status: "uploaded",
            file_path: filePath,
            cloudinary_id: cloudinaryId,
            file_name: req.file.originalname,
            size: req.file.size,
        });
        await newResume.save();

        res.status(201).json({
            success: true,
            analysis: analysis,
            message: "Analysis completed and file uploaded successfully",            
        });

    } catch (error) {

        console.error(
            "Error uploading resume:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Error analyzing resume",
            error: error.message,
        });
    }
};

// analyze existing resume by id
const analyzeExistingResume = async (req, res) => {
    try {
        const { id } = req.params;

        const resume = await Resume.findById(id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        const pdfBuffer = await downloadPdf(resume.file_path);
        console.log("Downloaded PDF buffer:", pdfBuffer);

        const text = await extractPdfText(pdfBuffer);
        

        const analysis = await analyzeResume(text);

        return res.status(200).json({
            success: true,
            analysis,
        });

    } catch (error) {
        console.error("Error analyzing existing resume:", error);

        return res.status(500).json({
            success: false,
            message: "Error analyzing existing resume",
            error: error.message,
        });
    }
};

// exporting all the functions to be used in the routes
export {uploadResume, uploadAndAnalyzeResume, analyzeExistingResume};