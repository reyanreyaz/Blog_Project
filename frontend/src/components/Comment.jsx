import { Link } from "react-router-dom";
import propTypes from "prop-types";

const Comment = ({ post }) => {
  const sortedComments = post.comments
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <>
      {sortedComments.map((comment) => {
        return (
          <div key={comment._id} className="flex flex-col my-3">
            <Link
              to={`/author/${comment.user._id}`}
              className="font-medium text-green-900"
            >
              {comment.user?.username}
            </Link>
            <p className="text-gray-900">{comment.content}</p>
            <small>
              {comment.createdAt
                ? new Date(post.createdAt).toString().substring(0, 24)
                : "N/A"}
            </small>
            <hr className="border-black" />
          </div>
        );
      })}
    </>
  );
};

Comment.propTypes = {
  post: propTypes.object,
};

export default Comment;
