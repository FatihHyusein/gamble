module.exports = {
    path: 'history',
    getComponent(nextState, cb) {
        cb(null, require('./component/History'))
    }
};
