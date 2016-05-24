module.exports = {
    path: 'cart',
    getComponent(nextState, cb) {
        cb(null, require('./component/Cart'))
    }
};
