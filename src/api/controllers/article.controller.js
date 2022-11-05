const Article = require('../model/Article');
const articleService = require('../services/article.service');
const catchAsyncError = require('../utils/error.catchAsync')
const { readingTime } = require('../utils/readingTime.utils')
const { validationResult } = require('express-validator')

exports.getAllArticles = catchAsyncError(async(req, res, next)=>{
   //destructure query parameters
        const { query } = req;
        const { 
            author, 
            title, 
            tags,
            order = 'asc',
            order_by = 'read_Count',
            page = req.query.page * 1 || 1,
            limit_per_page = req.query.limit * 1 || 20,
            skip = (page - 1) * limit_per_page
         } = query;

         //count number of published articles and compare with skip value
        //  let numOfArticles = await Article.countDocuments()
        // if(skip >= numOfArticles){
        //    res.json('Invalid Page Request')
        // }

        //create query object
        const searchQuery = {};
        const orderQuery = {};

        //check query values
        if(author) {
            searchQuery.author = author;
        }

        if(title){
            searchQuery.title = title
        }

        if(tags){
            searchQuery.tags = tags;
        }

        const orderProperties = order_by.split(',');

        for(const property of orderProperties){
            if(order=='asc' && order_by){
                orderQuery[property] = 1;
            }
            if(order=='desc' && order_by){
                orderQuery[property] = -1;
            }
        }

        const articles = await articleService.getAllArticles(searchQuery, orderQuery, skip, limit_per_page);
        res.status(200).json(articles);   
})

exports.getArticleById = catchAsyncError(async(req, res, next) => {
    let article;
        article = await articleService.getArticleById(req.params.id);
            if(!article){
                let err = new Error('Article with Id not found');
                err.StatusCode = 404;
                err.status = 'fail'
                return next(err)
            }
       return res.json(article)
       
})

exports.createArticles = catchAsyncError(async(req, res, next) => {
        
        let {firstname, lastname} = req.user;

        let author = `${firstname} ${lastname}`;
        let author_Id = req.user._id;
       

        const {title, description, tags, body} = req.body;

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ 
            errors: errors.array() 
        });
    }
        //calculate reading time for a created article
        const reading_time = readingTime(body) + "mins";

        const article = await articleService.createArticle({
            title,description,tags,body,author,author_Id,reading_time
        });
        if(!article){
            res.status(400).json('Article not created!')
        }
        res.status(201).json(article)
   
})

exports.updateAnArticle = catchAsyncError(async(req, res, next) => {
   
        let id = req.params.id || {};
      
        const articleToUpdate = await Article.findById(id)
        if(!articleToUpdate){
            let err = new Error('Article with Id not found');
                err.StatusCode = 404;
                err.status = 'fail'
                return next(err)
        }
        if(articleToUpdate.author_Id.toString() !== req.user._id){
            res.status(401).json(`You can only update an article you created!`);
        }

       // Check for validation errors
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
       return res.status(400).json({ 
           errors: errors.array() 
       })}


        const article = await articleService.updateAnArticle(articleToUpdate, {
            $set: req.body
        }, {new: true});
        
      
        res.status(200).json(article)
           
})

exports.editArticle = catchAsyncError(async(req, res,next) => {
   
        let authorId = req.user._id;

        const articleToEdit = await Article.findById(req.params.id)

        if(!articleToEdit){
            let err = new Error('Article with Id not found');
            err.StatusCode = 404;
            err.status = 'fail'
            return next(err)
    }
    if(articleToEdit.author_Id.toString() !== authorId){
        return res.status(401).json(`You can only update an article you created!`)
    }

        const article = await Article.findByIdAndUpdate(articleToEdit, {
            $set: req.body
        }, {new: true});

        res.status(200).json(article)
   
})

exports.deleteArticle = catchAsyncError(async(req, res, next) => {
        const authorId = req.user._id;
        const articleToDelete = await Article.findById(req.params.id)

        if(!articleToDelete){
            let err = new Error('Article with Id not found');
                err.StatusCode = 404;
                err.status = 'fail'
                return next(err)
        }

        if(articleToDelete.author_Id.toString() !== authorId){
            return res.status(401).json(`You can only delete an article you created!`)
        }

        await articleService.deleteAnArticle(articleToDelete);
        res.status(204).json({
            status: 'success',
        })
})