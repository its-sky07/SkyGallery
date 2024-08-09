
import multer from 'multer'
// import { CloudinaryStorage } from 'multer-storage-cloudinary';


  const storage = multer.memoryStorage();
  
  export const upload = multer({ storage: storage })