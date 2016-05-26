import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';
import {EventEmitter} from 'events';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

class PopupMessagesStore extends EventEmitter {

    getPopupMessage() {
        return this.popupMessage;
    }

    getIsOpened() {
        return this.isOpened;
    }

    constructor(props) {
        super(props);

        this.popupMessage = "";
        this.isOpened = false;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

let popupMessagesStoreInstance = new PopupMessagesStore();

popupMessagesStoreInstance.dispatchToken = MuffinDispatcher.register((action)=> {
    switch (action.type) {
        case ActionTypes.RECEIVED_POPUP_MESSAGE:

            if (!action.messageData) {
                return;
            }
            popupMessagesStoreInstance.popupMessage = action.messageData.popupMessage;
            popupMessagesStoreInstance.isOpened = true;

            popupMessagesStoreInstance.emitChange();
            break;

        case ActionTypes.CLOSE_POPUP_MESSAGE:
            popupMessagesStoreInstance.popupMessage = "";
            popupMessagesStoreInstance.isOpened = false;

            popupMessagesStoreInstance.emitChange();
            break;

        default:
        // do nothing
    }
});


export default popupMessagesStoreInstance;
