const Sequelize = require('sequelize');
const sequelize = require('../dbConnection');

const User = sequelize.define('user', {
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        // validate: {
        //     len: {
        //         args: [1, 20]
        //     }
        // }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //     len: {
        //         args: [8, 32]
        //     }
        // }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bio: {
        type: Sequelize.STRING
    },
    session_hash: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;
