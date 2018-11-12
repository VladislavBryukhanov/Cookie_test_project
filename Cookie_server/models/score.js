const Sequelize = require('sequelize');
const sequelize = require('../dbConnection');

const Score = sequelize.define('score', {
    scoreCounter: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

module.exports = Score;