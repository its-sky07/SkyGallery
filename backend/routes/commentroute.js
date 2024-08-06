import express from "express";
import verifytoken from "../middleware/Auth.js";
import { deletecomment } from "../controller/commentcontroller.js";

const app=express()
const router=express.Router()

// router.delete('/:commentid',verifytoken,deletecomment);

export default router;

