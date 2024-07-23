import express from 'express';
import { registerUser, Loginuser, profileimage, userpost } from '../controller/usercontroller.js';
import { upload } from '../middleware/Multer.js';
import verifytoken from '../middleware/Auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', Loginuser);
router.post('/uploadprofileimg', verifytoken, upload.single('profileimage'), profileimage);
router.get('/posts' ,verifytoken,userpost);

export default router;
