const express = require('express');
const router = express.Router();
const Avatar = require('../models/avatar');
const fs = require('fs');

const OnePageStep = 8;

router.get('/getAvatars/:id&:page', async(request, response) => {
    let offset =  OnePageStep * request.params.page;
    let avatars = await Avatar.findAndCountAll({
        where: {
            userId: request.params.id,
            isCurrentAvatar: false
        },
        offset: offset,
        limit: OnePageStep,
    });
    response.send({
        data: avatars.rows,
        count: avatars.count,
        offset: offset,
        limit: OnePageStep
    });

});

router.delete('/deleteAvatar/:id', async(request, response) => {
    let deletedAvatar = await Avatar.findOne({where:
        {userId: request.user.id, id: request.params.id}});
    fs.unlink(`public/${deletedAvatar.path}`, async () => {
        await deletedAvatar.destroy();
        let newAvatar;
        if (deletedAvatar.isCurrentAvatar) {
            newAvatar = await Avatar.findOne({
                where: {
                    userId: request.user.id
                },
                order: [['createdAt', 'DESC']]
            });
            if (newAvatar) {
                await newAvatar.update({isCurrentAvatar: true});
            } else {
                newAvatar = {
                    id: 0,
                    path: '/avatars/def.png',
                    isCurrentAvatar: true
                };
            }
        }
        response.send({deletedAvatar, newAvatar});
    });
});

router.post('/setCurrentAvatar', async(request, response) => {
    let avatar = await Avatar.update({isCurrentAvatar: true}, {
        where: {
            id: request.body.id,
            userId: request.user.id
        }
    });
    response.send(avatar);
});

module.exports = router;