import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getUserProfile,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress
} from "../controllers/userController.js";
import authUser from "../middleware/Auth.js";

const userRouter = express.Router();

// Authentication routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

// Protected user routes
userRouter.get("/profile", authUser, getUserProfile);
userRouter.put("/profile", authUser, updateProfile);

// Wishlist routes
userRouter.post("/wishlist/add", authUser, addToWishlist);
userRouter.post("/wishlist/remove", authUser, removeFromWishlist);
userRouter.get("/wishlist", authUser, getWishlist);

// Address routes
userRouter.post("/address", authUser, addAddress);
userRouter.put("/address/:addressId", authUser, updateAddress);
userRouter.delete("/address/:addressId", authUser, deleteAddress);

export default userRouter;