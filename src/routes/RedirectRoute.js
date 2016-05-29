import {browserHistory} from 'react-router';

module.exports = {
    path: '*',

    onEnter(nextState, replace, callback){
        browserHistory.push('/');
    },

    getComponent(nextState, cb) {
        cb(null, 'div')
    }
};
