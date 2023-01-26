const express = require("express");
const authorController = require("../controllers/author.controller");
const passport = require("passport");
const router = express.Router();
require("../controllers/user.authController.js");
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorController.getAllPosts
);

//
//GET BLOG BY ID
router.get("/:id", passport.authenticate("jwt", {session: false}), authorController.getAPost)
//DELETE USER ACCOUNT
module.exports = router;
