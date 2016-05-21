import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';

var ActionTypes = MuffinConstants.ActionTypes;

export default {

    changeHeader: function (header) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.CHANGE_HEADER,
            header: header
        });
    },

    testToast: function () {
        MuffinDispatcher.dispatch({
            type: ActionTypes.RECEIVED_TOAST_MESSAGE,
            toasts: [
                {
                    type:'success',
                    text:"dafuq"
                }
            ]
        });
    }
};
