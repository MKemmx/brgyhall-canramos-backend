const mongoose = require("mongoose");

const ResidentSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  birthPlace: {
    type: String,
  },
  birthDay: {
    type: String,
  },
  civilStatus: {
    type: String,
    enum: ["single", "married", "divorced", "widowed"],
  },
  gender: {
    type: String,
    enum: ["female", "male"],
  },
  voter: {
    type: String,
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "zone",
  },
  citizenship: {
    type: String,
  },
  voterStatus: {
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
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("resident", ResidentSchema);
