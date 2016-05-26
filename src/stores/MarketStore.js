import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';
import {EventEmitter} from 'events';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var CART_EVENT = 'cart_change';

class MarketStore extends EventEmitter {
    getMarketItems() {
        return this.marketItems;
    }

    getMyCartItems() {
        return this.myCartItems;
    }

    getMyCartItemsCount() {
        return this.myCartItemsCount;
    }

    getTotalMarketItems() {
        return this.totalMarketItems;
    }

    getMarketItemsPage() {
        return this.marketItemsPage;
    }

    constructor(props) {
        super(props);

        this.marketItems = [];
        this.totalMarketItems = 0;
        this.marketItemsPage = 1;

        this.myCartItems = [];
        this.myCartItemsCount = 0;
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

    emitCartItemsChange() {
        this.emit(CART_EVENT);
    }

    addCartItemsChangeListener(callback) {
        this.on(CART_EVENT, callback);
    }

    removeCartItemsChangeListener(callback) {
        this.removeListener(CART_EVENT, callback);
    }
}

let marketStoreInstance = new MarketStore();

marketStoreInstance.dispatchToken = MuffinDispatcher.register((action)=> {
    switch (action.type) {
        case ActionTypes.MARKET_STORE_UPDATE_LIST:
            if (action.items) {
                marketStoreInstance.marketItems = action.items;
            }

            if (action.total) {
                marketStoreInstance.totalMarketItems = action.total;
            }
            if (action.page) {
                marketStoreInstance.marketItemsPage = action.page;
            }

            marketStoreInstance.emitChange();
            break;

        case ActionTypes.MARKET_STORE_ADD_ITEM_TO_CART:
            if (action.item) {
                marketStoreInstance.myCartItemsCount++
            }
            marketStoreInstance.emitChange();
            marketStoreInstance.emitCartItemsChange();
            break;


        case ActionTypes.MARKET_STORE_UPDATE_CART_LIST:
            if (action.cartItems) {
                marketStoreInstance.myCartItems = action.cartItems;
                marketStoreInstance.myCartItemsCount = action.cartItemsCount;
            }


            marketStoreInstance.emitCartItemsChange();
            break;

        default:
        // do nothing


    }
});


export default marketStoreInstance;
