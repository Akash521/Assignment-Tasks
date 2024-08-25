const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
   "Pusers", //DB Name
    "root", //DB Username
    "", // DB Password
    {
        host: "127.0.0.1",
        dialect: 'mysql',
        port: 3306,
    }
);

module.exports = sequelize;
