import express from 'express';
// import { registerUser, Loginuser, profileimage } from '../controller/usercontroller.js';
import { upload } from '../middleware/Multer.js';
import verifytoken from '../middleware/Auth.js';
import { addpost, deletepost, postcomment, postinfo, updatepostinfo, userpostcomment, userpostlike, userpostunlike } from '../controller/postcontroller.js';
import { deletecomment } from '../controller/commentcontroller.js';

const router = express.Router();

router.post('/upload',verifytoken,upload.single("post"), addpost);
router.delete('/:id',verifytoken,deletepost);
router.delete('/:postid/comment/:commentid',verifytoken,deletecomment);
router.get('/:id',verifytoken,postinfo);
router.put('/updatepostinfo/:id',verifytoken,updatepostinfo);
router.post('/:id/comment',verifytoken,postcomment);
router.get('/:id/comment',verifytoken,userpostcomment);
router.post('/:id/likes',verifytoken,userpostlike);
router.post('/:id/unlikes',verifytoken,userpostunlike);


    





export default router;
