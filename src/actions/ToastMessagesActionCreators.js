import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';

var ActionTypes = MuffinConstants.ActionTypes;

export default {
    setNewToasts: function (toasts) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.RECEIVED_TOAST_MESSAGE,
            toasts: toasts
        });
    },
    clearToasts: function () {
        MuffinDispatcher.dispatch({
            type: ActionTypes.CLEAR_TOAST_MESSAGES
        });
    }
};
