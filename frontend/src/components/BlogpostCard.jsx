import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import PostAuthor from "./PostAuthor.jsx";
import AddComment from "./AddComment.jsx";
import { toggleLike } from "../features/posts/postsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice.js";
import { toast } from "react-toastify";

const BlogpostCard = ({ post }) => {
  const dispatch = useDispatch()
  const userId = useSelector(state=> selectCurrentUser(state))
  const [openComments, setOpenComments] = useState(false);
  const [liked, setLiked] = useState(post.likes?.includes(userId));


  const handleLike = () => {
    if (!userId) {
      toast.error("Sign in first!")
      return}
    setLiked((prev) => !prev);
    dispatch(toggleLike({ postId: post._id, userId }))
      .unwrap()
      .catch((error) => {
        console.error("Error toggling like: ", error);
        setLiked((prev) => !prev);
      });
  };

  const toggleModal = () => {
    setOpenComments((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full items-center mb-3">
      <article className="border-[1px] border-black rounded-xl bg-green-50 p-5 mx-3 max-w-screen hover:bg-green-100 md:w-2/3 sm:w-4/5">
        <Link to={`/blog/${post._id}`}>
          <header className="flex justify-between items-center">
            <h1 className="text-4xl mb-3 p-1 inline break-words overflow-hidden text-ellipsis">{post.title}</h1>
            <small className="w-20 ml-3">
              {post.createdAt
                ? new Date(post.createdAt).toString().substring(4, 21)
                : "N/A"}
            </small>
          </header>
          <hr className="border-black" />
          <p className="text-lg mt-3 mb-3 break-words overflow-hidden text-ellipsis">
            {post.body?.length > 75
              ? post.body.substring(0, 75) + ". . ."
              : post.body}
          </p>
          <hr className="border-black" />
        </Link>
        <footer className="mt-3 flex justify-between ">
          <div className="flex">
            {!liked
            ? <IoMdHeartEmpty className="text-2xl mr-1" onClick={handleLike} />
            : <IoMdHeart className="text-green-800 text-2xl mr-1" onClick={handleLike} />
            }
            <span>{post.likes?.length || 0}</span>
            <FaRegComment
              onClick={toggleModal}
              className="ml-5 text-2xl mr-1"
            />
            <span>{post.comments?.length || 0}</span>
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
      </article>
    </div>
  );
};

BlogpostCard.propTypes = {
  post: PropTypes.object,
};

export default BlogpostCard;
