

import Post from "../models/postmodel.js";
import uploadOnCloudinary from "../middleware/Multer.js";
import usermodel from "../models/usermodel.js";
// import { set } from "mongoose";
import { Comment } from "../models/comment.js";
// import { compareSync } from "bcrypt";


const Allpost = async (req, res) => {
  try {
    const posts = await Post.find({ private: false }).populate("user"); // Adjust the fields to be populated as needed
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send('Error fetching posts');
    console.error(err);
  }
};

const addpost = async (req, res) => {

  const { title, description, privacy } = req.body

  if (!title && !description) {
    return res.status(500).send("all fiels required")


  }
  if (!req.file) {
    return res.status(500).send("file not found")

  }
  const localpostPath = req.file.path;
  //  console.log(localAvatarPath);
  const user = await usermodel.findById(req.user._id)
  try {
    // const post = await uploadOnCloudinary(localpostPath);



    const postdata = new Post({
      title: title,
      description: description,
      imageUrl: localpostPath,
      private: privacy,
      user: req.user._id
    })

    await postdata.save()
    const finalpost = await Post.findById(postdata._id).populate("user")

    user.post.push(postdata._id)
    await user.save()


     console.log(finalpost);
    return res.status(200).send(finalpost);
  } catch (err) {
    res.status(500).send('Error uploading avatar');
    console.error(err);
  }

}


const deletepost = async (req, res) => {
  const postid = req.params.id;

  try {
    const post = await Post.findById(postid)

    if (!post) return res.status(404).send("post not found")

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).send("you are not authorized to delete this post")
    }
    const user = await usermodel.findById(req.user._id);
    user.post.filter((item) => (item !== postid))
    await user.save()

    await Post.findByIdAndDelete(postid)
    return res.status(200).send("post deleted")





  } catch (error) {
    res.status(500).send("error deleting post")
    console.error("post not deleted")

  }




}


const postinfo = async (req, res) => {
  const postid = req.params.id

  const post = await Post.findById(postid).populate("user")
  if (!post) return res.status(404).send("post not found")

  res.status(200).send(post)




}
const updatepostinfo = async (req, res) => {
  const postid = req.params.id

  const { title, description ,privacy} = req.body
  const post = await Post.findByIdAndUpdate(postid, {
    $set: {
      title: title,
      description: description,
      private:privacy
    },
    new: true

  })
  await post.save()
  res.status(200).send(post)

}

const postcomment = async (req, res) => {
  const postid = req.params.id
  const { text } = req.body


  if (!text) {

    return res.status(400).semd("no comment found")
  }
  const commentog = new Comment({
    text: text,
    user: req.user._id,
    post: postid,
    

  })


  await commentog.save()
  const post= await Post.findById(postid)
  post.comments.push(commentog._id)
 await post.save()


  const commentdata = await Comment.findById(commentog._id).populate("user")
  res.status(200).send(commentdata)
}

const userpostcomment = async (req, res) => {
  const postid = req.params.id
  const com = await Comment.find({ post: postid }).populate("user")
  console.log(com)
  res.status(200).send(com)



}

const userpostlike = async (req, res) => {
  const postid = req.params.id

  const post = await Post.findById(postid)
  if (!post) {
    return res.status(404).send("post not found")
  }
  post.likes.push(req.user._id)
  await post.save()
  res.status(200).send("post liked")



}

const userpostunlike = async (req, res) => {
  const postid = req.params.id

  const post = await Post.findById(postid)
  if (!post) {
    return res.status(404).send("post not found")
  }
  post.likes = post.likes.filter((user) => user.toString() !== req.user._id.toString());
  await post.save()
  res.status(200).send("post unliked")



}


export { addpost, Allpost, deletepost, postinfo, updatepostinfo, postcomment, userpostcomment, userpostlike, userpostunlike }