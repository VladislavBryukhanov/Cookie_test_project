import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { handleActions } from 'redux-actions';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

const initData = {
    scoreCounter: 0,
    isAuthorized: false
};

const Reducer = handleActions({
    saveScore: (state) => state, // just info about saving

    getScore: (state, action) =>
        ({...state, scoreCounter: action.scoreCounter}),

    increment: (state, action) =>
        ({...state, scoreCounter: action.scoreCounter}),

    signIn: (state, action) =>
        ({...state, isAuthorized: action.isAuthorized}),

    logOut: (state, action) =>
        ({...state, isAuthorized: action.isAuthorized}),
}, initData);

const sagaMiddleware = createSagaMiddleware();

export default createStore(Reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas);