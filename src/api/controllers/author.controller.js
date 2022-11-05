//Authors should be to - Get all blogs they created
                        //Blogs end point should be filerable by state
                        //Blogs endpoint should be paginated
                        //
const express = require('express');
const router = express.Router()
const User = require('../model/User')
const Article = require('../model/Article');

exports.getAllArticles = async(req, res, next) => {
   
    
    

    
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

    let findQuery = {};
    let articles;
    try{
        articles = await Article.find( {state: {$regex:  new RegExp(req.query.state, "i")}, author_Id: req.user._id})
        res.json(articles)
    }catch(err){
        console.log(err)
    }
    // {author_Id: req.user._id},
   
    // await articles.populate({
    //     path: '/',
    //     findQuery
    // }).execPopulate();
    // res.status(200).json(req.user.articles)

    // articles = await Article.find({author_Id: req.user._id}).where('state').equals(findQuery.state).skip(skip).limit(limit_per_page)
    // }

  
    // if(query.state){
    //     articles = await Article.find({author_Id: req.user._id}).where('state').equals(findQuery.state).skip(skip).limit(limit_per_page)
    // }
    // query = await query
    // res.json(articles)
    // await Article.find({author_Id: req.user._id}, query)

   
    
   
    

    // if(!req.query){
    //     console.log(true)
    //     articles = await Article.find({author_Id: req.user._id})
    // }
    
        // articles = await Article.find({author_Id: req.user._id}, findQuery).skip(skip).limit(limit_per_page)
   
    // articles = await Article.find({author_Id: req.user._id}).where('state').equals(findQuery.state).skip(skip).limit(limit_per_page)

    // console.log(req.user)
   
    // articles = await Article.find({author_Id: req.user._id}).where('state').equals(query.state)
    // res.status(200).json(articles)
    // console.log(articles)
   

    // console.log(queryString.state)

    // let query = await Article.find(queryString)
    // console.log(query)
    //find user by id
    // console.log(req.user)
    // const user = await User.findById(req.params.id);

    // console.log(user)
    // console.log(user._id)
    // if(!user) return res.status(404).json('User not found!')
    // let allPost = await Article.find({$or: [{author_Id: { $eq: req.user._id}},  {state: {$eq: query}}]})
   
    // let allPost = await Article.find({$and: [{author_Id: { $eq: user.id}}, {state: {$eq: query}}]}) 
    
     
        // if(!allPost) return res.status(404).json('No post found for this user!')
        // if(allPost && query){
        //     // if(query){
        //       articles = await Article.find({state: query})  
        //     // }
        // }
        // res.json(articles)
        next()
     }
    //  console.log(allPost)
    // if(!allPost) return res.status(404).json('No post found for this user!')

    // res.json(allPost)
 
