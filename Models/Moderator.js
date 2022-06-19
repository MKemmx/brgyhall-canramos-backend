const mongoose = require("mongoose");

const ModeratorSchema = mongoose.Schema({
  moderatorName: {
    type: String,
  },
  password: {
    type: String,
  },
  emaill: {
    type: String,
  },
  phoneNumber: {
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
});

module.exports = mongoose.model("moderator", ModeratorSchema);
