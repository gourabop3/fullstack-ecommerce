import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: false,
  },
  discount: {
    type: Number,
    default: 0,
  },
  image: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: false,
  },
  sizes: {
    type: Array,
    required: true,
  },
  colors: {
    type: Array,
    default: [],
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
  specifications: {
    type: Object,
    default: {},
  },
  warranty: {
    type: String,
    default: "1 year",
  },
  returnPolicy: {
    type: String,
    default: "7 days return policy",
  },
  seller: {
    type: String,
    default: "Flipkart",
  },
  tags: {
    type: Array,
    default: [],
  },
  date: {
    type: Number,
    required: true,
  },
});

// Index for search optimization
productSchema.index({ name: 'text', description: 'text', category: 'text', brand: 'text' });

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
