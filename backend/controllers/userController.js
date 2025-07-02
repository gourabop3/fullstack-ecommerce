import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
// import createError from "http-errors";
// import { createToken } from "../helpers/jsonwebtoken.js";
// import { errorResponse, successResponse } from "./response.controller.js";
// import { adminEmail, adminPassword, jwtSecret } from "../secret.js";
import jwt from "jsonwebtoken";

const createToken =(id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

//route for user register
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //check user already exists
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.json({success:false, message:"User already Registered"})
    }

    //validating email and strong password
    if (!validator.isEmail(email)) {
      return res.json({success:false, message:"Please enter a valid email"})
    }
    
    if (password.length < 8) {
      return res.json({success:false, message:"Password must be 8char+ "})
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save()
    
    //create token
    const token = createToken(user._id);
    res.json({success:true,token})
  } catch (error) {
    console.log(error);
    res.json({success:false, message: error.message})
    
  }
   
}

//route for user login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({success:false, message:"User does not exist"})
    }

    const isMatch = await  bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({success:true, token})
    }
    else{
      res.json({success:false, message:"Invalid Credentials"})
    }

  } catch (error) {
    res.json({success:false,message : error.message})
  }
};

////route for admin login
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({success:true,token})
    }
    else{
      res.json({success:false,message:"invalid Credentials"})
    }
  } catch (error) {
    res.json({success:false,message : error.message})
  }
};

// Add to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.user;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.wishlist.includes(productId)) {
      return res.json({ success: false, message: "Product already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();

    res.json({ success: true, message: "Product added to wishlist" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req.user;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    res.json({ success: true, message: "Product removed from wishlist" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get wishlist
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.user;
    
    const user = await userModel.findById(userId).populate('wishlist');
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    
    const user = await userModel.findById(userId).select('-password');
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name, phone } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Add user address
const addAddress = async (req, res) => {
  try {
    const { userId } = req.user;
    const addressData = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.addresses.push(addressData);
    await user.save();

    res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update user address
const updateAddress = async (req, res) => {
  try {
    const { userId } = req.user;
    const { addressId } = req.params;
    const addressData = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.json({ success: false, message: "Address not found" });
    }

    user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...addressData };
    await user.save();

    res.json({ success: true, message: "Address updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete user address
const deleteAddress = async (req, res) => {
  try {
    const { userId } = req.user;
    const { addressId } = req.params;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
    await user.save();

    res.json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { 
  registerUser, 
  loginUser, 
  adminLogin, 
  addToWishlist, 
  removeFromWishlist, 
  getWishlist, 
  getUserProfile, 
  updateProfile, 
  addAddress, 
  updateAddress, 
  deleteAddress 
};
