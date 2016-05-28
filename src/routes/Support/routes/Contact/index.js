module.exports = {
    path: 'contact',
    getComponent(nextState, cb) {
        cb(null, require('./component/Contact'))
    }
};
