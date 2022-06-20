const Router = require("express").Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ADMIN Auth Middlewares
const { AdminMiddleware } = require("../Middleware/AdminMiddleware");

// ADMIN Model
const AdminModel = require("../Models/Admin");

//? LOAD USER CHECK IF ALREADY LOGIN
//? GET REQUEST
//? api/auth-admin
Router.get("/", AdminMiddleware, async (req, res) => {
  try {
    const admin = await AdminModel.findOne({ _id: req.user.id }).select(
      "-password"
    );

    const data = {
      user: admin,
      role: "admin",
    };

    return res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//? LOGIN THE USER
//? POST REQUEST
//? api/auth-admin
Router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminExist = await AdminModel.findOne({ email });
    //! Check if admin exist
    if (!adminExist) {
      return res
        .status(400)
        .json({ msg: "No admin found with that email address!" });
    }
    //   //!  CHECK IF PASSWORD IS SAME
    const isMatch = await bcrypt.compare(password, adminExist.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password does not match!" });
    }
    // PAYLOAD
    const payload = {
      role: "admin",
      user: {
        id: adminExist._id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    if (!token) {
      return res.status(500).json({ msg: "Something went wrong!" });
    }
    // SUCCESS THROW TOKEN

    const data = {
      user: adminExist,
      token,
      role: "admin",
    };

    return res.status(200).json(data);
  } catch (error) {
    console.log("Error message: ", error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = Router;
