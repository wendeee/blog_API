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
