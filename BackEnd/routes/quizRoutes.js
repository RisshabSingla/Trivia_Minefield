const router = require("express").Router();

const quizController = require("../controllers/quizController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(quizController.getAllQuizs)
  .post(authController.protect, quizController.createQuiz);

module.exports = router;
