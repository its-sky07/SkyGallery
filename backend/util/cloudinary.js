import { v2 as cloudinary } from 'cloudinary';
import { Console } from 'console';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: 'dm2c41gia',
  api_key: '887464156598416',
  api_secret: 'qY8KDgiWmA1ji2RDikjIQ4dHB3I' // Hardcoded for now, ensure to secure this in production
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
