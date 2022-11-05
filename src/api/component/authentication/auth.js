const passport = require('passport')
const User = require('../../model/User')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const localStrategy = require('passport-local').Strategy
require('dotenv').config()

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const strategy = new JwtStrategy(options, async(token, done) => {
    try{
      
        return done(null, token.user)
    }catch(error){
        return done(error)
    }
        
})

passport.use(strategy)

//implement middleware for 'signup' post request
passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, async(req, email, password,  done) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    try{
        const user = await User.create({firstname, lastname, email, password})
        console.log(user)
        return done(null, user)
    }catch(error){
        return done(error)
    }
}))

//implement middleware for 'login' post request
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {
    try{
       
       //find user in the db
       const user = await User.findOne({email: email})
       if(!user) return done(null, false, {message: 'User not found!'})

        //check if password is correct
        const validPassword =await user.isValidPassword(password)
        if(!validPassword) {
            return done(null, false, {message: 'Password is incorrect!'})
        }else{
            return done(null, user, {message:'Logged in successfully!'})
        }


    }catch(error){
        return done(error)
    }
}))