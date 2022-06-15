const Router = require("express").Router();

// Controllers
const {
  create_household,
  read_household,
  read_one_household,
} = require("../Controllers/householdController");

Router.post("/create-household", create_household);
Router.get("/read-household", read_household);
Router.get("/read-household/:id", read_one_household);

module.exports = Router;
