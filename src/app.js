const express = require("express");
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());


const messes = [
  {
    id: 1,
    name: "Mess 1",
    city: "Dehradun",
    state: "Uttarakhand",
    pinCode: "248002",
    address: "123 Main Street, Dehradun",
    foodType: "Vegetarian",
    pricePerMonth: 5000,
    imageUrl: "https://example.com/mess1.jpg",
    rating: 4.5,
    location: {
      latitude: 30.3165,
      longitude: 78.0322,
    },
  },
  {
    id: 2,
    name: "Mess 2",
    city: "Dehradun",
    pinCode: "248001",
    state: "Uttarakhand",
    address: "456 Elm Street, Dehradun",
    foodType: "Non-Vegetarian",
    pricePerMonth: 6000,
    imageUrl: "https://example.com/mess2.jpg",
    rating: 4.2,
    location: {
      latitude: 30.3165,
      longitude: 78.0322,
    },
  },
];

app.get("/messes", (req, res) => {
  res.json(messes);
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




module.exports = app;
