module.exports = {
    path: 'deposit',

    getChildRoutes(location, cb) {
        cb(null, [
            require('./routes/Cart')
        ])
    },

    getComponent(nextState, cb) {
        cb(null, require('./components/Deposit'))
    }
};
