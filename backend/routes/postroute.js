import express from 'express';
// import { registerUser, Loginuser, profileimage } from '../controller/usercontroller.js';
import { upload } from '../middleware/Multer.js';
import verifytoken from '../middleware/Auth.js';
import { addpost, deletepost, postcomment, postinfo, updatepostinfo, userpostcomment } from '../controller/postcontroller.js';

const router = express.Router();

router.post('/upload',verifytoken,upload.single("post"), addpost);
router.delete('/:id',verifytoken,deletepost);
router.get('/:id',verifytoken,postinfo);
router.put('/updatepostinfo/:id',verifytoken,updatepostinfo);
router.post('/:id/comment',verifytoken,postcomment);
router.get('/:id/comment',verifytoken,userpostcomment);







export default router;
