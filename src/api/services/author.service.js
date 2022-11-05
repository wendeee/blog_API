const Article = require('../model/Article')
const Author = require('../model/User')

exports.getAllArticles = async(findQuery, skip,limit_per_page) =>{
    try{
        const articles = await Article.find(findQuery).skip(skip).limit(limit_per_page);
        return articles;
    }catch(err){
        throw err;
    }
}