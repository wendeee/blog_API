//create schema for user

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validator = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "A user must have a first name"],
  },
  lastname: {
    type: String,
    required: [true, "A user must have a last name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: [true, "A user email must be unique"],
    lowercase: true,
    validate: [validator.isEmail, "Please, enter a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  passwordResetToken: { type: String, required: false },
  passwordResetTokenExpire: { type: Date, required: false },
});

//add a pre-hook function to the UserSchema. This function gets called
//before the user info is stored in the database
UserSchema.pre("save", async function (next) {

  //only run if password was modified
  if (!this.isModified('password')) return next();
 
  try {
    if (this.password) {
      const hash = await bcrypt.hash(this.password, 12);
      this.password = hash;
      next();
    }
  } catch (err) {
    next(err);
  }
});

UserSchema.pre("update", async function (next) {
  const password = this.getUpdate().$set.password;
  
  if (!password) {
    return next();
  }
  try {
    const hash = await bcrypt.hash(this.password, 12);
    this.getUpdate().$set.password = hash;
    console.log(password + ' HASHED')
    next();
  } catch (error) {
    return next(error);
  }
});
//Add a method to the Schema. This method will chain a
//function that compares and validates the password.
//in this case 'isValidPassword' is the function that gets called
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;

  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

//Add forgot password
UserSchema.methods.generatePasswordResetToken = async function () {
  
  const user = this;
  //1). generate a plain unencrypted token
  const resetToken = crypto.randomBytes(32).toString("hex");

  //2). hash token before saving to DB
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //3). set token expiration time
  this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000; //set to 10mins

  return resetToken;
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
