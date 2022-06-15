const Router = require("express").Router();

const { fetch_dashboard_data } = require("../Controllers/dashboardController");

Router.get("/", fetch_dashboard_data);

module.exports = Router;
