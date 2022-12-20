const mongoose = require('mongoose')
require('dotenv').config()


const  DB_CONNECTION = async()=> {
    try{
        mongoose.connect(process.env.MONGODB_CONNECTION_URL);
        console.log('Connection to DB successful!')
    }catch(err){
        console.log('Connection to DB failed!')
    }
    
}
module.exports = DB_CONNECTION;
