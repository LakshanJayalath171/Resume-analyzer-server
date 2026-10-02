import { Resume } from "../models/resume.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const uploadResume = async (req, res) => {
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