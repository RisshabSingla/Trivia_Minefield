require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const userRoutes = require("./routes/userRoutes");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send("Hello from backend");
});

app.use("/api/v1/users", userRoutes);

app.use("*", (req, res) => {
  return res.status(200).send("Sorry the URL does not exist");
});

module.exports = app;
