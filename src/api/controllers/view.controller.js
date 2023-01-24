const Post = require("../model/Post");
const _ = require("lodash");
exports.getHomePage = async (req, res) => {
  //get all published blog posts from collection
  const posts = await Post.find({ state: "published" })
    .sort("-createdAt")
    .limit(10);
  res.status(200).render("index", { posts: posts });
};

exports.getPost = async (req, res) => {
  const postToGet = req.params.postId;
  const post = await Post.findOne({ _id: postToGet });
  res.render("post", {
    post,
  });
};

exports.signUp = async (req, res) => {
  res.render("signup");
};

exports.login = async (req, res) => {
  res.render("login");
};

exports.getWritePost = async (req, res) => {
  res.render("write");
};

exports.editPost = async (req, res) => {
  res.render("edit");
};
exports.getAuthorPage = async (req, res) => {
  res.render("author");
};
