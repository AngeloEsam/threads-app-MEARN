import express from "express";
import {
    createPost,
    getPost,
    getAllPosts,
    deletePost,
    likeUnlikePost,
    replyToPost,
    getFeedPosts,
    getUserPosts
} from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();
//get feed posts
router.get("/feed",protectRoute, getFeedPosts);
//get all posts
router.get("/", getAllPosts);
//get post
router.get("/:id", getPost);
//get user posts
router.get("/user/:username", getUserPosts);
//create post
router.post("/create",protectRoute, createPost);
//delete post
router.delete("/:id",protectRoute, deletePost);
//like and unlike post
router.put("/like/:id",protectRoute, likeUnlikePost);
//reply to  post
router.put("/reply/:id",protectRoute, replyToPost);

export default router;