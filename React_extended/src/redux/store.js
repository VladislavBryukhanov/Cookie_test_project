import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

const initData = {
    scoreCounter: 0,
    isAuthorized: false
};

const scoreReducer = (state = {scoreCounter: initData.scoreCounter}, action) => {
    switch (action.type) {
        case 'saveScore': {
            return state;
        }
        case 'getScore': {
            return {
                ...state, scoreCounter: action.scoreCounter
            }
        }
        case 'increment': {
            return {
                ...state, scoreCounter: action.scoreCounter
            }
        }
        default: {
            return state;
        }
    }
};

const authReducer = (state = {isAuthorized: initData.isAuthorized}, action) => {
    switch (action.type) {
        case 'signIn': {
            return {
                ...state, isAuthorized: true
            }
        }
        case 'logOut': {
            localStorage.removeItem('AuthToken');
            localStorage.removeItem('scoreCounter');
            return {
                ...state, isAuthorized: false
            }
        }
        default: {
            return state;
        }
    }
};


const sagaMiddleware = createSagaMiddleware();

export default createStore(
    combineReducers({
        scoreReducer,
        authReducer
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas);