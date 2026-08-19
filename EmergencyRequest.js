const mongoose = require("mongoose");

const emergencyRequestSchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: true
    },

    units: {
      type: Number,
      required: true
    },

    hospital: {
      type: String,
      required: true
    },

    contact: {
      type: String,
      required: true
    },

    reason: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "EmergencyRequest",
  emergencyRequestSchema
);