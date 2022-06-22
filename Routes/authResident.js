const Router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ADMIN Auth Middlewares
const { AuthMiddleware } = require("../Middleware/AuthMiddleware");
// ADMIN Model
const ResidentModel = require("../Models/Resident");

//? LOAD USER CHECK IF ALREADY LOGIN
//? GET REQUEST
//? api/auth-resident
Router.get("/", AuthMiddleware, async (req, res) => {
  try {
    const resident = await ResidentModel.findOne({ _id: req.user.id }).select(
      "-password"
    );

    const data = {
      user: resident,
      role: "resident",
    };

    return res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//? LOGIN THE USER
//? POST REQUEST
//? api/auth-moderator
Router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const residentExist = await ResidentModel.findOne({ email });
    //! Check if Resident exist
    if (!residentExist) {
      return res
        .status(400)
        .json({ msg: "No resident is found with that email address!" });
    }
    //   //!  CHECK IF PASSWORD IS SAME
    const isMatch = await bcrypt.compare(password, residentExist.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password does not match!" });
    }
    // PAYLOAD
    const payload = {
      user: {
        id: residentExist._id,
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
      user: residentExist,
      token,
      role: "resident",
    };

    // return res.status(200).header("auth-token", token).json(data);

    return res.status(200).json(data);
  } catch (error) {
    console.log("Error message: ", error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = Router;
