const mongoose = require("mongoose");

const PositionSchema = mongoose.Schema({
  position: {
    type: String,
  },
  maximum: {
    type: Number,
  },
  elected: {
    type: Number,
    default: 0,
  },
  previous_elected: [
    {
      term: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "resident",
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("position", PositionSchema);
