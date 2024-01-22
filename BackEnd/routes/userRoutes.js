const router = require("express").Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/signout", authController.signout);
router.get("/getme", authController.userLoggedIn, userController.getUser);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(authController.userLoggedIn, userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
