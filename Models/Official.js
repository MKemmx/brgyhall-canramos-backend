const mongoose = require("mongoose");

const OffcialSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "resident",
  },
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "position",
  },
  term: {
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

module.exports = mongoose.model("official", OffcialSchema);
