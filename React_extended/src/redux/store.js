import { createStore, applyMiddleware } from 'redux';
import { handleActions } from 'redux-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk'

const initData = {
    scoreCounter: 0,
    isAuthorized: false
};

// const Reducer = handleActions({
//     saveScore: (state) => state, // just info about saving
//
//     getScore: (state, action) =>
//         ({...state, scoreCounter: action.scoreCounter}),
//
//     increment: (state, action) =>
//         ({...state, scoreCounter: action.scoreCounter}),
//
//     signIn: (state, action) => {
//         console.log(action);
//         console.log(state);
//      return ({...state, isAuthorized: action.isAuthorized})
//     },
//
//     logOut: (state, action) =>
//         ({...state, isAuthorized: action.isAuthorized}),
// }, initData);

const Reducer = (state = initData, action) => {
    switch (action.type) {
        // just info about saving
        case 'saveScore':
            return state;
        case 'getScore':
            return {...state, scoreCounter: action.scoreCounter};
        case 'increment':
            return {...state, scoreCounter: action.scoreCounter};
        case 'signIn':
            return {...state, isAuthorized: action.isAuthorized};
        case 'logOut':
            return {...state, isAuthorized: action.isAuthorized};
        default:
            return state;
    }
};

export default createStore(Reducer, composeWithDevTools(applyMiddleware(ReduxThunk)));