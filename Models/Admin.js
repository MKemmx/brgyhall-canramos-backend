const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  adminName: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
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

module.exports = mongoose.model("admin", AdminSchema);
