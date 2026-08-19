const Donor = require("../models/Donor");

// Add Donor
exports.addDonor = async (req, res) => {
  try {
    const donor = new Donor(req.body);

    await donor.save();

    res.status(201).json({
      message: "Donor added successfully",
      donor
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Get All Donors
exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();

    res.json(donors);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Get Single Donor
exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    res.json(donor);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Update Donor
exports.updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Donor updated successfully",
      donor
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Delete Donor
exports.deleteDonor = async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);

    res.json({
      message: "Donor deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};