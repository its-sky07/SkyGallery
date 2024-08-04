import { Comment } from "../models/comment.js"


 const deletecomment=async(req,res)=>{
   const commentid= req.params.commentid
  const comment=  await Comment.findByIdAndDelete(commentid)
    res.status(200).send(comment)


 }


 export{deletecomment}