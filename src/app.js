const express = require('express');
const userAuthRouter = require('./api/routes/UserAuth');
const articleRouter = require('./api/routes/article.route')
const authorRouter = require('./api/routes/author.route')
const globalErrorCatch = require('./api/utils/globalErrorCatch')
const app = express();

require('dotenv').config();

require('./api/component/authentication/auth')

// ******************MIDDLEWARES*******************//
app.use(express.urlencoded({extended: true}))
app.use('/', userAuthRouter)
app.use('/api/v1/blogs', articleRouter)     //general endpoint
app.use('/api/v1/author/blogs', authorRouter)       //author specific endpoint

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page of the Blog API')
})

//Error handler for unknown route
app.all("*", (req, res, next) => {
    const err = new Error(`${req.originalUrl} not found!`);
    err.status = 'fail',
    err.StatusCode = 404;

    next(err)
})
//Error Handler middleware
app.use(globalErrorCatch)
module.exports = app;