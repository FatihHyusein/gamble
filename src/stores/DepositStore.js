import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';
import {EventEmitter} from 'events';


var ActionTypes = MuffinConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var CART_EVENT = 'cart_change';

class DepositStore extends EventEmitter {
    getDepositItems() {
        return this.depositItems;
    }

    getDepositItemsCount() {
        return this.totalDepositItems;
    }


    getCartItems() {
        return this.cartItems;
    }

    getCartCount() {
        return this.cartItems.length;
    }

    getDepositPageNumber() {
        return this.marketItemsPageNumber;
    }

    constructor(props) {
        super(props);

        this.depositItems = [];
        this.totalDepositItems = 0;
        this.marketItemsPageNumber = 1;

        this.cartItems = [];
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

let depositStoreInstance = new DepositStore();

depositStoreInstance.dispatchToken = MuffinDispatcher.register((action)=> {
    switch (action.type) {
        case ActionTypes.DEPOSIT_UPDATE_LIST:
            if (action.items) {

                depositStoreInstance.cartItems.forEach((cartItm)=> {
                    let itm = action.items.find((depItem)=>
                        depItem.id == cartItm.id
                    );

                    if (itm) {
                        itm.isSelected = true
                    }
                });

                depositStoreInstance.depositItems = action.items;
            }

            if (action.total) {
                depositStoreInstance.totalDepositItems = action.total;
            }
            if (action.page) {
                depositStoreInstance.marketItemsPageNumber = action.page;
            }

            depositStoreInstance.emitChange();
            break;

        case ActionTypes.DEPOSIT_ADD_ITEM_TO_CART:
            if (!depositStoreInstance.cartItems.find((catItm)=> {
                    return catItm.id == action.item.id
                })) {

                depositStoreInstance.cartItems.push(action.item);

                depositStoreInstance.cartItems = [...depositStoreInstance.cartItems];

                depositStoreInstance.depositItems.find((depItm) => {
                    return depItm.id === action.item.id
                }).isSelected = true;
            }


            depositStoreInstance.emitChange();
            depositStoreInstance.emitCartItemsChange();
            break;


        case ActionTypes.DEPOSIT_REMOVE_ITEM_FROM_CART:
            depositStoreInstance.cartItems = depositStoreInstance.cartItems.filter((catItm)=>
                catItm.id != action.item.id
            );

            depositStoreInstance.depositItems.find((depItm) => {
                return depItm.id === action.item.id
            }).isSelected = false;

            depositStoreInstance.emitChange();
            depositStoreInstance.emitCartItemsChange();
            break;

        case ActionTypes.DEPOSIT_CLEAR_CART:
            depositStoreInstance.cartItems = [];
            depositStoreInstance.depositItems = action.restItems;

            if (action.total) {
                depositStoreInstance.totalDepositItems = action.total;
            }
            if (action.page) {
                depositStoreInstance.marketItemsPageNumber = action.page;
            }


            depositStoreInstance.emitChange();
            depositStoreInstance.emitCartItemsChange();
            break;

        default:
        // do nothing


    }
});


export default depositStoreInstance;
