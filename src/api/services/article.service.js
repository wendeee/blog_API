//title, description, tags, author, timestamp, state, read_count, reading_time and body
const Article = require("../model/Article");

//get all published articles
exports.getAllArticles = async (
  searchQuery,
  orderQuery,
  skip,
  limit_per_page
) => {
  try {
    const articles = await Article.find({
      author: { $regex: new RegExp(searchQuery.author, "i") },
      title: { $regex: new RegExp(searchQuery.title, "i") },
      tags: { $regex: new RegExp(searchQuery.tags, "i") },
      state: "published",
    })
      .sort(orderQuery)
      .skip(skip)
      .limit(limit_per_page);

    return articles;
  } catch (err) {
    throw err;
  }
};

//get a published article by ID
exports.getArticleById = async (id) => {
  try {
    const article = await Article.findById({ _id: id })
      .where("state")
      .eq("published");
    article.read_Count === 0 ? article.read_Count++ : article.read_Count++;
    article.save();
    return article;
  } catch (err) {
    throw err;
  }
};

//create a new article
exports.createArticle = async (data) => {
  try {
    const article = await Article.create(data);
    article.save();
    return article;
  } catch (error) {
    throw error;
  }
};

//update an existing article
exports.updateAnArticle = async (data) => {
  try {
    const article = await Article.findByIdAndUpdate(data);
    return article;
  } catch (err) {
    throw err;
  }
};

//delete an article
exports.deleteAnArticle = async (data) => {
  try {
    await Article.deleteOne(data);
    return;
  } catch (err) {
    throw err;
  }
};
