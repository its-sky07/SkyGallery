import { Comment } from "../models/comment.js";
import Post from "../models/postmodel.js";

const deletecomment = async (req, res) => {
  try {
    const commentid = req.params.commentid;
    const postid = req.params.postid;

    // Delete the comment
    const comment = await Comment.findByIdAndDelete(commentid);

    if (!comment) {
      return res.status(404).send({ error: "Comment not found" });
    }

    // Find the post and update its comments array
    const post = await Post.findById(postid);
    
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }

    post.comments = post.comments.filter(
      (item) => item.toString() !== commentid.toString()
    );
    await post.save();

    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};

export { deletecomment };
