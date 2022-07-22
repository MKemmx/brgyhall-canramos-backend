// Model
const ModeratorModel = require("../Models/Moderator");
const asyncHandler = require("express-async-handler");

// Bcrypt
const bcrypt = require("bcrypt");

// Create Admin
const create_moderator = asyncHandler(async (req, res) => {
  const { moderatorName, password, email, phoneNumber } = req.body;
  const existModerator = await ModeratorModel.findOne({ email });
  if (existModerator) {
    return res.status(500).json({ msg: "Email already exist" });
  }
  const hashedPassword = await bcrypt.hash(password, process.env.SALT);
  const newModerator = new ModeratorModel({
    moderatorName,
    password: hashedPassword,
    email,
    phoneNumber,
  });
  const savedModerator = await newModerator.save();
  return res
    .status(200)
    .json({ msg: "Success creating moderator", savedModerator });
});

// Read Moderator
const read_moderator = asyncHandler(async (req, res) => {
  const moderator = await ModeratorModel.find()
    .select("-password")
    .sort({ created_at: -1 });
  return res.status(200).json({ msg: "Success fetching moderator", moderator });
});

// Update Moderator
const update_moderator = asyncHandler(async (req, res) => {
  console.log("Hello Admin");
});

// Delte Moderator
const delete_moderator = asyncHandler(async (req, res) => {
  const unclearStatus = await ModeratorModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
      },
    }
  );
  return res
    .status(200)
    .json({ msg: "Updated moderator status", unclearStatus });
});

module.exports = {
  create_moderator,
  read_moderator,
  update_moderator,
  delete_moderator,
};
