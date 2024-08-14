import { v2 as cloudinary } from 'cloudinary';

// import fs from 'fs';
import streamifier from 'streamifier';
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET // Ensure this is securely managed in production
});

const uploadOnCloudinary = async (buffer) => {
  if (!buffer) {
    console.error('No file buffer provided');
    return null;
  }
  try {


    // Use a Promise to handle the asynchronous nature of the upload
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' }, // Adjust resource_type if needed
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );

      // Convert buffer to a readable stream and pipe it to Cloudinary
      streamifier.createReadStream(buffer).pipe(stream);
    });

    console.log('Cloudinary URL:', result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return null;
  }
};

export default uploadOnCloudinary;
