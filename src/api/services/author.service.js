const Article = require('../model/Article');

exports.getAllArticles = async(findQuery, authorID, page, skip,limit_per_page) =>{
    try{
        const articles = await Article.find({
            state: {$regex:  new RegExp(findQuery, "i")},
            page,
            // author_Id: authorID
        }).skip(skip).limit(limit_per_page);
        return articles;
    }catch(err){
        throw err;
    }
}