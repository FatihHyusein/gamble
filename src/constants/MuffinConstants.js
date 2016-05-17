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
        UPDATE_JACKPOT_GAME: null
    }),

    ROUTES: createRouterStrings(['support'])
};
