const router = require("express").Router();

const quizController = require("../controllers/quizController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(quizController.getAllQuizs)
  .post(authController.userLoggedIn, quizController.createQuiz);

router
  .route("/:id")
  .get(quizController.getQuiz)
  .patch(authController.userLoggedIn, quizController.updateQuiz)
  .delete(authController.userLoggedIn, quizController.deleteQuiz);

router
  .route("/:id/addQuestion")
  .patch(authController.userLoggedIn, quizController.addQuestion);

router
  .route("/:id/removeQuestion/:questionID")
  .patch(authController.userLoggedIn, quizController.removeQuestion);
module.exports = router;
