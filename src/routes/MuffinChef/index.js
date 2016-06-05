module.exports = {
    path: 'muffinChef',
    getComponent(nextState, cb) {
        cb(null, require('./components/MuffinChef'))
    }
};
