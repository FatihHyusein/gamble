import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';

var ActionTypes = MuffinConstants.ActionTypes;

export default {
    setNewPopupMessage: function (messageData) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.RECEIVED_POPUP_MESSAGE,
            messageData: messageData
        });
    },
    closePopup: function () {
        MuffinDispatcher.dispatch({
            type: ActionTypes.CLOSE_POPUP_MESSAGE
        });
    }
};
