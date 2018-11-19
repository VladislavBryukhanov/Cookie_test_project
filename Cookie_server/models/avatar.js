const Sequelize = require('sequelize');
const sequelize = require('../dbConnection');

const Avatar = sequelize.define('avatar', {
    path: {
        type: Sequelize.STRING
    },
    isCurrentAvatar: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = Avatar;