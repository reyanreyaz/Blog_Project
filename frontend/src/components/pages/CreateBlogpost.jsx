import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from '../../features/auth/authSlice.js'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { addNewPost } from '../../features/posts/postsSlice.js'

const CreateBlogpost = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const author = useSelector(selectCurrentUser)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) {
      setError("Title and body are required!");
      return;
    }
    try {
      dispatch(addNewPost({ title, body, author })).unwrap()

      setTitle('')
      setBody('')
    
      navigate('/')
      toast.success('Post Uploaded!')
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
          className="outline-green-700 my-3 p-3 border-[1px] border-black rounded-lg w-full md:w-2/3 sm:w-4/5"
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Title..."
        />
        <textarea
          className="outline-green-700 min-h-96 border-[1px] border-black mb-3 p-3 resize-none rounded-lg w-full md:w-2/3 sm:w-4/5"
          id="body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="Write something..."
        />
        <button className="text-white font-semibold text-lg mt-3 p-2 rounded-lg bg-green-700 hover:bg-green-800 w-full md:w-2/3 sm:w-4/5">
          Submit
        </button>
      </form>
    </main>
  );
};

export default CreateBlogpost;
