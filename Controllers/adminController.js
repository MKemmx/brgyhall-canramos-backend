// Model
const AdminModel = require("../Models/Admin");
const asyncHandler = require("express-async-handler");
// Bcrypt
const bcrypt = require("bcrypt");

// Create Admin
const create_admin = asyncHandler(async (req, res) => {
  const { adminName, password, email, phoneNumber } = req.body;
  const existAdmin = await AdminModel.findOne({ email });
  if (existAdmin) {
    return res.status(500).json({ msg: "Email already exist" });
  }
  const hashedPassword = await bcrypt.hash(password, process.env.SALT);
  const newAdmin = new AdminModel({
    adminName,
    password: hashedPassword,
    email,
    phoneNumber,
  });
  const savedAdmin = await newAdmin.save();
  return res.status(200).json({ msg: "Success creating admin", savedAdmin });
});
// Read admin
const read_admin = asyncHandler(async (req, res) => {
  const admin = await AdminModel.find()
    .select("-password")
    .sort({ created_at: -1 });
  return res.status(200).json({ msg: "Success fetching admins", admin });
});
// Update admin
const update_admin = asyncHandler(async (req, res) => {
  console.log("Hello Admin");
});
// Delte admin
const delete_admin = asyncHandler(async (req, res) => {
  const unclearStatus = await AdminModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
      },
    }
  );
  return res.status(200).json({ msg: "Updated admin status", unclearStatus });
});

module.exports = {
  create_admin,
  read_admin,
  update_admin,
  delete_admin,
};
