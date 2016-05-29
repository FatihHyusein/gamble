import UserDataStore from '../../stores/UserDataStore';
import ToastMessagesActionCreators from '../../actions/ToastMessagesActionCreators';
import {Link, browserHistory} from 'react-router';

module.exports = {
    path: 'deposit',
    onEnter(nextState, replace, callback){
        if (!UserDataStore.getToken()) {
            ToastMessagesActionCreators.setNewToasts([{
                type: "warning",
                text: "Please, login"
            }]);

            browserHistory.push('/');
        }
    },


    getChildRoutes(location, cb) {
        cb(null, [
            require('./routes/Cart')
        ])
    },

    getComponent(nextState, cb) {
        cb(null, require('./components/Deposit'))
    }
};
