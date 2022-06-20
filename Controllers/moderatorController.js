// Model
const ModeratorModel = require("../Models/Moderator");

// Bcrypt
const bcrypt = require("bcrypt");

// Create Admin
const create_moderator = async (req, res) => {
  const { moderatorName, password, email, phoneNumber } = req.body;
  const existModerator = await ModeratorModel.findOne({ email });
  if (existModerator) {
    return res.status(500).json({ msg: "Email already exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
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
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// Read Moderator
const read_moderator = async (req, res) => {
  try {
    const moderator = await ModeratorModel.find().sort({ created_at: -1 });
    return res
      .status(200)
      .json({ msg: "Success fetching moderator", moderator });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// Update Moderator
const update_moderator = async (req, res) => {
  console.log("Hello Admin");
};

// Delte Moderator
const delete_moderator = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  create_moderator,
  read_moderator,
  update_moderator,
  delete_moderator,
};
