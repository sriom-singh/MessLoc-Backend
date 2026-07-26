const Mess = require("../models/mess.model");
const { getRecommendations } = require("../services/gemini.services");

exports.recommendMesses = async (req, res) => {
  try {
    const { city, foodType, budget, mealType, amenities = [] } = req.body;

    const filter = {
      isActive: true,
      isVerified: true,
    };

    if (city) filter.city = city;

    if (foodType === "Veg") {
      filter.foodType = { $in: ["Veg", "Both"] };
    } else if (foodType === "Non-Veg") {
      filter.foodType = { $in: ["Non-Veg", "Both"] };
    }

    if (budget) {
      filter.monthlyPrice = {
        $lte: Number(budget),
      };
    }

    if (mealType) {
      filter.mealType = mealType;
    }

    if (amenities.length) {
      filter.amenities = {
        $all: amenities,
      };
    }

    const messes = await Mess.find(filter)
      .sort({ rating: -1 })
      .limit(20)
      .lean();

    if (!messes.length) {
      return res.status(404).json({
        success: false,
        message: "No messes found.",
      });
    }

    const finalRecommendations = await getRecommendations(req.body, messes);
    console.log("Final", finalRecommendations);

    return res.json({
      success: true,
      recommendations: finalRecommendations,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate recommendations.",
    });
  }
};

// Create Mess
exports.createMess = async (req, res) => {
  try {
    const mess = await Mess.create(req.body);

    res.status(201).json({
      success: true,
      data: mess,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Messes
exports.getAllMesses = async (req, res) => {
  console.log("GET request received for all messes");
  try {
    const messes = await Mess.find();

    res.json({
      success: true,
      count: messes.length,
      data: messes,
    });
  } catch (error) {
    console.error("Error fetching messes:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Mess
exports.getMessById = async (req, res) => {
  try {
    const mess = await Mess.findById(req.params.id);

    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }

    res.json({
      success: true,
      data: mess,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Mess
exports.updateMess = async (req, res) => {
  console.log("PUT request received");
  console.log(req.params.id);

  try {
    const mess = await Mess.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }

    res.json({
      success: true,
      data: mess,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Mess
exports.deleteMess = async (req, res) => {
  try {
    const mess = await Mess.findByIdAndDelete(req.params.id);

    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }

    res.json({
      success: true,
      message: "Mess deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
