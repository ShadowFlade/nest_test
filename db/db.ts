const { Sequelize } = require("sequelize");
const config = require("./config");
require('dotenv').config();


module.exports = new Sequelize(config)
