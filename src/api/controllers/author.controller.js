//Authors should be to - Get all blogs they created
//Blogs end point should be filerable by state
//Blogs endpoint should be paginated

const catchAsyncError = require("../utils/error.catchAsync");

const authorService = require("../services/author.service");

exports.getAllPosts = catchAsyncError(async (req, res) => {
  const { query } = req;
  const {
    state,
    page = req.query.page * 1 || 1,
    limit = req.query.limit * 1 || 10,
    skip = (page - 1) * limit,
  } = query;
  const filterQuery = {};

  if (state) {
    filterQuery.state = state;
  }

  let authorID = req.user._id;
  const posts = await authorService.getAllPosts(
    authorID,
    filterQuery,
    skip,
    limit
  );

  res.status(200).json({
    page,
    numOfPosts: posts.length,
    posts,
  });
});
