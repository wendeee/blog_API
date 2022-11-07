//Authors should be to - Get all blogs they created
                        //Blogs end point should be filerable by state
                        //Blogs endpoint should be paginated
                        //
const express = require('express');
const router = express.Router()
const User = require('../model/User')
const catchAsyncError = require('../utils/error.catchAsync')
const Article = require('../model/Article');
const authorService = require('../services/author.service')

exports.getAllArticles = catchAsyncError(async(req, res, next) => {
    
    const { query } = req;

    const { 
        page = req.query.page * 1 || 1,
        limit_per_page = req.query.limit * 1 || 10,
        skip = (page - 1) * limit_per_page

    } = query;
   

    let numOfArticles = await Article.countDocuments()
        if(skip >= numOfArticles){
           res.json('Invalid Page Request')
        }

        let findQuery= req.query.state
       const articles = await authorService.getAllArticles( {state: {$regex:  new RegExp(findQuery, "i")}, author_Id: req.user._id },limit_per_page,skip)
       res.status(200).json({
        totalBlogs: articles.length,
        articles
    });     
})
    
 
