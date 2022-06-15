const mongoose = require("mongoose");

const IndigencySchema = mongoose.Schema({
  residentRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "resident",
  },
  requestPurpose: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("indigency", IndigencySchema);
