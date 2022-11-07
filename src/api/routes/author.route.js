const express = require('express');
const authorController = require('../controllers/author.controller')
const passport = require('passport');
const router = express.Router()
require('../component/authentication/auth')
router.get('/', passport.authenticate('jwt', {session: false}),authorController.getAllArticles)
//GET BLOG BY ID
//DELETE USER ACCOUNT
module.exports = router;