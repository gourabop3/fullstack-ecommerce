import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  addReview,
  getReviews,
  getFeaturedProducts,
  getBestsellerProducts,
  getRelatedProducts
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/Auth.js";

const productRouter = express.Router();

// Admin routes
productRouter.post("/add", adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove", adminAuth, removeProduct);

// Public routes
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);
productRouter.get("/featured", getFeaturedProducts);
productRouter.get("/bestseller", getBestsellerProducts);
productRouter.get("/related/:productId", getRelatedProducts);

// Review routes
productRouter.post("/review", authUser, addReview);
productRouter.get("/reviews/:productId", getReviews);

export default productRouter;
