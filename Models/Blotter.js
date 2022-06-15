const mongoose = require("mongoose");

const BlotterSchema = mongoose.Schema({
  complainant: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  complainantAddress: {
    type: String,
  },
  incident: {
    type: String,
  },
  incidentDate: {
    type: Date,
  },
  incidentLocation: {
    type: String,
  },
  Complainee: {
    type: String,
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
