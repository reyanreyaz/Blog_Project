import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axiosInstance from "../../components/api/axios";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/posts");
      return response.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await axiosInstance.post("/posts", initialPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    try {
      const { id } = initialPost;
      const response = await axiosInstance.put(`/posts/${id}`, initialPost);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;

    const response = await axiosInstance.delete(`/posts/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  }
);

export const addComment = createAsyncThunk("posts/addComment", async (initialPost) => {
  const { postId } = initialPost

  const response = await axiosInstance.put(`/comment/${postId}`, initialPost)
  return response.data
})

export const toggleLike = createAsyncThunk(
  "posts/toggleLike",
  async ({ postId, userId }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/like/${postId}`, { postId, userId });
      return response.data;
    } catch (error) {
      console.error("Error liking/unliking post: ", error.response);
      return thunkAPI.rejectWithValue(error.response?.data || "Error occurred");
    }
  }
);


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post._id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post._id !== id);
        state.posts = posts;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { _id } = action.payload;
      
        const postIndex = state.posts.findIndex((post) => post._id === _id);
      
        if (postIndex !== -1) {
          state.posts[postIndex] = action.payload;
        }
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const index = state.posts.findIndex(post => post._id === updatedPost._id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(toggleLike.rejected, (state, action) => {
        console.error("Failed to toggle like: ", action.payload);
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts || [];
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post._id === postId);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.author === userId)
);

export default postsSlice.reducer;
