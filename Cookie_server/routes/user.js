const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Avatar = require('../models/avatar');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname+ '/../', 'public/avatars'))
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = (multer({
    storage: storage,
    limits: {fileSize: 5* 1024 * 1024}
}));

const getProfile = async(id) => {
    console.log(id);
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
        resUser.avatars = [{
            id: 0,
            path: '/avatars/def.png',
            isCurrentAvatar: true
        }];
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
        request.files.forEach(avatar =>
            avatars.push({
                path: `avatars/${avatar.filename}`,
                isCurrentAvatar: false
            })
        );

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

module.exports = router;

// request.body.avatar = `avatars/${request.file.filename}`;
// if(oldProfile.avatar !== 'avatars/default.jpg') {
//     fs.unlink(`public/${oldProfile.avatar}`, err => console.log(err));
// }