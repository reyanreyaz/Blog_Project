import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice.js";
import { useDispatch } from "react-redux";
import { addComment } from "../features/posts/postsSlice.js";
import { toast } from "react-toastify";
import propTypes from "prop-types";

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const user = useSelector((state) => selectCurrentUser(state));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Sign In First!")
      return;
    } else if (!content) {
      return;
    }
    try {
      await dispatch(addComment({ postId, user, content })).unwrap();

      setContent("");
      toast.success("Comment Added!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          className="flex-1 p-2 rounded-l-lg mt-3 outline-1 outline-green-700"
          type="text"
          autoComplete="off"
          placeholder="Express your opinions..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-green-700 mt-3 px-2 rounded-r-lg font-semibold text-white hover:shadow-lg hover:bg-green-800">
          POST
        </button>
      </form>
    </>
  );
};

AddComment.propTypes = {
  postId: propTypes.string,
};

export default AddComment;
