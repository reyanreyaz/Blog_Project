import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectPostById,
  getPostsStatus,
  fetchPosts,
  toggleLike,
} from "../../features/posts/postsSlice.js";
import { selectCurrentUser } from "../../features/auth/authSlice.js";

import Comment from "../Comment.jsx";
import EditDelete from "../EditDelete.jsx";
import PostAuthor from "../PostAuthor.jsx";
import AddComment from "../AddComment.jsx";

const SingleBlogpost = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));
  const status = useSelector((state) => getPostsStatus(state));
  const loggedInUser = useSelector((state) => selectCurrentUser(state));

  const [openComments, setOpenComments] = useState(false);
  const [liked, setLiked] = useState(post.likes?.includes(loggedInUser));

  const handleLike = () => {
    setLiked((prev) => !prev);
    dispatch(toggleLike({ postId, userId: loggedInUser }))
      .unwrap()
      .catch((error) => {
        console.error("Error toggling like: ", error);
        setLiked((prev) => !prev);
      });
  };

  const toggleModal = () => {
    setOpenComments((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (status === "loading") {
    return <section>Loading...</section>;
  }

  if (!post) {
    return <section>Post not found!</section>;
  }

  return (
    <div className="flex flex-col w-full items-center my-3">
      <article className="border-[1px] border-black rounded-xl bg-green-50 p-5 mx-3 max-w-screen md:w-2/3 sm:w-4/5">
        <header className="flex justify-between items-center gap-2">
          <h1 className="text-4xl mb-3 inline flex-1 break-words overflow-hidden text-ellipsis">{post.title}</h1>
          <small className="w-20 ml-3">
              {post.createdAt
                ? new Date(post.createdAt).toString().substring(4, 21)
                : "N/A"}
            </small>
          {loggedInUser === post.author && <EditDelete postId={post._id} />}
        </header>
        <hr className="border-black" />
        <p className="text-lg mt-3 mb-3 break-words overflow-hidden text-ellipsis">{post.body}</p>
        <hr className="border-black" />
        <footer className="mt-3 flex justify-between ">
          <div className="flex">
            {!liked ? (
              <IoMdHeartEmpty className="text-2xl mr-1" onClick={handleLike} />
            ) : (
              <IoMdHeart
                className="text-green-800 text-2xl mr-1"
                onClick={handleLike}
              />
            )}
            <span>{post.likes.length}</span>
            <FaRegComment
              onClick={toggleModal}
              className="ml-5 text-2xl mr-1"
            />
            <span>{post.comments.length}</span>
          </div>
          <PostAuthor key={post._id} userId={post.author} />
        </footer>
        <div
          className={`flex overflow-hidden transition-all ease-in-out ${
            openComments ? "max-h-14" : "max-h-0"
          }`}
        >
          <AddComment postId={post._id} />
        </div>
        <h2 className="text-center text-lg font-medium mt-3">Comments</h2>
        <Comment post={post} />
      </article>
    </div>
  );
};

export default SingleBlogpost;
