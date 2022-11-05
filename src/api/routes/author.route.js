const express = require('express');
const authorController = require('../controllers/author.controller')
const passport = require('passport');
const router = express.Router()
require('../component/authentication/auth')
router.get('/', passport.authenticate('jwt', {session: false}),authorController.getAllArticles)
module.exports = router;