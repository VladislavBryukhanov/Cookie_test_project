const express = require('express');
const router = express.Router();
const User = require('../models/user')

const getProfile = async(id) => {
    let user = await User.findOne({
        where: {id},
        attributes: {
            exclude: ["password", "session_hash"]
        }
    });
    let resUser = user.toJSON();
    delete resUser.password;
    delete resUser.session_hash;
    return resUser;
};

router.get('/getProfileById/:id', async(request, response) => {
    let user = await User.findOne({
        where: {id: request.params['id']},
        attributes: {
            exclude: ["password", "session_hash"]
        }
    });
    response.send(user);
});

router.get('/getProfile', async(request, response) => {
    let user = await getProfile(request.user.id);
    response.send(user);
});

router.put('/editProfile', async(request, response) => {
    await User.update(request.body, {
        where: {id: request.user.id}
    });
    response.send(await getProfile(request.user.id));
});

module.exports = router;