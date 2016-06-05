module.exports = {
    path: 'partners',
    getComponent(nextState, cb) {
        cb(null, require('./components/Partners'))
    }
};
