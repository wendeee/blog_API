const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A Blog Post must have a title"],
    },
    description: {
      type: String,
      required: [true, "A Blog Post must have a description"],
    },
    tags: {
      type: Array,
    },
    readCount: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    state: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    body: {
      type: String,
      required: [true, "A Blog Post must contain a body"],
    },
    readingTime: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    //     comments: {
    // type: Array,
    // default: []
    //     },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
