import UserDataStore from '../../stores/UserDataStore';
import ToastMessagesActionCreators from '../../actions/ToastMessagesActionCreators';
import {Link, browserHistory} from 'react-router';

module.exports = {
    path: 'profile',

    onEnter(nextState, replace, callback){
        if (!UserDataStore.getToken()) {
            ToastMessagesActionCreators.setNewToasts([{
                type: "warning",
                text: "Please, login"
            }]);

            browserHistory.push('/');
        }
        else{
            callback(null, require('./components/Profile'))
        }
    },

    getChildRoutes(location, cb) {
        cb(null, [
            require('./routes/History'),
            require('./routes/Referrals')
        ])
    },

    getComponent(nextState, cb) {
        cb(null, require('./components/Profile'))
    }
};
