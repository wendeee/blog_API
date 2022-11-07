const mongoose = require('mongoose')
require('dotenv').config()
// const MONGO_DB_CONNECTION_URL= process.env.MONGODB_CONNECTION_URL;
const MONGO_DB_CONNECTION_URL =  process.env.MONGODB_CONNECTION_URL
const  DB_CONNECTION = async()=> {
    try{
        await mongoose.connect(MONGO_DB_CONNECTION_URL);
        console.log('Connection to DB successful!')
    }catch(err){
        console.log('Connection to DB failed!')
    }
    
}
module.exports = DB_CONNECTION;
// const CONFIG = {
//     DB_CONNECTION: function connectDB(){
//         mongoose.connect(MONGO_DB_CONNECTION_URL)
//         mongoose.connection.on('connected',() => {
//             console.log('Connection to DB successful!')
//         })

//         mongoose.connection.on('error', (err) => {
//             console.log(err)
//             console.log('Connection to DB failed!')
//         })
//     }
// }

// module.exports= CONFIG.DB_CONNECTION