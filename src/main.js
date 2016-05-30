import 'babel-polyfill';
import React, {Component}from 'react';
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import CommonComponents from './common/components';

window.React = React; // export for http://fb.me/react-devtools
window.Component = Component;
window.CommonComponents = CommonComponents;

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
