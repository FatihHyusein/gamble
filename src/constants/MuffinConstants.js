var keyMirror = require('keymirror');

function createRouterStrings(routes) {
    var routesObject = {};

    for (let route of routes) {
        routesObject[route] = {
            link: '/' + route,
            route: route,
            component: route[0].toUpperCase() + route.slice(1)
        }
    }

    return routesObject;
}

module.exports = {
    ActionTypes: keyMirror({
        CHANGE_HEADER: null,
        UPDATE_JACKPOT_GAME: null,
        GET_WINNER: null,




        JACKPOT_PLACE_BET: null,
        JACKPOT_START_TIMER: null,
        JACKPOT_TIMER_ENDED: null,
        JACKPOT_START_GAME: null,
        JACKPOT_KILL_PLAYER: null,
        JACKPOT_ROUND_WINNER: null,
        JACKPOT_NEW_ROUND: null,

        
        
        
        
        
        
        
        RECEIVED_TOAST_MESSAGE: null,
        CLEAR_TOAST_MESSAGES: null,


        USER_DATA_UPDATE_TOKEN: null,
        USER_DATA_UPDATE_PROFILE: null,


        MARKET_STORE_UPDATE_LIST: null,
        MARKET_STORE_ADD_ITEM_TO_CART: null,
        MARKET_STORE_UPDATE_CART_LIST: null,

        MARKET_STORE_REMOVE_ITEM_FROM_CART: null,
        MARKET_STORE_ORDER_FROM_CART: null,
    }),

    ROUTES: createRouterStrings(['support'])
};
