//title, description, tags, author, timestamp, state, read_count, reading_time and body
const Post = require("../model/Post");
const User = require("../model/User");
//get all published Posts
exports.getAllPosts = async (searchQuery, orderQuery, skip, limit) => {
  try {
    const posts = await Post.find({
      author: { $regex: new RegExp(searchQuery.author, "i") },
      title: { $regex: new RegExp(searchQuery.title, "i") },
      tags: { $regex: new RegExp(searchQuery.tags, "i") },
      state: "published",
    })
      .sort(orderQuery)
      .skip(skip)
      .limit(limit);

    return posts;
  } catch (err) {
    throw err;
  }
};

//get a published post by ID
exports.getPostById = async (id) => {
  try {
    const post = await Post.findById({ _id: id })
      .where("state")
      .eq("published");
    post.readCount === 0 ? post.readCount++ : post.readCount++;
    post.save();
    return post;
  } catch (err) {
    throw err;
  }
};

//create a new post
exports.createPost = async (data) => {
  try {
    const post = await Post.create(data);
    post.save();
    return post;
  } catch (err) {
    throw err;
  }
};

//update an existing post
exports.updatePost = async (data, state) => {
  try {
    const post = await Post.findByIdAndUpdate(data, state, {new: true});
    return post;
  } catch (err) {
    throw err;
  }
};

//delete an post
exports.deletePost = async (authorId, postToDelete) => {
  try {
    //delete post from user's 'posts' array in user collection
    const postByUser = await User.findById(authorId);
    postByUser.posts.pull(postToDelete._id);
    await postByUser.save();

    //delete post from post collection
    await Post.deleteOne(postToDelete);
    return;
  } catch (err) {
    throw err;
  }
};
