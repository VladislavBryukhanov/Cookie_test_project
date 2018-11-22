const Sequelize = require('sequelize');
const sequelize = require('../dbConnection');

const Avatar = sequelize.define('avatar', {
    path: {
        type: Sequelize.TEXT
    },
    isCurrentAvatar: {
        type: Sequelize.BOOLEAN
    },
    key: {
        type: Sequelize.STRING
    }
});

module.exports = Avatar;