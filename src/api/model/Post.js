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
      validate: {
        validator: function (val){
          return val && val.length > 0
        },
        message: "A post should have at least one tag"
      }
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
    //coverPhoto
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
    // comments: [],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
