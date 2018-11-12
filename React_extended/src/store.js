import { createStore } from 'redux';
import axios from 'axios';
import { handleActions } from 'redux-actions';

const initData = {
    scoreCounter: 0,
    isAuthorized: false
};

const Reducer = handleActions({
    saveScore: (state) => {
        // action will run only before page closing, store updating useless
        axios.post('/score/saveScore', {scoreCounter: state.scoreCounter});
        return {
            ...state
        }
    },
    getScore: (state, action) => {
        // axios.get('/score/getScore')
        //     .then( res => {
        //         state = {
        //             ...state, scoreCounter: res.data.scoreCounter
        //         };
        //     });
        return {
            ...state, scoreCounter: action.scoreCounter
        }
    },
    increment: (state) => {
        return {
            ...state, scoreCounter: ++state.scoreCounter
        }
    },
    signIn: (state, action) => {
        let token = action.token;
        if(action.isLocalToken) {
            token = localStorage.getItem('AuthToken');
        } else {
            localStorage.setItem('AuthToken', token);
        }
        axios.defaults.headers.authorization = `bearer ${token}`;
        return {
            ...state, isAuthorized: true
        }
    },
    logOut: (state) => {
        localStorage.removeItem('AuthToken');
        axios.defaults.headers.authorization = ``;
        return {
            ...state, isAuthorized: false
        }
    }
}, initData);

export default createStore(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());