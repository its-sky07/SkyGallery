import { v2 as cloudinary } from 'cloudinary';
import { Console } from 'console';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET // Hardcoded for now, ensure to secure this in production
});

const uploadOnCloudinary = async (avatarLocalPath) => {
  try {
    if(!avatarLocalPath){
      return null;
    }
    const result = await cloudinary.uploader.upload(avatarLocalPath);
    // Handle success response
    console.log((result.url));
    if (fs.existsSync(avatarLocalPath)) {
      fs.unlinkSync(avatarLocalPath);
    }
   return result.url;
  } catch (error) {
    // Handle error response
    console.error(error);
    if (fs.existsSync(avatarLocalPath)) {
      fs.unlinkSync(avatarLocalPath);
    }
    return null;
   ;
  }
};

export default uploadOnCloudinary;
