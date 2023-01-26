const Post = require("../model/Post");

exports.getAllPosts = async (authorID, filterQuery, skip, limit) => {
  try {
    const posts = await Post.find({
      authorId: authorID,
      ...(filterQuery.state ? { state: filterQuery.state } : {}),
    })
      .skip(skip)
      .limit(limit);

    return posts;
  } catch (err) {
    throw err;
  }
};

//get a post by id
exports.getPostById = async (id) => {
  try {
    const post = await Post.findById({ _id: id })
    if(post.state == 'published'){
      post.readCount === 0 ? post.readCount++ : post.readCount++;
      post.save();
    }
    return post;
  } catch (err) {
    throw err;
  }
};