const express = require("express");
const viewController = require("../controllers/view.controller");
const authController = require("../controllers/user.authController");

const passport = require("passport");

const router = express.Router();
router.use(authController.isLoggedIn);
router.get("/", viewController.getHomePage);
router.get("/posts/:postId", viewController.getPost);
router.get("/signup", viewController.signUp);
router.get("/login", viewController.login);
router.get(
  "/write",
  passport.authenticate("jwt", { session: false }),
  viewController.getWritePost
);
router.get("/edit", viewController.editPost);
router.get("/me", viewController.getAuthorPage);

module.exports = router;
