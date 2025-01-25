import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import propTypes from 'prop-types'
import { useDispatch } from "react-redux";
import { deletePost } from "../features/posts/postsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

const EditDelete = ({ postId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      dispatch(deletePost({ id: postId })).unwrap()
      navigate('/')
      toast.success("Post Deleted!")
  } catch (err) {
      console.error('Failed to delete the post', err)
  }  }

  return (
    <div className="flex">
      <Link to={`/edit/${postId}`}>
        <MdEdit className="text-3xl fill-green-700 hover:fill-green-800" />
      </Link>
      <MdDelete onClick={handleDelete} className="text-3xl fill-red-700 hover:fill-red-800" />
    </div>
  );
};

EditDelete.propTypes = {
  postId: propTypes.string
}

export default EditDelete;
