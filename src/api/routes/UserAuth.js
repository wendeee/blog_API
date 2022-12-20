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

    res.status(200).json({
      success: true,
      message: "Signed up successfully!",
      token,
    });
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
        return next(new Error("Username or Password is incorrect"));
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const payload = {
          _id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        };

        const token = jwt.sign({ user: payload }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: true,
          token,
        });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
});
//forgot password
userAuthRouter.post("/forgotPassword", userAuth.forgotPassword);
userAuthRouter.patch("/resetPassword/:token", userAuth.resetPassword);
module.exports = userAuthRouter;
