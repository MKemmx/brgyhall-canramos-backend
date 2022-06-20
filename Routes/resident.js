const Router = require("express").Router();

// MIDDLEWARES
const { AuthMiddleware } = require("../Middleware/AuthMiddleware");
const { AdminMiddleware } = require("../Middleware/AdminMiddleware");

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
Router.get("/read-resident", AuthMiddleware, read_resident);
Router.get("/read-active-resident", AuthMiddleware, read_active_resident);
Router.get("/read-user-resident/:id", AuthMiddleware, read_user_resident);
Router.put("/activate-resident/:id", AuthMiddleware, activate_resident);
Router.put("/update-resident/:id", AuthMiddleware, update_resident);
Router.delete("/delete-resident/:id", AuthMiddleware, delete_resident);

module.exports = Router;
