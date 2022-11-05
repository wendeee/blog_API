const express = require('express');
const passport = require('passport')
const userAuthRouter = require('./api/routes/UserAuth');
const articleRouter = require('./api/routes/article.route')
const authorRouter = require('./api/routes/author.route')
const globalErrorCatch = require('../src/api/utils/globalErrorCatch')
const app = express();

require('dotenv').config();

require('./api/component/authentication/auth')

// ******************MIDDLEWARES*******************//
app.use(express.urlencoded({extended: true}))
app.use('/', userAuthRouter)
app.use('/api/v1/articles', articleRouter)     //general endpoint
app.use('/api/author/articles', authorRouter)       //author specific endpoint

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page')
})

app.all("*", (req, res, next) => {
    const err = new Error(`${req.originalUrl} not found!`);
    err.status = 'fail',
    err.StatusCode = 404;

    next(err)
})

app.use(globalErrorCatch)
module.exports = app;