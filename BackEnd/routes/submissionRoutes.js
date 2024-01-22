const router = require("express").Router();

const authController = require("../controllers/authController");
const submissionController = require("../controllers/submissionController");

router.route("/").get(submissionController.getAllSubmissions);

router
  .route("/:quizId")
  .post(authController.userLoggedIn, submissionController.createSubmission);

module.exports = router;
