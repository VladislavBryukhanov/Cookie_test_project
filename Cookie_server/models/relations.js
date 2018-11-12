const User = require('./user');
const Score = require('./score');

module.exports = (force) => {

// Score.hasOne(User);
//     Score.belongsTo(User);
    User.sync(force);
    Score.belongsTo(User, { onDelete: 'cascade' });
    // User.belongsTo(Score);
    Score.sync(force);
};
