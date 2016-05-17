module.exports = {
    path: 'nested',
    getComponent(nextState, cb) {
        cb(null, require('./component/NestedMarked'))
    }
};
