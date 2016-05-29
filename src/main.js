import React, {Component}from 'react';
import {render} from 'react-dom'
import {Router, browserHistory, Redirect, Compo} from 'react-router'
import $ from 'jquery';
import CommonComponents from './common/components';

window.React = React; // export for http://fb.me/react-devtools
window.Component = Component;
window.CommonComponents = CommonComponents;
window.$ = $;

if (typeof token === 'undefined' || token === null) {
    window.token = localStorage.getItem('token');
}
else {
    localStorage.setItem('token', token);
}

const rootRoute = {
    component: 'div',
    childRoutes: [{
        path: '/',
        component: require('./components/MuffinApp'),
        childRoutes: [
            require('./routes/Jackpot'),
            require('./routes/Market'),
            require('./routes/Deposit'),
            require('./routes/Support'),
            require('./routes/Profile'),
            require('./routes/RedirectRoute')
        ]
    }]
};

render(
    <Router history={browserHistory} routes={rootRoute}/>,
    document.getElementById('app')
);
