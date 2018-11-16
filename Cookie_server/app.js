const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const scoreRouter = require('./routes/score');
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
app.use('/user', userRouter);
app.use('/score', scoreRouter);

module.exports = app;
