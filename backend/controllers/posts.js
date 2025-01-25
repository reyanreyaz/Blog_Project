import Post from "../model/Post.js";
import User from "../model/User.js";

const handleNewPost = async (req, res) => {
  try {
    const { title, body, author} = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "Title and content are required." });
    }

    const newPost = new Post({
      title,
      body,
      author,
    });

    const savedPost = await newPost.save();

    const updatedUser = await User.findByIdAndUpdate(
      author,
      { $push: { posts: savedPost._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Author not found." });
    }

    res.status(201).json({
      message: "Post created successfully.",
      post: savedPost,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create post." });
  }
};

const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: "comments.user",
      select: "username",
    });
    if (!posts.length) {
      return res.status(204).json({ message: "No posts found!" });
    }
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, body },
      { new: true }
    );

    if (post) {
      res.status(200).json({ message: "Post updated successfully", post });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    await User.updateMany(
      { posts: id },
      { $pull: { posts: id } }
    );

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

export default {
  handleNewPost,
  fetchPosts,
  editPost,
  deletePost,
};
