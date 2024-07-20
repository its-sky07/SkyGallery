import express from 'express';
import { registerUser, Loginuser, profileimage } from '../controller/usercontroller.js';
import { upload } from '../middleware/Multer.js';
import verifytoken from '../middleware/Auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', Loginuser);
router.post('/uploadprofileimg', verifytoken, upload.single('profileimage'), profileimage);
router.get('/protected',(req,res)=>{
    
    const token ='akash'
    res .cookie('accestoken', token, { httpOnly: true, secure:true }).send('cookie set')
});

export default router;
