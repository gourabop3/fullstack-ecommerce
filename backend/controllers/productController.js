import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
// import createError from "http-errors";
// import { successResponse } from "./response.controller.js";
import mongoose from "mongoose";

//add product
const addProduct = async (req, res, next) => {
  try {
    const { 
      name, 
      description, 
      price, 
      originalPrice,
      category, 
      subCategory, 
      brand,
      sizes, 
      colors,
      stock,
      bestseller,
      featured,
      specifications,
      warranty,
      returnPolicy,
      seller,
      tags
    } = req.body;
    
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((img) => img !== undefined);

    let imagesURL = await Promise.all(
      images.map(async (img) => {
        let result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
          folder: "flipkart-products"
        });

        return result.secure_url;
      })
    );

    // Calculate discount percentage
    const calculatedDiscount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const productData = {
      name,
      description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Number(price),
      discount: calculatedDiscount,
      category,
      subCategory,
      brand: brand || "",
      sizes: JSON.parse(sizes),
      colors: colors ? JSON.parse(colors) : [],
      stock: Number(stock) || 0,
      bestseller: bestseller === "true" ? true : false,
      featured: featured === "true" ? true : false,
      specifications: specifications ? JSON.parse(specifications) : {},
      warranty: warranty || "1 year",
      returnPolicy: returnPolicy || "7 days return policy",
      seller: seller || "Flipkart",
      tags: tags ? JSON.parse(tags) : [],
      image: imagesURL,
      date: Date.now(),
    };
    
    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.json({success:true , message:"Product added"})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
};

//list all product with filters and search
const listProducts = async (req, res, next) => {
  try {
    const { 
      search, 
      category, 
      subCategory, 
      brand,
      minPrice, 
      maxPrice, 
      rating,
      sortBy,
      page = 1,
      limit = 12
    } = req.query;

    let query = {};
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    // Category filter
    if (category) {
      query.category = category;
    }
    
    // SubCategory filter
    if (subCategory) {
      query.subCategory = subCategory;
    }
    
    // Brand filter
    if (brand) {
      query.brand = brand;
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Rating filter
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Stock filter (only show in-stock products)
    query.stock = { $gt: 0 };

    // Sorting
    let sort = {};
    switch (sortBy) {
      case 'price_low':
        sort.price = 1;
        break;
      case 'price_high':
        sort.price = -1;
        break;
      case 'rating':
        sort.rating = -1;
        break;
      case 'newest':
        sort.date = -1;
        break;
      case 'popularity':
        sort.numReviews = -1;
        break;
      default:
        sort.date = -1;
    }

    // Pagination
    const skip = (page - 1) * limit;
    
    const products = await productModel
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));
      
    const totalProducts = await productModel.countDocuments(query);
    
    res.json({
      success: true, 
      products,
      totalProducts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit)
    });

  } catch (error) {
    console.log(error);
    res.json({success:false , message: error.message})
  }
};

//remove product
const removeProduct = async (req, res, next) => {
  try {
     await productModel.findOneAndDelete(req.body.id);
     res.json({success:true, message:"Product Deleted"})

  } catch (error) {
    console.log(error);
   res.json({success:false , message: error.message})
  }
};


//get single product
const singleProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({success:true,product})

  } catch (error) {
   console.log(error);
   res.json({success:false , message: error.message})
   
  }
};

// Add product review
const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const { userId } = req.user;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    // Check if user already reviewed this product
    const existingReview = product.reviews.find(
      review => review.user.toString() === userId.toString()
    );

    if (existingReview) {
      return res.json({ success: false, message: "You have already reviewed this product" });
    }

    // Get user details
    const user = await mongoose.model('user').findById(userId);
    
    const review = {
      user: userId,
      name: user.name,
      rating: Number(rating),
      comment,
      date: new Date()
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    
    // Calculate average rating
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();

    res.json({ success: true, message: "Review added successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get product reviews
const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId).populate('reviews.user', 'name avatar');
    
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      reviews: product.reviews,
      rating: product.rating,
      numReviews: product.numReviews
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get featured products
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await productModel.find({ featured: true }).limit(8);
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get bestseller products
const getBestsellerProducts = async (req, res) => {
  try {
    const products = await productModel.find({ bestseller: true }).limit(8);
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get related products
const getRelatedProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    const relatedProducts = await productModel.find({
      $and: [
        { _id: { $ne: productId } },
        {
          $or: [
            { category: product.category },
            { subCategory: product.subCategory },
            { brand: product.brand }
          ]
        }
      ]
    }).limit(8);

    res.json({ success: true, products: relatedProducts });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { 
  addProduct, 
  listProducts, 
  removeProduct, 
  singleProduct, 
  addReview, 
  getReviews, 
  getFeaturedProducts, 
  getBestsellerProducts, 
  getRelatedProducts 
};
