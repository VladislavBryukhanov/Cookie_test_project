import axios from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';

const requestType = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete',
    head: 'head',
    patch: 'patch',
};

function* requestWrapper (requestType, requestUrl, requestData, headers) {
    // some requests (for example GET) have not requestData and it will = headers
    try {
        return yield call(() => axios[requestType](requestUrl, requestData, headers))
    } catch (err) {
        if (err.response.status === 401) {
            yield put({type: 'logOut'})
        }
    }
}

function authHeader() {
    const token = localStorage.getItem('AuthToken');
    return {
        headers: {
            authorization: `bearer ${token}`
        }
    }
}

function* signInRequest(action) {
    let req = yield requestWrapper(requestType.post, '/signIn', action.data);
    let token = req.data.token;
    let user = req.data.user;
    localStorage.setItem('AuthToken', token);
    yield put({type: 'signIn', user: user});
}

function* signUpRequest(action) {
    let req = yield requestWrapper(requestType.post, '/signUp', action.data);
    let token = req.data.token;
    let user = req.data.user;
    localStorage.setItem('AuthToken', token);
    yield put({type: 'signIn', user: user});
}

function* getProfileRequest() {
    let req = yield requestWrapper(requestType.get, '/user/getProfile', authHeader());
    yield put({type: 'signIn', user: req.data});
}

function* getScoreRequest() {
    let localScoreCounter = localStorage.getItem('scoreCounter');
    try {
        let req = yield requestWrapper(requestType.get,
            '/score/getScore', authHeader());
        let scoreCounter = req.data.scoreCounter;

        if (scoreCounter < localScoreCounter) {
            scoreCounter = localScoreCounter
        }

        yield put({
            type: 'getScore',
            scoreCounter: scoreCounter
        });
    } catch(err) {
        console.log(err);
        yield put({
            type: 'getScore',
            scoreCounter: localScoreCounter
        });
        // if request failed we can take score from localStorage and continue game,
        // score will sync when server will available
    }
}

function* saveScoreRequest(action) {
    yield requestWrapper(requestType.post, '/score/saveScore',
        {scoreCounter: action.scoreCounter}, authHeader());
    yield put({type: 'saveScore'})
}

function* logOutRequest(action) {
    yield saveScoreRequest(action);
    yield put({type: 'logOut'});
}

function* editProfileRequest(action) {
    let req = yield requestWrapper(requestType.put, '/user/editProfile',
        action.data, authHeader());
    yield put({type: 'editProfile', user: req.data})
}

function* getAvatarsRequest(action) {
    let req = yield requestWrapper(requestType.get,
        `/avatar/getAvatars/${action.id}&${action.page}`, authHeader());
    yield put({type: 'getAvatars', avatars: req.data});
}

export default function* sagas() {
    yield takeLatest('signUpRequest', signUpRequest);
    yield takeLatest('signInRequest', signInRequest);
    yield takeLatest('getProfileRequest', getProfileRequest);
    yield takeLatest('getScoreRequest', getScoreRequest);
    yield takeLatest('saveScoreRequest', saveScoreRequest);
    yield takeLatest('logOutRequest', logOutRequest);
    yield takeLatest('editProfileRequest', editProfileRequest);
    yield takeLatest('getAvatarsRequest', getAvatarsRequest);
}
