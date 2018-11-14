import axios from 'axios';

export const saveScore = () => {
    return {
        type: 'saveScore'
    }
};

export const getScore = (scoreCounter) => {
    let localScoreCounter = localStorage.getItem('scoreCounter');
    if (scoreCounter < localScoreCounter) {
        scoreCounter = localScoreCounter
    }
    return {
        type: 'getScore', scoreCounter: scoreCounter
    }
};

export const increment = (scoreCounter) => {  //11
    localStorage.setItem('scoreCounter', ++scoreCounter);
    return {
        type: 'increment', scoreCounter: scoreCounter
    }
};

export const signIn = (action) => {
    let token = action.token;
    if(action.isLocalToken) {
        let localToken = localStorage.getItem('AuthToken');
        if (!localToken) {
            return {
                type: 'auth', isAuthorized: false
            }
        }
        token = localToken;
    } else {
        localStorage.setItem('AuthToken', token);
    }
    axios.defaults.headers.authorization = `bearer ${token}`;
    return {
        type: 'signIn', isAuthorized: true
    }
};

export const logOut = () => {
    localStorage.removeItem('AuthToken');
    axios.defaults.headers.authorization = ``;
    return {
        type: 'logOut', isAuthorized: false
    }
};

export const signInRequest = (data) => {
    return (dispatch) => {
        axios.post('/signIn', data)
            .then(res => {
                if(res.data.token) {
                    dispatch(signIn({token: res.data.token}));
                }
            })
    }
};

export const signUpRequest = (data) => {
    return (dispatch) => {
        axios.post('/signUp', data)
            .then(res => {
                console.log(res.data);
                if(res.data.token) {
                    dispatch(signIn({token: res.data.token}));
                }
            })
    }
};

export const getScoreRequest = () => {
    return (dispatch) => {
        axios.get('/score/getScore')
            .then( res => {
                dispatch(getScore(res.data.scoreCounter));
            });
    }
};

export const saveScoreRequest = (scoreCounter) => {
    return (dispatch) => {
        axios.post('/score/saveScore', {scoreCounter: scoreCounter})
            .then( _ => {
                dispatch(saveScore());
            });
    }
};