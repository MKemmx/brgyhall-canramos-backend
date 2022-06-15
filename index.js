const express = require("express");
const cors = require("cors");
const app = express();

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

// Server
app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
