const mysql = require('mysql');

const pool = mysql.createPool({
  host:  process.env.DB_HOST ?  process.env.DB_HOST : "127.0.0.1",
  user: process.env.DB_USER ?  process.env.DB_USER : "allycat",
  password: process.env.DB_PASSWORD ?  process.env.DB_PASSWORD : "Wednesday2022!",
  database:"allycat"
});

pool.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Database connected successfully');
  connection.release();
});

module.exports = pool;