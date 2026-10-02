import mongoose from "mongoose";


const resumeSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        index: true,
    },
    status: {
        type: String,
        enum: ['uploaded', 'analyzed', 'completed','failed'],
        default: 'uploaded',
        required: true,
    },
    file_path: {
        type: String,
        required: true,
    },
    cloudinary_id: {
        type: String,
        required: true,
    },
    file_name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: false,
    },
},{timestamps: true});

export const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;