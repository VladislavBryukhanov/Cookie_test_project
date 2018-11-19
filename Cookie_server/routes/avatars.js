const express = require('express');
const router = express.Router();
const Avatar = require('../models/avatar');

const OnePagingStep = 5;

router.get('/getAvatars/:id&:page', async(request, response) => {
    let avatars = await Avatar.findAll({
        where: {
            userId: request.params.id,
            isCurrentAvatar: false
        },
        offset: OnePagingStep * request.params.page,
        limit: OnePagingStep,
    });
    console.log(avatars);
    response.send(avatars);
});

module.exports = router;