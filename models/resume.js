import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    current_version:{
        type: String,
        required: true,
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
    file_name: {
        type: String,
        required: true,
    },

},{timestamps: true});

export const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;