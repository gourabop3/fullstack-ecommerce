import mongoose from 'mongoose';
import productModel from '../models/productModel.js';
import 'dotenv/config';

const sampleProducts = [
  {
    name: "Samsung Galaxy S23 Ultra",
    description: "Premium flagship smartphone with S Pen, advanced camera system, and exceptional performance",
    price: 89999,
    originalPrice: 124999,
    category: "Electronics",
    subCategory: "Smartphones",
    brand: "Samsung",
    sizes: ["128GB", "256GB", "512GB"],
    colors: ["Phantom Black", "Green", "Cream"],
    stock: 50,
    bestseller: true,
    featured: true,
    specifications: {
      "Display": "6.8 inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 2",
      "RAM": "12GB",
      "Camera": "200MP + 12MP + 10MP + 10MP",
      "Battery": "5000mAh"
    },
    warranty: "1 year manufacturer warranty",
    returnPolicy: "7 days return policy",
    seller: "Samsung Official Store",
    tags: ["smartphone", "android", "5g", "flagship"],
    image: [
      "https://images.samsung.com/is/image/samsung/p6pim/in/2302/gallery/in-galaxy-s23-ultra-s918-sm-s918bzkqins-534851293",
      "https://images.samsung.com/is/image/samsung/p6pim/in/2302/gallery/in-galaxy-s23-ultra-s918-sm-s918bzkqins-534851294",
      "https://images.samsung.com/is/image/samsung/p6pim/in/2302/gallery/in-galaxy-s23-ultra-s918-sm-s918bzkqins-534851295"
    ],
    date: Date.now()
  },
  {
    name: "Apple iPhone 15 Pro",
    description: "Titanium build, A17 Pro chip, Pro camera system with 5x telephoto",
    price: 134900,
    originalPrice: 134900,
    category: "Electronics",
    subCategory: "Smartphones",
    brand: "Apple",
    sizes: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    stock: 30,
    bestseller: true,
    featured: true,
    specifications: {
      "Display": "6.1 inch Super Retina XDR",
      "Processor": "A17 Pro",
      "Storage": "128GB to 1TB",
      "Camera": "48MP + 12MP + 12MP",
      "Battery": "Up to 23 hours video playback"
    },
    warranty: "1 year limited warranty",
    returnPolicy: "14 days return policy",
    seller: "Apple Authorized Reseller",
    tags: ["iphone", "ios", "apple", "premium"],
    image: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium",
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium",
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-whitetitanium"
    ],
    date: Date.now()
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise cancellation with premium sound quality",
    price: 29990,
    originalPrice: 34990,
    category: "Electronics",
    subCategory: "Audio",
    brand: "Sony",
    sizes: ["One Size"],
    colors: ["Black", "Silver"],
    stock: 75,
    bestseller: true,
    featured: false,
    specifications: {
      "Driver": "30mm",
      "Frequency Response": "4Hz-40kHz",
      "Battery Life": "30 hours with ANC",
      "Connectivity": "Bluetooth 5.2, USB-C",
      "Weight": "250g"
    },
    warranty: "1 year international warranty",
    returnPolicy: "10 days return policy",
    seller: "Sony India",
    tags: ["headphones", "wireless", "noise-cancelling", "premium"],
    image: [
      "https://www.sony.co.in/image/5d02da5df552836db894574fcfce6b4f?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
      "https://www.sony.co.in/image/0d0d5d5c9b4d34e4d13c1d5f5c5c5c5c?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF"
    ],
    date: Date.now()
  },
  {
    name: "Nike Air Force 1 '07",
    description: "Classic basketball shoe with iconic design and premium comfort",
    price: 7495,
    originalPrice: 7495,
    category: "Fashion",
    subCategory: "Shoes",
    brand: "Nike",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["White", "Black", "Red"],
    stock: 100,
    bestseller: true,
    featured: false,
    specifications: {
      "Upper": "Leather",
      "Sole": "Rubber",
      "Closure": "Laces",
      "Style": "Low Top"
    },
    warranty: "6 months manufacturing defect warranty",
    returnPolicy: "30 days return policy",
    seller: "Nike Official Store",
    tags: ["shoes", "sneakers", "basketball", "classic"],
    image: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/00375837-849f-4f17-ba24-d201d27be6b1/air-force-1-07-shoes-WrLlWX.png"
    ],
    date: Date.now()
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Premium running shoe with boost technology for ultimate energy return",
    price: 16999,
    originalPrice: 16999,
    category: "Fashion",
    subCategory: "Shoes",
    brand: "Adidas",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Core Black", "Cloud White", "Solar Red"],
    stock: 80,
    bestseller: false,
    featured: true,
    specifications: {
      "Upper": "Primeknit",
      "Sole": "Boost",
      "Drop": "10mm",
      "Weight": "320g"
    },
    warranty: "6 months warranty",
    returnPolicy: "30 days return policy",
    seller: "Adidas Official",
    tags: ["running", "boost", "athletic", "performance"],
    image: [
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GX3060_01_standard.jpg",
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8a7fb8b4e3b44e278d3cad7800abcdcd_9366/Ultraboost_22_Shoes_Black_GX3060_02_standard_hover.jpg"
    ],
    date: Date.now()
  },
  {
    name: "Levi's 501 Original Jeans",
    description: "Classic straight fit jeans with original button fly",
    price: 4999,
    originalPrice: 5999,
    category: "Fashion",
    subCategory: "Clothing",
    brand: "Levi's",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Blue", "Black", "Light Blue"],
    stock: 120,
    bestseller: true,
    featured: false,
    specifications: {
      "Material": "100% Cotton Denim",
      "Fit": "Straight",
      "Rise": "Mid",
      "Closure": "Button Fly"
    },
    warranty: "No warranty",
    returnPolicy: "30 days return policy",
    seller: "Levi's Store",
    tags: ["jeans", "denim", "classic", "casual"],
    image: [
      "https://lsco.scene7.com/is/image/lsco/005010000-front-pdp-lse?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,8,0&fit=crop,0&wid=750&hei=1000",
      "https://lsco.scene7.com/is/image/lsco/005010000-back-pdp-lse?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,8,0&fit=crop,0&wid=750&hei=1000"
    ],
    date: Date.now()
  },
  {
    name: "MacBook Air M2",
    description: "Supercharged by the M2 chip, incredibly thin and light laptop",
    price: 114900,
    originalPrice: 119900,
    category: "Electronics",
    subCategory: "Laptops",
    brand: "Apple",
    sizes: ["8GB/256GB", "8GB/512GB", "16GB/512GB"],
    colors: ["Space Gray", "Silver", "Gold", "Midnight"],
    stock: 25,
    bestseller: true,
    featured: true,
    specifications: {
      "Processor": "Apple M2 chip",
      "Display": "13.6-inch Liquid Retina",
      "Memory": "8GB to 24GB",
      "Storage": "256GB to 2TB SSD",
      "Battery": "Up to 18 hours"
    },
    warranty: "1 year limited warranty",
    returnPolicy: "14 days return policy",
    seller: "Apple Authorized Reseller",
    tags: ["laptop", "macbook", "m2", "ultrabook"],
    image: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665",
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-spacegray-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303448"
    ],
    date: Date.now()
  },
  {
    name: "Dell XPS 13",
    description: "Premium ultrabook with stunning InfinityEdge display",
    price: 94990,
    originalPrice: 109990,
    category: "Electronics",
    subCategory: "Laptops",
    brand: "Dell",
    sizes: ["8GB/256GB", "16GB/512GB", "16GB/1TB"],
    colors: ["Platinum Silver", "Frost White"],
    stock: 40,
    bestseller: false,
    featured: true,
    specifications: {
      "Processor": "Intel 12th Gen Core i7",
      "Display": "13.4-inch FHD+",
      "Memory": "8GB to 32GB LPDDR5",
      "Storage": "256GB to 2TB SSD",
      "Graphics": "Intel Iris Xe"
    },
    warranty: "1 year onsite warranty",
    returnPolicy: "15 days return policy",
    seller: "Dell Official Store",
    tags: ["laptop", "ultrabook", "windows", "business"],
    image: [
      "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/13-9320/media-gallery/silver/notebook-xps-13-9320-silver-gallery-4.psd?fmt=pjpg&pscan=auto&scl=1&wid=3491&hei=2620&qlt=100,1&resMode=sharp2&size=3491,2620&chrss=full&imwidth=5000",
      "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/13-9320/media-gallery/silver/notebook-xps-13-9320-silver-gallery-1.psd?fmt=pjpg&pscan=auto&scl=1&wid=3491&hei=2620&qlt=100,1&resMode=sharp2&size=3491,2620&chrss=full&imwidth=5000"
    ],
    date: Date.now()
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI + '/e-commerce');
    console.log('Connected to MongoDB');

    // Clear existing products
    await productModel.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await productModel.insertMany(sampleProducts);
    console.log('Sample products inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();