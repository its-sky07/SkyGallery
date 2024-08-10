
import multer from 'multer'
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET // Hardcoded for now, ensure to secure this in production
// });
const storage = multer.memoryStorage();
  
  export const upload = multer({ storage: storage })

  


// const uploadOnCloudinary = async (avatarLocalPath) => {
//   try {
//       if (!avatarLocalPath) {
//           return null;
//       }
//       const result = await cloudinary.uploader.upload(avatarLocalPath);
//       // Handle success response
//       console.log((result.url));
      
//       return result.url;
//   } catch (error) {
//       // Handle error response
//       console.error(error);
      
//       return null;
//       ;
//   }


// };

// export default uploadOnCloudinary;
