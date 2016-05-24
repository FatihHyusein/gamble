module.exports = {
    path: 'profile',


    getComponent(nextState, cb) {
        cb(null, require('./components/Profile'))
    }
};
