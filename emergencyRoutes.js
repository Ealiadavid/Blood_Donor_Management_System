const express = require("express");
const router = express.Router();

const EmergencyRequest = require("../models/EmergencyRequest");

// Create Emergency Blood Request
router.post("/add", async (req, res) => {

  try {

    const {
      bloodGroup,
      units,
      hospital,
      contact,
      reason
    } = req.body;

    const newRequest = new EmergencyRequest({
      bloodGroup,
      units,
      hospital,
      contact,
      reason
    });

    const savedRequest = await newRequest.save();

    res.status(201).json({
      message: "Emergency Blood Request Added Successfully",
      request: savedRequest
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to add emergency request",
      error: error.message
    });

  }

});

module.exports = router;