const router = require("express").Router();

const quizController = require("../controllers/quizController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(quizController.getAllQuizs)
  .post(authController.protect, quizController.createQuiz);

router
  .route("/:id")
  .get(quizController.getQuiz)
  .patch(authController.protect, quizController.updateQuiz)
  .delete(authController.protect, quizController.deleteQuiz);

module.exports = router;
