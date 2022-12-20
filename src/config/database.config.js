const mongoose = require('mongoose')
require('dotenv').config()


const  DB_CONNECTION = async()=> {
    try{
        mongoose.connect(process.env.DATABASE_LOCAL);
        console.log('Connection to DB successful!')
    }catch(err){
        console.log('Connection to DB failed!')
    }
    
}
module.exports = DB_CONNECTION;
