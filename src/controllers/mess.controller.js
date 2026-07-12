const Mess = require("../models/mess.model");

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
    const mess = await Mess.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

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