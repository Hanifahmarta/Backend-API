// Require mysql
require('dotenv').config();
const Pool = require('pg').Pool;


// Create a connection
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

module.exports = pool;



