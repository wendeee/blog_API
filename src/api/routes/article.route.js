const express = require('express');
const articleController = require('../controllers/article.controller')
const passport = require('passport')
require('../component/authentication/auth')
const router = express.Router();
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById)
// router.get('/author/:authorName', articleController.getArticlesByAuthor)
// router.get('/:articleTitle', articleController.getArticleByTitle)
// router.get('/tag/:tagName', articleController.getArticlesByTag)
router.post('/', passport.authenticate('jwt', {session:false}), articleController.createArticles)
// router.patch('/:id', passport.authenticate('jwt', {session: false}), articleController.updateAnArticle )
router.put('/:id', passport.authenticate('jwt', {session: false}), articleController.editArticle)
router.delete('/:id', passport.authenticate('jwt', {session: false}), articleController.deleteArticle)

module.exports = router;



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNWU1OWZlYmI4MGU1YWFhNWMzZDM0MyIsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJTbWl0aCJ9LCJpYXQiOjE2Njc0ODMzMjcsImV4cCI6MTY2NzQ4NjkyN30.zLUbkOXgd20gyi8dK-aOswgcJYc4KUZr660D7C4Ecx8eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNWU1OWZlYmI4MGU1YWFhNWMzZDM0MyIsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJTbWl0aCJ9LCJpYXQiOjE2Njc0ODMzMjcsImV4cCI6MTY2NzQ4NjkyN30.zLUbkOXgd20gyi8dK-aOswgcJYc4KUZr660D7C4Ecx8