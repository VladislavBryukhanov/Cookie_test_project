const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/auth');
const scoreRouter = require('./routes/score');

const userRouter = require('./routes/user').router;
const avatarRouter = require('./routes/avatars').router;
const user_s3 = require('./routes/user_s3').router;
const avatars_s3 = require('./routes/avatars_s3').router;

const initRelations = require('./models/relations');
// initRelations({force: true});
initRelations({force: false});

const secret = require('./secret');
const exjwt = require('express-jwt');
const jwtMW = exjwt({secret: secret})
    .unless({path: [
        '/signIn',
        '/signUp'
    ]});

const sequelize = require('./dbConnection');
sequelize.authenticate();

app.use(express.json());
app.use(cors({origins: 'localhost: 5000'}));
app.use(express.static('public'));
app.use(jwtMW);
app.use('/', authRouter);
app.use('/score', scoreRouter);
// app.use('/user', userRouter);
// app.use('/avatar', avatarRouter);
app.use('/user', user_s3);
app.use('/avatar', avatars_s3);

module.exports = app;
