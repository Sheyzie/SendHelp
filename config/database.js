//import dependencies
const mysql = require('mysql2')
const dotenv = require('dotenv')

//initialize the environment
dotenv.config()

//create a connection pool object
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_PASSWORD
})

module.exports = db.promise()