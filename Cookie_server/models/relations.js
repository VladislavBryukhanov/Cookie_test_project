const User = require('./user');
const Score = require('./score');
const Avatar = require('./avatar');

module.exports = (force) => {
    User.sync(force);
    // Score.sync(force);
    // Gallery.sync(force);

    Score.belongsTo(User, { onDelete: 'cascade' });
    User.hasMany(Avatar, { onDelete: 'cascade'});
    // User.belongsTo(Gallery, {as: 'avatar'});

    // User.sync(force);
    Score.sync(force);
    Avatar.sync(force);
};
