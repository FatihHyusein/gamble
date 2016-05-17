import Constants from '../constants/MuffinConstants';

class baseRouterIndex {
    constructor(data) {
        this.path = data.path;
        this.children = data.children.map(child=> require('./routes/' + child));
        this.component = require('./routes/' + data.path[0].toUpperCase() + data.path.slice(1));
    }

    getChildRoutes(location, cb) {
        cb(null, this.children);
    }

    getComponent(nextState, cb) {
        cb(null, this.component);
    }

}

export default baseRouterIndex;
