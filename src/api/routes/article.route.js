const express = require('express');
const articleController = require('../controllers/article.controller');
const passport = require('passport');
require('../component/authentication/auth');
const router = express.Router();
router
    .route('/')
    .get(articleController.getAllArticles)
    .post(passport.authenticate('jwt', {session:false}), articleController.createArticles)

router
.route('/:id')
    .get(articleController.getArticleById)
    .put(passport.authenticate('jwt', {session: false}), articleController.editArticle)
    .delete(passport.authenticate('jwt', {session: false}), articleController.deleteArticle)

module.exports = router;
