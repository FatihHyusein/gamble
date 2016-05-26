import MuffinDispatcher from '../dispather/MuffinDispatcher';
import MuffinConstants from '../constants/MuffinConstants';

var ActionTypes = MuffinConstants.ActionTypes;

export default {

    marketStoreUpdateList: function (newItems, total, page) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.MARKET_STORE_UPDATE_LIST,
            items: newItems,
            total: total,
            page: page
        });
    },

    marketStoreAddItemToCart: function (newItem) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.MARKET_STORE_ADD_ITEM_TO_CART,
            item: newItem
        });
    },

    marketCartUpdate: function (cartItems, cartItemsCount) {
        MuffinDispatcher.dispatch({
            type: ActionTypes.MARKET_STORE_UPDATE_CART_LIST,
            cartItems: cartItems,
            cartItemsCount: cartItemsCount
        });
    }
};
