const mongoose = require("mongoose");

const ActivitySchema = mongoose.Schema({
  user: {
    type: String,
  },
  activityDescription: {
    type: String,
  },
  activityDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("activity", ActivitySchema);
