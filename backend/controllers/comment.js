import Post from "../model/Post.js";

const handleNewComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { user, content } = req.body;

    if (!user || !content) {
      return res.status(400).json({ error: "User ID and content are required." });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            user,
            content,
          },
        },
      },
      { new: true }
    ).populate({
      path: 'comments.user',
      select: 'username',
    });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add comment." });
  }
};

export default {handleNewComment}