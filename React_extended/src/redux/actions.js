import axios from 'axios';

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
    localStorage.removeItem('scoreCounter');
    axios.defaults.headers.authorization = ``;
    return {
        type: 'logOut', isAuthorized: false
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

export const increment = (scoreCounter) => {
    localStorage.setItem('scoreCounter', ++scoreCounter);
    return {
        type: 'increment', scoreCounter: scoreCounter
    }
};
