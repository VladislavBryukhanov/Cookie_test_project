import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './app';
import axios from 'axios';
import { BrowserRouter, Route,  } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:3000';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route component={App}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);