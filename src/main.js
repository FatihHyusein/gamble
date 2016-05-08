import React, {Component}from 'react';
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import $ from 'jquery';

window.React = React; // export for http://fb.me/react-devtools
window.Component = Component;
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
            //require('./routes/FreeMuffins'),
            //require('./routes/Jackpot'),
            require('./routes/Market')
            //require('./routes/Deposit'),
            //require('./routes/TermsOfService'),
            //require('./routes/Faq')
        ]
    }]
};

render(
    <Router history={browserHistory} routes={rootRoute}/>,
    document.getElementById('app')
);
