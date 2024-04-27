const {Sequelize} = require('sequelize');
const env = require('dotenv');
env.config();
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: 'localhost',
    dialect: 'mysql'    
});
sequelize.authenticate().then(() =>{
    console.log('Connection has been established successfully with ' +process.env.DB_DATABASE);
}).catch((error) =>{
    console.error('Unable to connect to the database: ', error)
});
module.exports = sequelize;
global.sequelize = sequelize;