module.exports = {
    path: 'terms',
    getComponent(nextState, cb) {
        cb(null, require('./component/Terms'))
    }
};
