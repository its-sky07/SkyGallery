

import Post from "../models/postmodel.js";
import uploadOnCloudinary from "../util/cloudinary.js";
import usermodel from "../models/usermodel.js";


const Allpost = async (req, res) => {
  try {
    const posts = await Post.find().populate("user"); // Adjust the fields to be populated as needed
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send('Error fetching posts');
    console.error(err);
  }
};

const addpost = async (req, res) => {

  const { title, description } = req.body

  if (!title && !description) {
    return res.status(500).send("all fiels required")


  }
  if (!req.file) {
    return res.status(500).send("file not found")

  }
  const localpostPath = req.file.path;
  //  console.log(localAvatarPath);

  try {
    const post = await uploadOnCloudinary(localpostPath);



    const postdata = new Post({
      title: title,
      description: description,
      imageUrl: post,
      user: req.user._id
    })

    await postdata.save()

    const user = await usermodel.findById(req.user._id)
    user.post.push(postdata._id)
    await user.save()


    //  console.log(req.user._id);
    return res.status(200).send(postdata);
  } catch (err) {
    res.status(500).send('Error uploading avatar');
    console.error(err);
  }





  

}
export { addpost   , Allpost}