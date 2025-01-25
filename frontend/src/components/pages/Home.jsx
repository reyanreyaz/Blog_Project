import CreateButton from "../CreateButton";
import BlogpostCard from "../BlogpostCard";
import { useEffect } from "react";
import { SyncLoader } from 'react-spinners'
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "../../features/posts/postsSlice.js";

const Home = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  let content;
  if (postStatus === "loading") {
    content = <SyncLoader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>;
  } else if (postStatus === "succeeded") {
    if (!posts || posts.length === 0) {
      content = (
        <p className="text-red-700 text-2xl text-center mt-9">
          No posts available
        </p>
      );
    } else {
      const orderedPosts = posts
        ?.slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      content = orderedPosts.map((post) => (
        <BlogpostCard key={post._id} post={post} />
      ));
    }
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="overflow-x-hidden">
      <CreateButton />
      {content}
    </div>
  );
};

export default Home;
