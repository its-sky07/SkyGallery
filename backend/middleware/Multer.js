
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'skygalleryfolder', // Specify a folder in Cloudinary
    format: async (req, file) => 'jpg', // supports promises as well
    public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0],
  },
});
  
  export const upload = multer({ storage: storage })