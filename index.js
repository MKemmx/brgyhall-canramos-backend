const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

// Database
const db = require("./database");
db();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/position/", require("./Routes/position"));
app.use("/api/official/", require("./Routes/official"));
app.use("/api/resident/", require("./Routes/resident"));
app.use("/api/zone/", require("./Routes/zone"));
app.use("/api/certificate/", require("./Routes/certificate"));
app.use("/api/indigency/", require("./Routes/indigency"));
app.use("/api/activity/", require("./Routes/activity"));
app.use("/api/household/", require("./Routes/household"));
app.use("/api/blotter/", require("./Routes/blotter"));
app.use("/api/dashboard/", require("./Routes/dashboard"));
app.use("/api/admin/", require("./Routes/admin"));
app.use("/api/moderator/", require("./Routes/moderator"));
app.use("/api/transaction/", require("./Routes/transaction"));

// LOGIN AUTH ROUTES || ADMIN && MODERATOR
app.use("/api/auth-admin/", require("./Routes/authAdmin"));
app.use("/api/auth-moderator/", require("./Routes/authModerator"));
app.use("/api/auth-resident/", require("./Routes/authResident"));

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
