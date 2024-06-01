require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const quizRoutes = require("./routes/quizRoutes");
const submissionRoutes = require("./routes/submissionRoutes");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://triviaminefield-risshab-singlas-projects.vercel.app",
  })
);
app.use(express.json());

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://triviaminefield-risshab-singlas-projects.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/api", (req, res) => {
  // console.log("Cookies: ", req.cookies);
  res.status(200).send("Hello from backend");
});

app.get("/", (req, res) => {
  // console.log("Cookies: ", req.cookies);
  res.status(200).send("Hello from backend");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/question", questionRoutes);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/submission", submissionRoutes);

app.use("*", (req, res) => {
  return res.status(200).send("Sorry the URL does not exist");
});

module.exports = app;
