const Router = require("express").Router();

// MIDDLEWARES
const { authMiddleware } = require("../Middleware/AuthMiddleware");

// Controllers
const {
  create_resident,
  read_resident,
  read_user_resident,
  activate_resident,
  update_resident,
  delete_resident,
  read_active_resident,
} = require("../Controllers/residentController");

Router.post("/create-resident", create_resident);
Router.get("/read-resident", authMiddleware, read_resident);
Router.get("/read-active-resident", read_active_resident);
Router.get("/read-user-resident/:id", read_user_resident);
Router.put("/activate-resident/:id", activate_resident);
Router.put("/update-resident/:id", update_resident);
Router.delete("/delete-resident/:id", delete_resident);

module.exports = Router;
