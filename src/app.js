const express = require("express");
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());


const messes = [
  {
    id: 1,
    name: "Annapurna Mess",
    city: "Dehradun",
    state: "Uttarakhand",
    pinCode: "248001",
    address: "Rajpur Road, Dehradun",
    foodType: "Vegetarian",
    pricePerMonth: 4500,
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    rating: 4.6,
    totalRatings: 328,
    location: {
      latitude: 30.3165,
      longitude: 78.0322,
    },
  },
  {
    id: 2,
    name: "Tandoori Delight",
    city: "Delhi",
    state: "Delhi",
    pinCode: "110001",
    address: "Karol Bagh, New Delhi",
    foodType: "Non-Vegetarian",
    pricePerMonth: 6500,
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    rating: 4.8,
    totalRatings: 615,
    location: {
      latitude: 28.6448,
      longitude: 77.2167,
    },
  },
  {
    id: 3,
    name: "Student's Kitchen",
    city: "Pune",
    state: "Maharashtra",
    pinCode: "411007",
    address: "Aundh, Pune",
    foodType: "Vegetarian",
    pricePerMonth: 5000,
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    rating: 4.4,
    totalRatings: 241,
    location: {
      latitude: 18.559,
      longitude: 73.7868,
    },
  },
  {
    id: 4,
    name: "Hyderabad Spice Mess",
    city: "Hyderabad",
    state: "Telangana",
    pinCode: "500081",
    address: "Madhapur, Hyderabad",
    foodType: "Non-Vegetarian",
    pricePerMonth: 7000,
    imageUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    rating: 4.9,
    totalRatings: 892,
    location: {
      latitude: 17.4485,
      longitude: 78.3908,
    },
  },
  {
    id: 5,
    name: "South Indian Meals",
    city: "Bengaluru",
    state: "Karnataka",
    pinCode: "560034",
    address: "Koramangala, Bengaluru",
    foodType: "Vegetarian",
    pricePerMonth: 5800,
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    rating: 4.7,
    totalRatings: 476,
    location: {
      latitude: 12.9352,
      longitude: 77.6245,
    },
  },
  {
    id: 6,
    name: "Royal Punjabi Mess",
    city: "Chandigarh",
    state: "Chandigarh",
    pinCode: "160022",
    address: "Sector 22, Chandigarh",
    foodType: "Both Veg & Non-Veg",
    pricePerMonth: 6200,
    imageUrl:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    rating: 4.5,
    totalRatings: 389,
    location: {
      latitude: 30.7333,
      longitude: 76.7794,
    },
  },
];

app.get("/messes", (req, res) => {
  res.json(messes);
});

app.get("/messes/search", (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res.status(400).json({
      message: "Search query is required",
    });
  }

  const results = messes.filter((mess) => {
    return (
      mess.name.toLowerCase().includes(query) ||
      mess.city.toLowerCase().includes(query) ||
      mess.state.toLowerCase().includes(query) ||
      mess.foodType.toLowerCase().includes(query)
    );
  });

  res.status(200).json(results);
});

app.post("/messes", (req, res) => {
  const {
    name,
    city,
    state,
    pinCode,
    address,
    foodType,
    pricePerMonth,
    imageUrl,
    rating,
    totalRatings,
    location,
  } = req.body;
  newMess = {
    id: messes.length + 1,
    name,
    city,
    state,
    pinCode,
    address,
    foodType,
    pricePerMonth,
    imageUrl,
    rating,
    totalRatings,
    location,
  };
  messes.push(newMess);
  res.status(201).json({ message: "Mess added successfully" });
});

app.get("/messes/:id", (req, res) => {
  const messId = parseInt(req.params.id);
  const mess = messes.find((m) => m.id === messId);
  if (mess) {
    res.json(mess);
  } else {
    res.status(404).json({ message: "Mess not found!" });
  }
});

app.put("/messes/:id", (req, res) => {
  const messId = parseInt(req.params.id);
  const mess = req.body;
  const messIndex = messes.findIndex((m) => m.id === messId);

  if (messIndex === -1) {
    return res.status(404).json({
      message: "Mess not found!",
    });
  }
  messes[messIndex]={
    ...messes[messIndex],
    ...mess,
    id:messId
  }
   res.status(200).json({
    message: "Mess updated successfully",
    data: messes[messIndex],
  });
});

app.delete("/messes/:id",(req,res)=>{
    const messId = parseInt(req.params.id);
    const messIndex = messes.findIndex((m)=>m.id==messId);

    if (messIndex === -1) {
        return res.status(404).json({
        message: "Mess not found!",
    });
}

    const deletedMess = messes.splice(messIndex, 1);

    res.status(200).json({
    message: "Mess deleted successfully",
    data: deletedMess[0],
    });

}) 






module.exports = app;
