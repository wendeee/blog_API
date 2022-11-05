const Article = require('../model/Article')
const Author = require('../model/User')

exports.getAllArticles = async() =>{
    try{
        const articles = await Article.find();
        return articles;
    }catch(err){
        throw err;
    }
}