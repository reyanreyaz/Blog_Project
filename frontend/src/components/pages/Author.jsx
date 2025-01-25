import BlogpostCard from "../BlogpostCard.jsx";
import { FaPencil } from "react-icons/fa6";
import { useParams } from 'react-router-dom'
import { selectUserById } from '../../features/users/usersSlice.js'
import { useSelector } from "react-redux";
import { selectPostsByUser } from '../../features/posts/postsSlice.js'

const Author = () => {
  const { authorId } = useParams()
  const author = useSelector(state=> selectUserById(state, authorId))
  const postsByAuthor = useSelector(state=> selectPostsByUser(state, authorId))

  return (
    <div>
      <h1 className="text-center text-3xl font-semibold my-3">{author.username}</h1>
      <p className="text-center mx-auto w-2/3">
      {author.description}
      </p>
      <div className="flex gap-8 justify-center my-5">
        <p>
        <FaPencil className="text-2xl inline" />
          {author.posts.length}</p>
      </div>
      {postsByAuthor.map(post=> <BlogpostCard key={post._id} post={post} />)}
    </div>
  );
};

export default Author;
