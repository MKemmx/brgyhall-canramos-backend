const Router = require("express").Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ADMIN Auth Middlewares
const { AuthMiddleware } = require("../Middleware/AuthMiddleware");
// ADMIN Model
const ModeratorModel = require("../Models/Moderator");

//? LOAD USER CHECK IF ALREADY LOGIN
//? GET REQUEST
//? api/auth-moderator
Router.get("/", AuthMiddleware, async (req, res) => {
  try {
    const moderator = await ModeratorModel.findOne({ _id: req.user.id }).select(
      "-password"
    );

    const data = {
      user: moderator,
      role: "moderator",
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
    const moderatorExist = await ModeratorModel.findOne({ email });
    //! Check if admin exist
    if (!moderatorExist) {
      return res
        .status(400)
        .json({ msg: "No moderator found with that email address!" });
    }
    //   //!  CHECK IF PASSWORD IS SAME
    const isMatch = await bcrypt.compare(password, moderatorExist.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password does not match!" });
    }
    // PAYLOAD
    const payload = {
      user: {
        id: moderatorExist._id,
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
      user: moderatorExist,
      token,
      role: "moderator",
    };

    return res.status(200).json(data);
  } catch (error) {
    console.log("Error message: ", error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = Router;
