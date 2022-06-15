const mongoose = require("mongoose");

const HouseholdSchema = mongoose.Schema({
  householdNumber: {
    type: String,
  },
  familyHead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "resident",
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
