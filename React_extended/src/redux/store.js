import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';

axios.defaults.baseURL = baseUrl;

const initData = {
    scoreCounter: 0,
    user: null
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

const authReducer = (state = {user: initData.user}, action) => {
    switch (action.type) {
        case 'signIn': {
            if (action.user.avatars) {
                action.user.avatars.data.forEach(avatar => {
                    avatar.path = `${baseUrl}/${avatar.path}`;
                });
            }
            return {
                ...state, user: action.user
            }
        }
        case 'logOut': {
            localStorage.removeItem('AuthToken');
            localStorage.removeItem('scoreCounter');
            return {
                ...state, user: null
            }
        }
        case 'editProfile': {
            action.user.avatars.data.forEach(avatar => {
                avatar.path = `${baseUrl}/${avatar.path}`;
            });
            return {
                ...state, user: action.user
            }
        }
        case 'getAvatars': {
            action.avatars.data.forEach(avatar => {
                avatar.path = `${baseUrl}/${avatar.path}`;
            });

            return {
                ...state, user: {
                    ...state.user,
                    avatars: {
                        ...action.avatars,
                        data: [
                            ...state.user.avatars.data,
                            ...action.avatars.data
                        ]
                    }
                }
            }
        }
        case 'deleteAvatar': {
            let avatars = {
                ...state.user.avatars,
                data: [
                    ...state.user.avatars.data
                        .filter(avatar => avatar.id !== action.deletedAvatar.id)
                ]
            };
            if (action.newAvatar) {
                action.newAvatar.path = `${baseUrl}/${action.newAvatar.path}`;
                let currentAvatarIndex = avatars.data
                    .findIndex(avatar => avatar.id === action.newAvatar.id);
                if (currentAvatarIndex > -1) {
                    avatars.data[currentAvatarIndex] = action.newAvatar;
                } else {
                    avatars.data.push(action.newAvatar);
                }
            }
            return {
                ...state, user: {
                    ...state.user,
                    avatars: avatars
                }
            }
        }
        default: {
            return state;
        }
    }
};

// const userReducer = (state = {user: initData.user}, action) => {
//     switch (action.type) {
//         case 'editProfile': {
//             return {
//                 ...state, user: action.user
//             }
//         }
//         default: {
//             return state;
//         }
//     }
// };

const sagaMiddleware = createSagaMiddleware();

export default createStore(
    combineReducers({
        scoreReducer,
        authReducer
        // userReducer
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas);