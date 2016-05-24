import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';
import {EventEmitter} from 'events';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';

class MarketStore extends EventEmitter {
    getMarketItems() {
        return this.marketItems;
    }

    getMyCartItems() {
        return this.myCartItems;
    }

    constructor(props) {
        super(props);

        this.marketItems = [];
        this.myCartItems = [];
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

let marketStoreInstance = new MarketStore();

marketStoreInstance.dispatchToken = MuffinDispatcher.register((action)=> {
    switch (action.type) {
        case ActionTypes.RECEIVED_TOAST_MESSAGE:
            //MuffinDispatcher.waitFor([ThreadStore.dispatchToken]);


            marketStoreInstance.toastMessages = action.toasts;
            marketStoreInstance.clearToastsTimeout = setTimeout(()=> {
                marketStoreInstance.toastMessages = [];
                marketStoreInstance.emitChange();
            }, 3000);

            marketStoreInstance.emitChange();
            break;

        case ActionTypes.CLEAR_TOAST_MESSAGES:
            if (marketStoreInstance.clearToastsTimeout) {
                clearTimeout(marketStoreInstance.clearToastsTimeout);
            }

            marketStoreInstance.toastMessages = [];
            marketStoreInstance.emitChange();
            break;

        default:
        // do nothing
    }
});


export default marketStoreInstance;
