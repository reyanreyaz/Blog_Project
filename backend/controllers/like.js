import Post from "../model/Post.js";

const handleLikeUnlike = async (req, res) => {
  try {
    const { postId } = req.body;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const hasLiked = post.likes.includes(userId);

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      hasLiked
        ? { $pull: { likes: userId } }
        : { $addToSet: { likes: userId } },
      { new: true }
    ).populate({
      path: "comments.user",
      select: "username",
    }).exec();
    

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating likes." });
  }
};

export default { handleLikeUnlike };
