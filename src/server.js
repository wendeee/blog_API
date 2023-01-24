const app = require('./app');

const CONFIG = require('./config/config')
const connectToDB = require('./db/mongodb')

require('dotenv').config();

//connect to DB
connectToDB()

const PORT = CONFIG.PORT || 3000;


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})