require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Mess = require("../models/mess.model");

const cities = [
  {
    city: "Dehradun",
    state: "Uttarakhand",
    pincode: "248001",
    lat: 30.3165,
    lng: 78.0322,
  },
  {
    city: "Delhi",
    state: "Delhi",
    pincode: "110001",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301",
    lat: 28.5355,
    lng: 77.391,
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    lat: 17.385,
    lng: 78.4867,
  },
  {
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    lat: 18.5204,
    lng: 73.8567,
  },
  {
    city: "Patna",
    state: "Bihar",
    pincode: "800001",
    lat: 25.5941,
    lng: 85.1376,
  },
  {
    city: "Gaya",
    state: "Bihar",
    pincode: "823001",
    lat: 24.7914,
    lng: 85.0002,
  },
];

const messNames = [
  "Annapurna Mess",
  "Sharma Mess",
  "Student's Choice",
  "Food Junction",
  "Healthy Bites",
  "Royal Kitchen",
  "Maa Ka Rasoi",
  "City Mess",
  "Home Delight",
  "Daily Tiffin",
  "Punjabi Tadka",
  "Biryani House",
  "South Meals",
  "Green Bowl",
  "Fresh Plate",
  "Campus Mess",
  "Sai Bhojanalaya",
  "Taste Point",
  "Happy Meal",
  "Family Kitchen",
];

const owners = [
  "Rakesh Kumar",
  "Amit Singh",
  "Rahul Sharma",
  "Sanjay Verma",
  "Akhil Kumar",
  "Vijay Singh",
  "Manoj Gupta",
  "Ravi Yadav",
  "Pankaj Mishra",
  "Deepak Kumar",
];

const foodTypes = ["Veg", "Non-Veg", "Both"];

const mealOptions = [
  ["Breakfast", "Lunch", "Dinner"],
  ["Lunch", "Dinner"],
  ["Breakfast", "Dinner"],
];

const amenitiesList = [
  "WiFi",
  "Parking",
  "RO Water",
  "Home Delivery",
  "AC",
  "CCTV",
  "Tiffin Service",
];

const images = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
];

const messes = Array.from({ length: 50 }, (_, i) => {
  const city = cities[Math.floor(Math.random() * cities.length)];

  return {
    name: `${messNames[Math.floor(Math.random() * messNames.length)]} ${i + 1}`,
    ownerName: owners[Math.floor(Math.random() * owners.length)],
    phone: `98${Math.floor(10000000 + Math.random() * 89999999)}`,
    email: `mess${i + 1}@example.com`,
    description:
      "Fresh homemade meals with hygienic kitchen and affordable monthly plans.",
    address: `Street ${i + 1}, ${city.city}`,
    city: city.city,
    state: city.state,
    pincode: city.pincode,

    location: {
      latitude: city.lat + (Math.random() - 0.5) * 0.04,
      longitude: city.lng + (Math.random() - 0.5) * 0.04,
    },

    foodType: foodTypes[Math.floor(Math.random() * foodTypes.length)],

    mealType:
      mealOptions[Math.floor(Math.random() * mealOptions.length)],

    monthlyPrice: 2500 + Math.floor(Math.random() * 5500),

    yearlyPrice: null,

    rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),

    totalReviews: Math.floor(Math.random() * 800),

    amenities: amenitiesList.filter(() => Math.random() > 0.5),

    images: [
      images[Math.floor(Math.random() * images.length)],
    ],

    isVerified: Math.random() > 0.2,

    isActive: true,
  };
});
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
