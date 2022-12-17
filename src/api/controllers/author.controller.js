//Authors should be to - Get all blogs they created
//Blogs end point should be filerable by state
//Blogs endpoint should be paginated
//
const express = require("express");
const router = express.Router();
const User = require("../model/User");
const catchAsyncError = require("../utils/error.catchAsync");
const Article = require("../model/Article");
const authorService = require("../services/author.service");

exports.getAllArticles = catchAsyncError(async (req, res, next) => {
  const { query } = req;

  const {
    page = req.query.page * 1 || 1,
    limit_per_page = req.query.limit * 1 || 10,
    skip = (page - 1) * limit_per_page,
    state = req.query.state
  } = query;

  let numOfArticles = await Article.countDocuments();
  if (skip >= numOfArticles) {
    res.json("Invalid Page Request");
  }
const searchQuery = {}

if(state){
  searchQuery.state = state
}
  // const authorBlogs = await User.find({_id: req.user._id, searchQuery}).populate('articles').select('articles')
 

  let authorID = req.user._id;
  const articleByUser = await User.findById(authorID).populate("articles");

  let articles = articleByUser.articles;
  // const result = await User.find(articles, page).filter()

  let allArticles = articles.filter((article) => {
    const filters = req.query;
    for (let key in filters) {
      articles = article[key] === filters[key];
    }
    // if(req.query.page){
    //   articles = req.query.page
    // }
   

    return articles;
  });
 

  // console.log(allArticles)
  // // articles.find(page)



  //     //  const articles = await authorService.getAllArticles({state: {$regex:  new RegExp(findQuery, "i")}, author_Id: req.user._id },limit_per_page,skip)
  res.status(200).json({
    // totalBlogs: articles.length,
    // authorBlogs,
    allArticles
    // result
    // articles,
    // finalresult
  });
});
