import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    if (!comment) {
      return res.json({ message: "Комментар не може бути пустим" });
    }
    const newComment = new Comment({ comment });
    await newComment.save();
    try {
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
      res.json(newComment);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.json({ message: "Щось пішло не так" });
  }
};
