const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/Cookie');

module.exports = sequelize;