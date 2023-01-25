const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const userAuth = require("../controllers/user.authController.js");
require("dotenv").config();

const userAuthRouter = express.Router();

// ********************SIGN UP USER*********************************//
userAuthRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
    async (req, res, next) => {
    const payload = {
      _id: req.user._id,
      email: req.user.email,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
    };

    const token = jwt.sign({ user: payload }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

//Add Cookie
    //set Httpcookie
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      secure: true,
      httpOnly: true
    })

    res.status(200).json({
      success: true,
      message: "Signed up successfully!",
      token,
    });
    next()
  }
);

// *******************************************************************//

// ************************LOGIN USER********************************//

userAuthRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", (err, user) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
       return res.status(400).json({
          status: 'Fail',
          message: 'Email or Password is incorrect'
        })
        // return next(new Error("Username or Password is incorrect"));
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const payload = {
          _id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        };

        let token = jwt.sign({ user: payload }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
       
        //set Httpcookie
        res.cookie('jwt', token, {
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
          secure: true,
          httpOnly: true
        })
      
      // console.log(req.cookies.jwt)

        res.status(200).json({
          status: 'success',
          token,
        });
        // return res.redirect('/')
      });
    } catch (err) {
      
      return next(err.message);
    }
  })(req, res, next);
});

userAuthRouter.get('/logout', userAuth.logout)
//forgot password
userAuthRouter.post("/forgotPassword", userAuth.forgotPassword);
userAuthRouter.patch("/resetPassword/:token", userAuth.resetPassword);
module.exports = userAuthRouter;
