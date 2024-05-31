const router = require("express").Router();

const authController = require("../controllers/authController");
const submissionController = require("../controllers/submissionController");

router.get(
  "/getsubmissions",
  authController.userLoggedIn,
  submissionController.getMySubmissions
);

router.route("/").get(submissionController.getAllSubmissions);

router.get(
  "/:id",
  authController.userLoggedIn,
  submissionController.getSubmission
);

router
  .route("/:quizId")
  .post(authController.userLoggedIn, submissionController.createSubmission);

module.exports = router;
