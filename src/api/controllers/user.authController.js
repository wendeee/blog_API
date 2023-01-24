const passport = require("passport");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const sendEmail = require("../utils/email");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
require("dotenv").config();

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

const options = {
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() ,
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JwtStrategy(options, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    return done(error);
  }
});

passport.use(strategy);

//implement middleware for 'signup' post request
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      let firstname = req.body.firstname;
      let lastname = req.body.lastname;
      try {
        const user = await User.create({
          firstname,
          lastname,
          email,
          password,
        });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

//implement middleware for 'login' post request
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        //find user in the db
        const user = await User.findOne({ email: email });

        if (!user) return done(null, false, { message: "User not found!" });

        //check if password is correct
        const validPassword = await user.isValidPassword(password);

        if (!validPassword) {
          return done(null, false, { message: "Password is incorrect!" });
        } else {
          return done(null, user, { message: "Logged in successfully!" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

//template middleware
exports.isLoggedIn = async (req, res, next) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }

  if (req.cookies.jwt) {
    try {
      //1. verify the token
      const decodedPayload = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      //2. check if user still exists
      const currentUser = await User.findById(decodedPayload.user._id);
      if (!currentUser) {
        return next();
      }
      //Else we still have a logged in user
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }

  next();
};

exports.logout = (req, res) => {
  //set false cookie
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

//implement forgotPassword function
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    res.status(404).json({
      status: "Fail",
      message: "User not found",
    });

  const resetToken = await user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/resetPassword/${resetToken}`;

  //message to be sent to user's email
  const message = `Hello ${user.firstname},\n 
  A request has been received to change your password for your LinkUp account.\n
  Send a PATCH request with your new password and passwordConfirm to this link:\n ${resetUrl}\n If you did not initiate this request, please ignore and your password will remain unchaged`;

  //send email to user
  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset Token",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "A reset token has been sent to your email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(
      new Error("An error occurred while sending email. Please try again")
    );
  }
};

//RESET PASSWORD
exports.resetPassword = async (req, res, next) => {
  //hash token and compare with hashed token in the db
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //find user with hashed token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpire: { $gt: Date.now() },
  });

  //if token has expired
  if (!user) return next(new Error("User not found or token has expired"));

  //reset password and delete passwordResetToken and passwordResetExpire fields
  user.password = req.body.password;

  user.passwordResetToken = undefined;
  user.passwordResetTokenExpire = undefined;

  await User.updateOne(
    user,
    { $set: { password: user.password } },
    { new: true }
  );

  //save new changes to db
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password changed successfully Login with your new details.",
  });
};
