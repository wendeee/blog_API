const express = require("express");
const postController = require("../controllers/post.controller");
const passport = require("passport");
require("../controllers/user.authController.js");
const router = express.Router();
router
  .route("/")
  .get(postController.getAllPost)
  .post(
    passport.authenticate("jwt", { session: false }),
    postController.createPosts
  );

router
  .route("/:id")
  .get(postController.getPostById)
  .put(
    passport.authenticate("jwt", { session: false }),
    postController.editPost
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    postController.deletePost
  );
router
  .route("/:id/like")
  .patch(
    passport.authenticate("jwt", { session: false }),
    postController.likeAPost
  );

  
module.exports = router;
