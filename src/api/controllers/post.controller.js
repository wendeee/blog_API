const Post = require("../model/Post");
const PostService = require("../services/post.service");
const LikePost = require("../model/LikePost");
const catchAsyncError = require("../utils/error.catchAsync");
const { readTime } = require("../utils/readingTime.utils");
const { validationResult } = require("express-validator");
const User = require("../model/User");

exports.getAllPost = catchAsyncError(async (req, res) => {
  //destructure query parameters
  const { query } = req;
  const {
    author,
    title,
    tags,
    order = "asc",
    orderBy = "readCount",
    page = req.query.page * 1 || 1,
    limit = req.query.limit * 1 || 20,
    skip = (page - 1) * limit,
  } = query;

  // //*******Count number of published posts and compare with skip value
  // let numOfPosts = await Post.countDocuments();
  // // if (skip >= numOfPosts) {
  // //   res.json("Invalid Page Request");
  // // }

  //create query object
  const searchQuery = {};
  const orderQuery = {};

  //check query values
  if (author) {
    searchQuery.author = author;
  }

  if (title) {
    searchQuery.title = title;
  }

  if (tags) {
    searchQuery.tags = tags;
  }

  const orderProperties = orderBy.split(",");
  for (const property of orderProperties) {
    if (order == "asc" && orderBy) {
      orderQuery[property] = 1;
    }
    if (order == "desc" && orderBy) {
      orderQuery[property] = -1;
    }
  }

  const posts = await PostService.getAllPosts(
    searchQuery,
    orderQuery,
    skip,
    limit
  );
  res.status(200).json({
    totalBlogs: posts.length,
    posts,
  });
});

exports.getPostById = catchAsyncError(async (req, res, next) => {
  let post;
  post = await PostService.getPostById(req.params.id);
  if (!post) {
    let err = new Error("Post with Id not found");
    err.StatusCode = 404;
    err.status = "fail";
    return next(err);
  }
  return res.json(post);
});

exports.createPosts = catchAsyncError(async (req, res, next) => {
  let { firstname, lastname } = req.user;

  let author = `${firstname} ${lastname}`;
  let authorId = req.user._id;
  let user = await User.findById(req.user._id);

  const { title, description, tags, body } = req.body;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  //calculate reading time for a created post
  const readingTime = readTime(body) + "mins";

  const post = await PostService.createPost({
    title,
    description,
    tags,
    body,
    author,
    authorId,
    readingTime,
  });

  //populate the post path on user doc with the created post
  user.posts.push(post._id);
  //update doc in DB
  await user.save();

  if (!post) {
    res.status(400).json("Post not created!");
  }
  res.status(201).json(post);
});

exports.updatePost = catchAsyncError(async (req, res, next) => {
  let id = req.params.id || {};

  const postToUpdate = await Post.findById(id);
  if (!postToUpdate) {
    let err = new Error("Post with Id not found");
    err.StatusCode = 404;
    err.status = "fail";
    return next(err);
  }
  if (postToUpdate.authorId.toString() !== req.user._id) {
    res.status(401).json(`You can only update an post you created!`);
  }

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const post = await PostService.updatePost(
    postToUpdate,
    {
      $set: req.body,
    },
    { new: true }
  );

  res.status(200).json(post);
});

exports.editPost = catchAsyncError(async (req, res, next) => {
  let authorId = req.user._id;

  const postToEdit = await Post.findById(req.params.id);

  if (!postToEdit) {
    let err = new Error("Post with Id not found");
    err.StatusCode = 404;
    err.status = "fail";
    return next(err);
  }
  if (postToEdit.authorId.toString() !== authorId) {
    return res.status(401).json(`You can only update an post you created!`);
  }

  const post = await Post.findByIdAndUpdate(
    postToEdit,
    {
      $set: req.body,
    },
    { new: true }
  );

  res.status(200).json(post);
});

exports.deletePost = catchAsyncError(async (req, res, next) => {
  const authorId = req.user._id;
  const postToDelete = await Post.findById(req.params.id);

  if (!postToDelete) {
    let err = new Error("Post with Id not found");
    err.StatusCode = 404;
    err.status = "fail";
    return next(err);
  }

  if (postToDelete.authorId.toString() !== authorId) {
    return res.status(401).json(`You can only delete an post you created!`);
  }

  await PostService.deletePost(authorId, postToDelete);
  res.status(200).json({
    status: "success",
    message: "Post deleted successfully",
  });
});

//like a post
exports.likeAPost = async (req, res) => {
  //check if user is authenticated
  const user = await User.findOne({ _id: req.user._id });
  if (!user)
    res.status(404).json({ message: "Login or signup to like a post" });

  //check if post is in published state. Only a published post can be liked
  const post = await Post.findOne({ _id: req.params.id, state: "published" });

  if (!post) res.status(403).json(null);

  //check if that post has been liked  and liked by the user

  if (post.likes > 0) {
    //it means post has been liked, so we check if this current user has liked this post before
    const postIsLikedByUser = await LikePost.findOne({
      _post: req.params.id,
    });

    if (postIsLikedByUser._user.includes(req.user._id)) {
      //dislike post
      postIsLikedByUser._user.pull(user);
      await postIsLikedByUser.save();

      //update post likes count
      post.likes = post.likes - 1;
      await post.save();
      res.status(200).json("you unliked this post");
    } else {
      //add current user to user array
      postIsLikedByUser._user.push(user);

      await postIsLikedByUser.save();

      // update like count on post document
      post.likes === 0 ? post.likes++ : post.likes++;
      await post.save();
      res.status(200).json({
        status: "success",
        message: "You liked this post",
        post,
      });
    }
  } else {
    //it means post has not been liked and we so create a new like document
    // create new likepost document
    const newLike = new LikePost({
      _user: user,
      _post: post,
    });
    await newLike.save();

    post.likes === 0 ? post.likes++ : post.likes++;
    await post.save();
    res.status(200).json({
      status: "success",
      message: `You liked this post!`,
      post,
    });
  }
};
