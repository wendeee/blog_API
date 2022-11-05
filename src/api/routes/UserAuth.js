const express = require('express');
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()

const userAuthRouter = express.Router()

userAuthRouter.post('/signup', passport.authenticate('signup', {session:false}), async(req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Signed up successfully!'
    })
})

userAuthRouter.post('/login', async(req, res,next) => {
    passport.authenticate('login', (err,user) => {
        try{
            if(err){
                return next(err)
            }
            if(!user){
                return next(new Error('Username or Password is incorrect'))
            }
            req.login(user, {session:false}, async(error) => {
                if(error) return next(error)
                const payload = {
                    _id: user._id, 
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname
                }
                
                const token = jwt.sign({user: payload}, process.env.JWT_SECRET, { expiresIn: '1h' })
                res.status(200).json({
                    success: true,
                    message: token
                })
            })
        }catch(err){
            return next(err)
        }
        
    })(req, res, next)
})

module.exports = userAuthRouter;