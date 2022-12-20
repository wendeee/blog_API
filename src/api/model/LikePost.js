const mongoose = require("mongoose");

const LikePostSchema = new mongoose.Schema({
  _post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },

  _user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const LikePost = mongoose.model("LikePost", LikePostSchema);
module.exports = LikePost;
