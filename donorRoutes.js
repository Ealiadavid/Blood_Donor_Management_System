const express = require("express");
const router = express.Router();

const {
  addDonor,
  getDonors,
  getDonorById,
  updateDonor,
  deleteDonor
} = require("../controllers/donorController");

const Donor = require("../models/Donor");



// Add Donor
router.post("/add", addDonor);



// Get All Donors
router.get("/", getDonors);



// Search Donor
router.get("/search/:keyword", async (req, res) => {

  try {

    const keyword = req.params.keyword;


    const donors = await Donor.find({

      $or: [

        {
          name: {
            $regex: keyword,
            $options: "i"
          }
        },

        {
          bloodGroup: {
            $regex: keyword,
            $options: "i"
          }
        }

      ]

    });


    res.json(donors);


  } catch (error) {

    res.status(500).json({
      message: "Search Error",
      error: error.message
    });

  }

});




// Dashboard Count
router.get("/dashboard/count", async (req, res) => {

  try {

    const totalDonors = await Donor.countDocuments();

    const groups = await Donor.distinct("bloodGroup");


    res.status(200).json({

      totalDonors: totalDonors,

      bloodGroups: groups.length

    });


  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

});




// Blood Group Count (Chart API)
router.get("/bloodgroup/count", async (req, res) => {

  try {


    const bloodGroups = await Donor.aggregate([

      {

        $group: {

          _id: "$bloodGroup",

          count: {
            $sum: 1
          }

        }

      }

    ]);


    res.json(bloodGroups);


  } catch (error) {


    console.log(error);


    res.status(500).json({

      message: error.message

    });


  }

});




// Get Single Donor
router.get("/:id", getDonorById);



// Update Donor
router.put("/:id", updateDonor);



// Delete Donor
router.delete("/:id", deleteDonor);



module.exports = router;