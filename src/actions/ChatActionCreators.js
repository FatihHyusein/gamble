import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';

var ActionTypes = MuffinConstants.ActionTypes;

export default {
    addChatMessages: function (messages) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.CHAT_ADD_MESSAGES,
            messages: messages
        });
    }
};
