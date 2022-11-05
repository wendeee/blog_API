const app = require('./app');
const DB_CONNECTION = require('./src/config/database.config')

require('dotenv').config();
DB_CONNECTION()
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})