module.exports = {
    path: '/casino/public/market',
    getComponent(nextState, cb) {
        cb(null, require('./components/Market'))
    }
};
