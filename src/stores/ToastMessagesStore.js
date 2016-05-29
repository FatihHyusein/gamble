import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';
import {EventEmitter} from 'events';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

class ToastMessagesStore extends EventEmitter {

    getLoader() {
        return this.showLoader
    }

    getToastMessages() {
        return this.toastMessages;
    }

    constructor(props) {
        super(props);

        this.showLoader = false;
        this.toastMessages = [];
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

let toastMessagesStoreInstance = new ToastMessagesStore();

toastMessagesStoreInstance.dispatchToken = MuffinDispatcher.register((action)=> {
    switch (action.type) {
        case ActionTypes.RECEIVED_TOAST_MESSAGE:
            //MuffinDispatcher.waitFor([ThreadStore.dispatchToken]);

            if (!toastMessagesStoreInstance.toastMessages) {
                toastMessagesStoreInstance.toastMessages = [];
            }

            if (!action.toasts) {
                return;
            }
            toastMessagesStoreInstance.toastMessages.unshift(...action.toasts);
            if (toastMessagesStoreInstance.toastMessages.length > 5) {
                toastMessagesStoreInstance.toastMessages.pop();
            }

            for (var i = 0; i < action.toasts.length; i++) {
                toastMessagesStoreInstance.clearToastsTimeout = setTimeout(()=> {
                    toastMessagesStoreInstance.toastMessages.pop();
                    toastMessagesStoreInstance.emitChange();
                }, 3000);
            }

            toastMessagesStoreInstance.emitChange();
            break;

        case ActionTypes.CLEAR_TOAST_MESSAGES:
            if (toastMessagesStoreInstance.clearToastsTimeout) {
                clearTimeout(toastMessagesStoreInstance.clearToastsTimeout);
            }

            toastMessagesStoreInstance.toastMessages = [];
            toastMessagesStoreInstance.emitChange();
            break;

        case ActionTypes.UPDATE_LOADER:
            toastMessagesStoreInstance.showLoader = action.showLoader;

            toastMessagesStoreInstance.emitChange();
            break;

        default:
        // do nothing
    }
});


export default toastMessagesStoreInstance;
