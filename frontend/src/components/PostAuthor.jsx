import { useSelector } from "react-redux";
import { selectUserById } from "../features/users/usersSlice.js";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId));

  return (
    <span>
      by{" "}
      <Link to={`/author/${author?._id}`} className="text-green-900">
        {author?.username}
      </Link>
    </span>
  );
};

PostAuthor.propTypes = {
  userId: propTypes.string,
};

export default PostAuthor;
