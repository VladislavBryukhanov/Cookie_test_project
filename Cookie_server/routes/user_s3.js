const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Avatar = require('../models/avatar');
const defaultAvatar = require('./avatars_s3').defaultAvatar;
const path = require('path');
const uuid = require('uuid');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3 = require('../awsS3');
const myBucket = 'vbriuhanov-test';

const options = {
    partSize: 5 * 1024 * 1024,
    queueSize: 12
};

const getProfile = async(id) => {
    let user = await User.findOne({
        where: {id},
        attributes: {
            exclude: ["password", "session_hash"]
        },
        include: [{
            model: Avatar,
            required: false,
            where: {
                isCurrentAvatar: true
            }
        }]
    });
    let resUser = user.toJSON();
    if (resUser.avatars.length === 0) {
        resUser.avatars = [defaultAvatar];
    }
    resUser.avatars = {
        data: resUser.avatars,
        count: await Avatar.count({
            where: {
                userId: user.id,
                isCurrentAvatar: false
            }}),
        offset: 0,
        limit: 1
    };
    return resUser;
};

router.get('/getProfileById/:id', async(request, response) => {
    response.send(await getProfile(request.params['id']));
});

router.get('/getProfile', async(request, response) => {
    response.send(await getProfile(request.user.id));
});

router.put('/editProfile', upload.array('avatars', 12), async(request, response) => {
    if (request.files.length > 0) {
        let avatars = [];

        const uploadPromises = [];
        request.files.forEach(avatar => {
            let params = {
                Body: avatar.buffer,
                Bucket: myBucket,
                Key: uuid.v1() + path.extname(avatar.originalname),
            };

            uploadPromises.push(
                s3.upload(params, options).promise()
                    .then((res) => {
                        avatars.push({
                            isCurrentAvatar: false,
                            key: params.Key,
                            path: res.Location
                        });
                    }));
        });
        await Promise.all(uploadPromises);

        let user = await User.findOne({
            where: {id: request.user.id}
        });
        let oldAvatars = await user.getAvatars();
        if (oldAvatars.length === 0) {
            avatars[0].isCurrentAvatar = true;
        }

        avatars = await Avatar.bulkCreate(avatars);
        user.addAvatars(avatars);
    }

    await User.update(request.body, {
        where: {id: request.user.id}
    });
    response.send(await getProfile(request.user.id));
});

module.exports = {
    router,
    getProfile
};
