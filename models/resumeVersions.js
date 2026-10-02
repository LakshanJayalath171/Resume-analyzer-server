import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: true,
    },
    resume_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    version: {
        type: String,
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
    analyzed_data: {
        ats_score: {
            type: Number,
        },
        summary: {
            type: String,
        },
        strengths: [
            {
                type: String,
            }
        ],
        weaknesses: [
            {
                type: String,
            }
        ],
        keyword_gaps: [
            {
                type: String,
            }
        ],
        sugestions: [
            {
                type: String,
            }
        ]
    }
},{timestamps: true});

export const ResumeVersion = mongoose.model('ResumeVersion', userSchema);
export default ResumeVersion;