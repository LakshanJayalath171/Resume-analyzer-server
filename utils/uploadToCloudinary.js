import { cloudinary } from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "resumelens/resumes",
                resource_type: "raw",
            },
            (error, result) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }

            }
        );

        streamifier
            .createReadStream(buffer)
            .pipe(uploadStream);
    });
};

export default uploadToCloudinary;