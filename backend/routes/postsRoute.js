import express from "express";
const router = express.Router();
import posts from "../controllers/posts.js";

router.route("/").post(posts.handleNewPost).get(posts.fetchPosts)

router.route("/:id").put(posts.editPost).delete(posts.deletePost)

export default router;
