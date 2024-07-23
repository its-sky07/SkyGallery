import express from 'express';
// import { registerUser, Loginuser, profileimage } from '../controller/usercontroller.js';
import { upload } from '../middleware/Multer.js';
import verifytoken from '../middleware/Auth.js';
import { addpost } from '../controller/postcontroller.js';

const router = express.Router();

router.post('/upload',verifytoken,upload.single("post"), addpost);




export default router;
