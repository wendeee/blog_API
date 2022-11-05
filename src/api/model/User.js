//create schema for user

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'A user must have a first name']
    },
    lastname: {
        type: String,
        required: [true, 'A user must have a last name']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: [true, 'A user email must be unique'],
        lowercase: true,
        validate: [validator.isEmail, 'Please, enter a valid email']
        
    },
    password: {
        type: String,
        required: true
    },
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,  ref: 'Article'
        }
    ]
})

//add a pre-hook function to the UserSchema. This function gets called
//before the user info is stored in the database
UserSchema.pre(
    'save',async function(next){
        const user = this;
        const hash = await bcrypt.hash(this.password, 12)
        this.password = hash;
        next()
    }
)

//Add a method to the Schema. This method will chain a
//function that compares and validates the password.
//in this case 'isValidPassword' is the function that gets called
UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password)
    return compare;
}
const User = mongoose.model('User', UserSchema)
module.exports = User;
