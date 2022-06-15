const mongoose = require("mongoose");

const BlotterSchema = mongoose.Schema({
  complainant: {
    type: String,
  },
  complainantPhoneNumber: {
    type: String,
  },
  complainantAddress: {
    type: String,
  },
  incident: {
    type: String,
  },
  incidentDate: {
    type: String,
  },
  incidentLocation: {
    type: String,
  },
  complainee: {
    type: String,
  },
  complaineeDetails: {
    type: String,
  },

  schedule: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("blotter", BlotterSchema);
