const express = require('express');
const router = express.Router();
const Score = require('../models/score');

router.get('/getScore', async(request, response) => {
    try {
        response.send(await Score.findOne({where: {userId: request.user.id}}));
    } catch(err) {
        console.log(err);
        response.status(500).send({error: err.data});
    }
});

router.post('/saveScore', async(request, response) => {
    request.body.userId = request.user.id;
    console.log(request.body);
    try {
        // response.send(await Score.upsert(request.body));
        response.send(await Score.update(request.body, {where: {userId: request.user.id}}));
    } catch(err) {
        console.log(err);
        response.status(500).send({error: err.data});
    }
});

module.exports = router;