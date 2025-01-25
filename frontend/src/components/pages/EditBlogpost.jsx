import { selectPostById, updatePost } from "../../features/posts/postsSlice.js";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const EditBlogpost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));

  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) {
      setError("Title and body are required!");
      return;
    }
    try {
      await dispatch(
        updatePost({ id: post._id, title, body })
      ).unwrap();

      setTitle("")
      setBody("")
      setError("")
      toast.success("Post Edited!");
      navigate(`/blog/${post._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-5 w-full md:w-2/3 sm:w-4/5"
      >
        {error && <p className="text-red-700">{error}</p>}
        <input
          className="outline-green-700 my-3 p-3 rounded-lg w-full border-[1px] border-black md:w-2/3 sm:w-4/5"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          placeholder="Title..."
        />
        <textarea
          className="outline-green-700 min-h-96 mb-3 p-3 border-[1px] border-black resize-none rounded-lg w-full md:w-2/3 sm:w-4/5"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          id="body"
          placeholder="Write something..."
        />
        <button className="text-white font-semibold text-lg mt-3 p-2 rounded-lg bg-green-700 hover:bg-green-800 w-full md:w-2/3 sm:w-4/5">
          Submit
        </button>
      </form>
    </main>
  );
};

export default EditBlogpost;
