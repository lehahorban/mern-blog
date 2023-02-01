import Post from "../models/Post.js";
import User from "../models/User.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Create post

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;

    const user = await User.findById(req.userId);
    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });
      await newPostWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json(newPostWithImage);
    }
    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      imgUrl: "",
      author: req.userId,
    });
    await newPostWithoutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });

    return res.json(newPostWithoutImage);
  } catch (error) {
    res.json({ message: "Щось пішло не так" });
  }
};

// Get all posts

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    const popularPosts = await Post.find().limit(5).sort("-views");
    if (!posts) {
      return res.json({ message: "Постів немає" });
    }
    res.json({ posts, popularPosts });
  } catch (error) {
    res.json({ message: "Щось пішло не так" });
  }
};

// Get post by id

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.json(post);
  } catch (error) {
    res.json({ message: "Щось пішло не так" });
  }
};

// Get my posts
export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => Post.findById(post._id))
    );
    res.json(list);
  } catch (error) {
    res.json({ message: "Щось пішло не так" });
  }
};

// Update posts

export const updatePosts = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    const post = await Post.findById(id);
    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));
      post.imgUrl = fileName || "";
    }
    post.title = title;
    post.text = text;
    await post.save();
    res.json(post);
  } catch (error) {
    res.json({ message: "Щось пішло не так" });
  }
};

// Remove post

export const removePosts = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.json({ message: "Такого поста не існує" });
    }
    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });
    res.json({ message: "Пост видалили" });
  } catch (error) {
    res.json({ message: "Щось пішло не так" });
  }
};
