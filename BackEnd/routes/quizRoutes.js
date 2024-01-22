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

router
  .route("/:id/addQuestion")
  .patch(authController.protect, quizController.addQuestion);

router
  .route("/:id/removeQuestion/:questionID")
  .patch(authController.protect, quizController.removeQuestion);
module.exports = router;
