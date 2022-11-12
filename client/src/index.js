import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {Provider} from 'react-redux';
import store from './Redux/store.js'
ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>,
document.getElementById('root')); 