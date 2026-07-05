require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Mess = require("../models/Mess");

const messes = [
  {
    name: "Annapurna Mess",
    ownerName: "Rakesh Kumar",
    phone: "9876543210",
    email: "annapurna@example.com",
    description: "Affordable home-style food.",
    address: "Prem Nagar",
    city: "Dehradun",
    state: "Uttarakhand",
    pincode: "248007",
    rating: 4.5,
    totalReviews: 120,
    location: {
      latitude: 30.3165,
      longitude: 78.0322,
    },
    foodType: "Veg",
    mealType: ["Breakfast", "Lunch", "Dinner"],
    monthlyPrice: 3200,
    amenities: ["RO Water", "Home Delivery"],
    images: ["https://images.unsplash.com/photo-1544025162-d76694265947?w=800"],
  },
  {
    name: "Punjabi Tadka Mess",
    ownerName: "Amit Singh",
    phone: "9876543211",
    email: "punjabi@example.com",
    description: "North Indian meals with unlimited chapatis.",
    address: "Ballupur",
    city: "Dehradun",
    state: "Uttarakhand",
    pincode: "248001",
    rating: 4.2,
    totalReviews: 50,
    location: {
      latitude: 30.325,
      longitude: 78.041,
    },
    foodType: "Both",
    mealType: ["Lunch", "Dinner"],
    monthlyPrice: 4000,
    amenities: ["WiFi", "Parking", "RO Water"],
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    ],
  },
  {
    name: "Student's Choice Mess",
    ownerName: "Sanjay Verma",
    phone: "9876543212",
    email: "students@example.com",
    description: "Budget-friendly meals for students.",
    address: "Clement Town",
    city: "Dehradun",
    state: "Uttarakhand",
    rating: 4.0,
    totalReviews: 142,
    pincode: "248002",
    location: {
      latitude: 30.282,
      longitude: 78.019,
    },
    foodType: "Veg",
    mealType: ["Lunch", "Dinner"],
    monthlyPrice: 2800,
    amenities: ["Home Delivery"],
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    ],
  },
  {
    name: "Hyderabad Spice Mess",
    ownerName: "Vijay Singh",
    city: "Hyderabad",
    phone: "9276545210",
    email: "hyderabad@example.com",
    state: "Telangana",
    pincode: "500081",
    address: "Madhapur, Hyderabad",
    foodType: "Non-Veg",
    monthlyPrice: 4000,
    mealType: ["Lunch", "Dinner"],
    images: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    ],
    rating: 4.9,
    totalReviews: 892,
    location: {
      latitude: 17.4485,
      longitude: 78.3908,
    },
    amenities: ["Home Delivery", "WiFi", "Parking"],
  },
  {
    name: "South Indian Meals",
    city: "Bengaluru",
    phone: "7276593210",
    email: "southindian@example.com",
    ownerName: "Akhil Kumar",
    state: "Karnataka",
    pincode: "560034",
    address: "Koramangala, Bengaluru",
    foodType: "Veg",
    monthlyPrice: 5800,
    images: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    ],
    rating: 4.7,
    totalReviews: 476,
    amenities: ["WiFi", "Home Delivery"],
    location: {
      latitude: 12.9352,
      longitude: 77.6245,
    },
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Remove existing data
    await Mess.deleteMany();

    // Insert sample data
    await Mess.insertMany(messes);

    console.log("✅ Mess data seeded successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
