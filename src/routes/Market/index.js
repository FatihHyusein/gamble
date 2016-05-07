module.exports = {
    path: 'market',

    getChildRoutes(location, cb) {
        cb(null, [
            require('./routes/nestedMarked')
        ])
    },

    getComponent(nextState, cb) {
        cb(null, require('./components/Market'))
    }
};
