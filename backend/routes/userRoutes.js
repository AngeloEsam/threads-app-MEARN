import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  followAndUnfollowUser,
  updateUser,
  getUserProfile,
  getAllUsers,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();
//get user profile
router.get("/", protectRoute, getAllUsers);
//get user profile
router.get("/profile/:query", getUserProfile);
//register user
router.post("/signup", signupUser);
//login user
router.post("/login", loginUser);
//logout user
router.post("/logout", logoutUser);
//follow and unfollow user
router.post("/follow/:id", protectRoute, followAndUnfollowUser);
//update user
router.put("/update/:id", protectRoute, updateUser);

export default router;
