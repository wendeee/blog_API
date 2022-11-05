const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: [true, 'A Blog Post must have a title']
    },
    description: {
        type: String,
        required: [true, 'A Blog Post must have a description']
    },
    tags: {
        type: Array
    },
    read_Count: {
        type: Number,
        default: 0
    },
    author: { 
        type:String,
        required: true
    },
    author_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    state: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    body: {
        type: String,
        required: [true, 'A Blog Post must contain a body']
    },
    reading_time: {
        type: String,
    }

}, {timestamps: true})

ArticleSchema.pre(/^find/, function(next){
    this.populate({
        path: 'author',
        select: 'firstname lastname'
    }).populate({
        path: 'body',
        select: 'articles'
    }).populate({
        path: 'title'
    }).populate({
        path: 'read_Count'
    }).populate({
        path: 'reading_time'
    })
    next();
})

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
