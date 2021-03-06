const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secret = require('../secret');
const Score = require('../models/score');
const Avatar = require('../models/avatar');
const getProfile = require('./user').getProfile;

const signIn = async (user) => {
    let token = jwt.sign(
        {id: user.id, session_hash: user.session_hash},
        secret,
        {expiresIn: 365 * 24 * 60 * 60}
    );
    return {
        user: await getProfile(user.id),
        token: token
    };
};

//TODO add private fields for db model, like password
router.post('/signIn', async (request, response) => {
    let query = {
        login: request.body.login,
        password: request.body.password
    };

    try {
        let user = await User.findOne({
            where: query,
            include: [{
                model: Avatar,
                where: {
                    isCurrentAvatar: true
                },
                required: false
            }]
        });
        if (user) {
            let session_hash = crypto.randomBytes(20).toString('hex');
            //Session_hash will recreated after even signIn
            await User.update(
                {session_hash: session_hash},
                {where: query});
            response.send(await signIn(user));
        } else {
            response.status(401);
        }
    } catch(err) {
        console.log(err);
        response.status(401).send({error: err.data});
    }
});

router.post('/signUp', async (request, response) => {
    try {
        request.body.session_hash = crypto.randomBytes(20).toString('hex');
        let user = await User.create(request.body);
        let score = await Score.create();
        score.setUser(user);
        response.send(await signIn(user));
    } catch(err) {
        console.log(err);
        response.status(500).send({error: err.data});
    }
});

module.exports = router;
