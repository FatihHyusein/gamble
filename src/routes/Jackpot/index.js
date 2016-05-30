module.exports = {
    path: 'ktm',

    getComponent(nextState, cb) {
        cb(null, require('./components/Jackpot'))
    }
};
