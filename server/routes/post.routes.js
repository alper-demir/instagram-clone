import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { createPost, deletePost, getOnePost, updatePost, createComment, likePost, savePost, likeComment, getTimelinePosts } from "../controllers/post.controller.js";


const postRouter = express.Router();

postRouter.get("/timeline-posts/:userId", protectedRoute, getTimelinePosts);

postRouter.post("/", protectedRoute, createPost);
postRouter.put("/postId", protectedRoute, updatePost);
postRouter.delete("/:postId", protectedRoute, deletePost);
postRouter.get("/:postId/:userId", protectedRoute, getOnePost);

postRouter.post("/:postId/comments", protectedRoute, createComment);
postRouter.put("/:postId/like", protectedRoute, likePost);
postRouter.put("/:postId/save", protectedRoute, savePost);
postRouter.put("/comments/:commentId/like", protectedRoute, likeComment);


export default postRouter;