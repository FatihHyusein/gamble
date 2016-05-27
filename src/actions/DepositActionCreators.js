import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';

var ActionTypes = MuffinConstants.ActionTypes;

export default {

    depositUpdateList: function (newItems, total, page) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.DEPOSIT_UPDATE_LIST,
            items: newItems,
            total: total,
            page: page
        });
    },
    depositCartUpdate: function (cartItems, cartItemsCount) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.DEPOSIT_UPDATE_CART_LIST,
            cartItems: cartItems,
            cartItemsCount: cartItemsCount
        });
    },


    depositAddItemToCart: function (newItem) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.DEPOSIT_ADD_ITEM_TO_CART,
            item: newItem
        });
    },

    depositRemoveItemFromCart: function (item) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.DEPOSIT_REMOVE_ITEM_FROM_CART,
            item: item
        });
    },
    clearCart: function (restItems, total, page) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.DEPOSIT_REMOVE_ITEM_FROM_CART,
            restItems: restItems,
            total: total,
            page: page
        });
    }
};
