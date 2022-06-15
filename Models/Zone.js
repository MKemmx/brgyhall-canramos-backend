const mongoose = require("mongoose");

const ZoneSchema = mongoose.Schema({
  zoneNumber: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("zone", ZoneSchema);
