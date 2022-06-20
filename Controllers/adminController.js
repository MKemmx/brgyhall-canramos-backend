// Model
const AdminModel = require("../Models/Admin");

// Bcrypt
const bcrypt = require("bcrypt");

// Create Admin
const create_admin = async (req, res) => {
  const { adminName, password, email, phoneNumber } = req.body;
  const existAdmin = await AdminModel.findOne({ email });
  if (existAdmin) {
    return res.status(500).json({ msg: "Email already exist" });
  }
  const hashedPassword = await bcrypt.hash(password, process.env.SALT);
  try {
    const newAdmin = new AdminModel({
      adminName,
      password: hashedPassword,
      email,
      phoneNumber,
    });
    const savedAdmin = await newAdmin.save();
    return res.status(200).json({ msg: "Success creating admin", savedAdmin });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// Read admin
const read_admin = async (req, res) => {
  try {
    const admin = await AdminModel.find()
      .select("-password")
      .sort({ created_at: -1 });
    return res.status(200).json({ msg: "Success fetching admins", admin });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// Update admin
const update_admin = async (req, res) => {
  console.log("Hello Admin");
};

// Delte admin
const delete_admin = async (req, res) => {
  try {
    const unclearStatus = await AdminModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "inactive",
        },
      }
    );
    return res.status(200).json({ msg: "Updated admin status", unclearStatus });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  create_admin,
  read_admin,
  update_admin,
  delete_admin,
};
