import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';
import {EventEmitter} from 'events';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

class ToastMessagesStore extends EventEmitter {


    getToastMessages() {
        return this.toastMessages;
    }

    constructor(props) {
        super(props);

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


            toastMessagesStoreInstance.toastMessages = action.toasts;
            toastMessagesStoreInstance.emitChange();
            break;

        default:
        // do nothing
    }
});


export default toastMessagesStoreInstance;
