import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET // Hardcoded for now, ensure to secure this in production
});

const uploadOnCloudinary = async (path) => {

  
};

export default uploadOnCloudinary;
