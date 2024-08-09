import { v2 as cloudinary } from 'cloudinary';
// import { Console } from 'console';
// import fs from 'fs';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import streamifier from 'streamifier';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET // Hardcoded for now, ensure to secure this in production
});

const uploadOnCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export default uploadOnCloudinary;
