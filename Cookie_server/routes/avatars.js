const express = require('express');
const router = express.Router();
const Avatar = require('../models/avatar');
const fs = require('fs');

router.get('/getAvatars/:id&:offset&:limit', async(request, response) => {
    // let offset =  OnePageStep * request.params.page;
    let offset = parseInt(request.params.offset);
    let limit = parseInt(request.params.limit);
    let avatars = await Avatar.findAndCountAll({
        where: {
            userId: request.params.id,
            isCurrentAvatar: false
        },
        offset: offset,
        limit: limit,
    });
    response.send({
        data: avatars.rows,
        count: avatars.count,
        offset: offset,
        limit: limit
    });
});

router.delete('/deleteAvatar/:id', async(request, response) => {
    let deletedAvatar = await Avatar.findOne({where:
        {userId: request.user.id, id: request.params.id}});
    fs.unlink(`public/${deletedAvatar.path}`, async () => {
        await deletedAvatar.destroy();
        let count = await Avatar.count({
            where: {
                userId: request.user.id,
                isCurrentAvatar: false
            }
        });

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
                count = -1;
            }
        }
        response.send({deletedAvatar, newAvatar, count});
    });
});

router.put('/setCurrentAvatar', async(request, response) => {
    let oldAvatar = await Avatar.findOne({where: {
        userId: request.user.id,
        isCurrentAvatar: true
    }});
    await oldAvatar.update({isCurrentAvatar: false});

    let newAvatar = await Avatar.findOne({where: {
        id: request.body.id,
        userId: request.user.id
    }});
    await newAvatar.update({isCurrentAvatar: true});

    response.send(newAvatar);
});

module.exports = router;