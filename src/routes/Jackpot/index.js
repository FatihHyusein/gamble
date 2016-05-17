module.exports = {
    path: 'jackpot',

    getComponent(nextState, cb) {
        cb(null, require('./components/Jackpot'))
    }
};
