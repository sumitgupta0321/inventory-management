const env = require('dotenv');
env.config();

module.exports =
{
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": "localhost",
    "dialect": "mysql",
    "port": "3306"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": "localhost",
    "dialect": "mysql",
    port:"3306"
  }
}
