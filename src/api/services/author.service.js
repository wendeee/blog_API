const Article = require('../model/Article')
const Author = require('../model/User')

exports.getAllArticles = async(findQuery) =>{
    try{
        const articles = await Article.find(findQuery);
        return articles;
    }catch(err){
        throw err;
    }
}