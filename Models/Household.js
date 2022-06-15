const mongoose = require("mongoose");

const HouseholdSchema = mongoose.Schema({
  householdNumber: {
    type: String,
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "zone",
  },
  familyHead: {
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

module.exports = mongoose.model("household", HouseholdSchema);
