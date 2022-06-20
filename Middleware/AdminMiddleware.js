const jwt = require("jsonwebtoken");

// Admin Model
const AdminModel = require("../Models/Admin");

const AdminMiddleware = async (req, res, next) => {
  // Get token from header
  const token = req.header("auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const isAdmin = await AdminModel.findOne({ _id: decoded?.user.id }).select(
      "-password"
    );
    if (!isAdmin) {
      return res
        .status(403)
        .json({ msg: "Server error only admin can access this page!" });
    }

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = {
  AdminMiddleware,
};
