import Modal from "../Modal.jsx";

import { FaPencil } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice.js";
import { selectUserById, fetchUsers } from "../../features/users/usersSlice.js";
import { selectPostsByUser } from '../../features/posts/postsSlice.js'
import BlogpostCard from "../BlogpostCard.jsx";

const Dashboard = () => {
  const userId = useSelector(selectCurrentUser);
  const dispatch = useDispatch()
  const user = useSelector((state) => selectUserById(state, userId));
  const postsByUser = useSelector(state => selectPostsByUser(state, userId))

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-semibold my-3">
        {user.username}
      </h1>
      <p className="text-center mx-auto w-2/3">{user.description}</p>
      <button onClick={toggleModal} className="block mx-auto">
        <IoMdSettings className="text-2xl mt-3 text-green-700 hover:text-green-800 hover:scale-125" />
      </button>
      {isModalOpen && <Modal toggleModal={toggleModal} />}
      <div className="flex gap-8 justify-center my-5">
        <p>
          <FaPencil className="text-2xl inline" />
          {user.posts.length}
        </p>
      </div>
      <div>
        <h2 className="text-xl ml-4 mb-4 font-semibold">Your Blogs:</h2>
        <hr className="border-black mb-4" />
        {
        postsByUser && postsByUser.length > 0
        ? postsByUser.map(post=> <BlogpostCard key={post._id} post={post} />)
        : <><p className="text-9xl text-center mt-3">&#128533;</p>
        <p className="text-center mt-7 font-bold">No posts to show!</p></>
        }
      </div>
    </div>
  );
};

export default Dashboard;
